// Netlify Function: Send contact form via Resend (no i18n)
// Env vars required in Netlify: RESEND_API_KEY, MAIL_FROM, MAIL_TO

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBody(event) {
  const headers = event.headers || {};
  const contentType = (headers["content-type"] || headers["Content-Type"] || "").toLowerCase();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(event.body || "{}");
    } catch {
      return {};
    }
  }

  // Default: form-encoded
  const params = new URLSearchParams(event.body || "");
  const obj = {};
  for (const [key, value] of params.entries()) obj[key] = value;
  return obj;
}

function sanitize(str = "") {
  return String(str).replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"));
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { RESEND_API_KEY, MAIL_FROM, MAIL_TO } = process.env;
  if (!RESEND_API_KEY || !MAIL_FROM || !MAIL_TO) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server not configured. Missing RESEND_API_KEY, MAIL_FROM or MAIL_TO.",
      }),
    };
  }

  const data = parseBody(event);

  // Honeypot (Netlify-style hidden field)
  if (data["bot-field"]) {
    // Pretend success to avoid tipping off bots
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const petName = (data["pet-name"] || "").trim();
  const message = (data.message || "").trim();
  const privacy = data.privacy; // checkbox: 'on' or 'true'

  const errors = {};
  if (!name) errors.name = "Name is required";
  if (!email || !EMAIL_REGEX.test(email)) errors.email = "Valid email is required";
  if (!message) errors.message = "Message is required";
  if (!(privacy === true || privacy === "true" || privacy === "on")) {
    errors.privacy = "Privacy consent is required";
  }

  if (Object.keys(errors).length > 0) {
    return { statusCode: 422, body: JSON.stringify({ errors }) };
  }

  const subject = `Nuevo mensaje de contacto - ${name}`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.6;">
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${sanitize(name)}</p>
      <p><strong>Email:</strong> ${sanitize(email)}</p>
      ${phone ? `<p><strong>Teléfono:</strong> ${sanitize(phone)}</p>` : ""}
      ${petName ? `<p><strong>Mascota:</strong> ${sanitize(petName)}</p>` : ""}
      <p><strong>Mensaje:</strong></p>
      <div style="white-space: pre-wrap;">${sanitize(message)}</div>
      <hr />
      <p style="color:#6c757d; font-size: 12px;">Este correo fue enviado desde el formulario de contacto del sitio.</p>
    </div>
  `;

  try {
    // Use native fetch (Node 18+ on Netlify)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: MAIL_TO,
        subject,
        html,
        reply_to: email,
      }),
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Resend error:", payload);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to send email" }),
      };
    }

    // Redirect to success page for regular form POST
    return {
      statusCode: 303,
      headers: { Location: "/success.html" },
      body: "",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
