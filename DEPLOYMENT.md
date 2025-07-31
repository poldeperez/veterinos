# Veterinos - Deployment Guide

## Netlify Deployment

Este sitio está configurado para desplegarse automáticamente en Netlify.

### Configuración Actual

- **Build Directory**: `.` (raíz del proyecto)
- **Publish Directory**: `.` (sitio estático)
- **Formularios**: Configurados con Netlify Forms
- **Redirects**: Configurados en `netlify.toml` y `_redirects`

### Archivos de Configuración

- `netlify.toml` - Configuración principal de Netlify
- `_redirects` - Reglas de redirección
- `success.html` - Página de agradecimiento tras envío de formulario

### Pasos para Deploy en Netlify

1. **Conectar repositorio**:
   - Ir a [netlify.com](https://netlify.com)
   - "New site from Git"
   - Conectar con GitHub/GitLab
   - Seleccionar el repositorio `veterinos`

2. **Configuración de build**:
   - Build command: (dejar vacío)
   - Publish directory: `.`
   - Todo se configurará automáticamente con `netlify.toml`

3. **Configurar dominio personalizado**:
   - En Site settings > Domain management
   - Agregar dominio personalizado
   - Configurar DNS según instrucciones

### Características Incluidas

✅ **SSL automático** con Let's Encrypt
✅ **Formulario de contacto** funcional
✅ **Headers de seguridad** configurados
✅ **Cache optimizado** para assets estáticos
✅ **Redirects** para URLs limpias
✅ **Página de éxito** tras envío de formulario

### Variables de Entorno (si necesario)

Netlify permite configurar variables de entorno en:
Site settings > Environment variables

### Performance

- **CDN global** incluido
- **Compresión automática** de assets
- **Headers de cache** optimizados
- **Lazy loading** de imágenes implementado

### Monitoreo

El sitio incluye:
- Formularios: Ver en Netlify Dashboard > Forms
- Analytics: Opcional, se puede activar en Netlify
- Logs: Disponibles en Deploy log

### Soporte Multiidioma

El sitio soporta:
- Español (por defecto)
- Catalán
- Inglés

Los archivos de traducción están en `/data/`.
