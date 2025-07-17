# Veterinarios - Sitio Web Clínica Veterinaria

Un sitio web profesional y responsive para una clínica veterinaria con soporte multiidioma (Español, Catalán e Inglés).

## 🌟 Características

- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y escritorio
- **Multiidioma**: Soporte para Español, Catalán e Inglés
- **Scroll Suave**: Navegación fluida con anclas
- **Formulario de Contacto**: Integrado con Netlify Forms
- **Lazy Loading**: Carga optimizada de imágenes
- **Animaciones**: Efectos visuales suaves al hacer scroll
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Navegación por teclado y ARIA labels

## 📁 Estructura del Proyecto

```
/
├── index.html              # Página principal
├── servicios.html          # Página de servicios
├── equipo.html             # Página del equipo
├── instalaciones.html      # Página de instalaciones
├── contacto.html           # Página de contacto
├── css/
│   └── styles.css          # Estilos CSS principales
├── js/
│   └── main.js             # JavaScript principal
├── data/
│   ├── es.json             # Traducciones en español
│   ├── ca.json             # Traducciones en catalán
│   └── en.json             # Traducciones en inglés
├── images/                 # Imágenes del sitio
└── README.md               # Este archivo
```

## 🚀 Características Técnicas

### HTML5
- Estructura semántica
- Meta tags optimizados para SEO
- Soporte para Open Graph
- Formularios accesibles

### CSS3
- Variables CSS para fácil personalización
- Grid y Flexbox para layouts responsive
- Animaciones CSS
- Mobile-first approach

### JavaScript (Vanilla)
- Sistema de multiidioma dinámico
- Validación de formularios
- Lazy loading de imágenes
- Scroll animations
- Navegación responsive

## 📱 Páginas Incluidas

1. **Inicio**: Hero section, servicios destacados, información sobre la clínica
2. **Servicios**: Listado detallado de todos los servicios veterinarios
3. **Equipo**: Presentación del equipo médico y valores
4. **Instalaciones**: Tour virtual de las instalaciones y tecnología
5. **Contacto**: Formulario de contacto, información y mapa

## 🌍 Multiidioma

El sistema de idiomas es completamente dinámico:
- Detección automática del idioma del navegador
- Persistencia de la selección en localStorage
- Carga asíncrona de traducciones
- Fallback a español en caso de error

### Añadir un nuevo idioma:

1. Crear archivo `data/[codigo].json` con las traducciones
2. Añadir opción al selector de idioma en los HTML
3. El JavaScript automáticamente detectará y cargará el nuevo idioma

## 📧 Formulario de Contacto

Configurado para Netlify Forms:
- Validación del lado cliente
- Protección anti-spam integrada
- Campos: nombre, email, teléfono, mascota, tipo consulta, mensaje
- Checkbox de consentimiento de privacidad

## 🎨 Personalización

### Colores
Modifica las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #2c5aa0;
    --secondary-color: #28a745;
    /* ... más variables */
}
```

### Contenido
- Textos: Modifica los archivos JSON en `data/`
- Imágenes: Reemplaza las imágenes en `images/`
- Información de contacto: Actualiza en los archivos JSON

## 🚀 Deployment

### Netlify
1. Conecta tu repositorio de GitHub
2. Build settings:
   - Build command: (ninguno necesario)
   - Publish directory: `/`
3. Las variables de entorno no son necesarias
4. El formulario de contacto funcionará automáticamente

### GitHub Pages
También compatible con GitHub Pages, solo sube los archivos al repositorio.

## 📋 Lista de Tareas Post-Deploy

- [ ] Reemplazar imágenes placeholder con fotos reales
- [ ] Actualizar información de contacto en JSON
- [ ] Configurar dominio personalizado
- [ ] Añadir favicon personalizado
- [ ] Integrar Google Maps (opcional)
- [ ] Configurar Google Analytics (opcional)
- [ ] Optimizar imágenes para web

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript ES6+
- JSON para data management
- Netlify Forms
- Git/GitHub

## 📱 Compatibilidad

- ✅ Chrome (último)
- ✅ Firefox (último)  
- ✅ Safari (último)
- ✅ Edge (último)
- ✅ Dispositivos móviles iOS/Android

## 📄 Licencia

Este proyecto es de uso libre para el cliente. Puedes modificarlo según tus necesidades.

## 🤝 Soporte

Para cualquier duda o modificación, contacta con el desarrollador.

---

**Desarrollado con ❤️ para la comunidad veterinaria**
