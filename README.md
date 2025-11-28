# Mi Mini Blog - Plantilla Personalizada

Un blog personalizado creado con Hugo y una plantilla completamente personalizada.

## 🚀 Características

- ✅ **Diseño moderno y limpio**: Interfaz minimalista que se enfoca en el contenido
- ✅ **Totalmente responsive**: Se adapta perfectamente a móviles, tablets y escritorio
- ✅ **Rápido y optimizado**: Código limpio y eficiente
- ✅ **Fácil de personalizar**: Variables CSS y plantillas bien organizadas
- ✅ **Navegación intuitiva**: Menú responsive con soporte móvil
- ✅ **Soporte para tags**: Organiza tus posts con etiquetas
- ✅ **Navegación entre posts**: Enlaces automáticos al post anterior/siguiente
- ✅ **Paginación automática**: Para listas de posts largas

## 📁 Estructura del Proyecto

```
mini-blog/
├── content/
│   └── posts/          # Tus posts de blog (markdown)
├── layouts/
│   ├── _default/
│   │   ├── baseof.html # Plantilla base
│   │   ├── list.html   # Plantilla para listas
│   │   └── single.html # Plantilla para posts individuales
│   └── index.html      # Plantilla de la página principal
├── static/
│   ├── css/
│   │   └── main.css    # Estilos principales
│   └── js/
│       └── main.js     # JavaScript para interactividad
├── hugo.toml           # Configuración de Hugo
└── README.md           # Este archivo
```

## 🛠️ Instalación y Uso

### Prerrequisitos

- [Hugo](https://gohugo.io/installation/) instalado (versión 0.80 o superior)

### Pasos

1. **Clonar o descargar el proyecto** (si es necesario)

2. **Instalar Hugo** (si aún no lo tienes):
   ```bash
   # macOS
   brew install hugo
   
   # Linux
   sudo apt-get install hugo
   
   # Windows
   choco install hugo
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   cd mini-blog
   hugo server
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:1313
   ```

5. **Generar el sitio estático** (para producción):
   ```bash
   hugo
   ```
   Los archivos generados estarán en el directorio `public/`

## ✏️ Crear Nuevos Posts

1. Crea un nuevo archivo en `content/posts/` con extensión `.md`
2. Agrega el front matter (metadatos) al inicio:

```markdown
---
title: "Título de tu Post"
date: 2024-01-30
author: "Tu Nombre"
description: "Descripción breve del post"
tags: ["tag1", "tag2"]
---

Contenido de tu post aquí...
```

3. Escribe tu contenido en Markdown
4. Guarda el archivo y Hugo lo procesará automáticamente

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `static/css/main.css`:

```css
:root {
    --color-primary: #2563eb;      /* Color principal */
    --color-primary-dark: #1e40af; /* Color principal oscuro */
    --color-secondary: #64748b;    /* Color secundario */
    /* ... más variables ... */
}
```

### Modificar la Configuración

Edita `hugo.toml` para cambiar:
- Título del sitio
- Descripción
- Información del autor
- Enlaces sociales
- Y más opciones

### Personalizar Plantillas

Las plantillas están en `layouts/`:
- `layouts/_default/baseof.html`: Estructura base de todas las páginas
- `layouts/index.html`: Página principal
- `layouts/_default/list.html`: Lista de posts
- `layouts/_default/single.html`: Post individual

## 📝 Estructura de un Post

Cada post debe tener un front matter con metadatos:

```markdown
---
title: "Título del Post"
date: 2024-01-30
author: "Nombre del Autor"
description: "Descripción breve"
tags: ["tag1", "tag2", "tag3"]
---

Contenido del post en Markdown...
```

### Campos del Front Matter

- `title`: Título del post (requerido)
- `date`: Fecha de publicación (formato: YYYY-MM-DD)
- `author`: Nombre del autor (opcional)
- `description`: Descripción breve (opcional, se usa en meta tags)
- `tags`: Array de etiquetas (opcional)

## 🎯 Características de la Plantilla

### Navegación

- Menú principal en el header
- Menú hamburguesa en dispositivos móviles
- Navegación entre posts (anterior/siguiente)

### Diseño

- Grid responsive para posts en la página principal
- Lista vertical para la página de posts
- Diseño de una columna para posts individuales
- Tipografía optimizada para lectura

### Funcionalidades

- Búsqueda de posts por tags
- Paginación automática
- Meta tags para SEO
- Soporte para código con resaltado de sintaxis
- Imágenes responsive

## 📱 Responsive Design

La plantilla está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1024px+)
- 🖥️ Pantallas grandes (1200px+)

## 🔧 Comandos Útiles

```bash
# Servidor de desarrollo con recarga automática
hugo server

# Servidor con draft posts visibles
hugo server -D

# Generar sitio estático
hugo

# Generar con draft posts
hugo -D

# Limpiar caché y regenerar
hugo --cleanDestinationDir
```

## 📚 Recursos

- [Documentación de Hugo](https://gohugo.io/documentation/)
- [Guía de Markdown](https://www.markdownguide.org/)
- [Sintaxis de Plantillas Hugo](https://gohugo.io/templates/introduction/)

## 🤝 Contribuciones

Siéntete libre de personalizar esta plantilla según tus necesidades. Es tuya para modificar y mejorar.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

¡Disfruta creando contenido con tu blog personalizado! 🎉

