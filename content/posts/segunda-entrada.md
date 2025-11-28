---
title: "Cómo Personalizar tu Blog"
date: 2024-01-20
author: "Tu Nombre"
description: "Guía rápida para personalizar tu blog de Hugo. Aprende a modificar colores, tipografías y layouts."
tags: ["hugo", "personalización", "tutorial"]
category: "leadership"
context: "Tutorial · Personalización"
metric: "100%"
metric_unit: "Customizable"
---

En esta entrada, te mostraré cómo puedes personalizar fácilmente tu blog.

## Cambiar Colores

Los colores están definidos en variables CSS al inicio del archivo `static/css/main.css`. Puedes modificar:

```css
:root {
    --color-primary: #2563eb;
    --color-primary-dark: #1e40af;
    --color-secondary: #64748b;
    /* ... más colores ... */
}
```

## Modificar la Configuración

Edita el archivo `hugo.toml` para cambiar:

- Título del sitio
- Descripción
- Información del autor
- Y mucho más

## Agregar Nuevas Secciones

Puedes crear nuevas páginas agregando archivos en el directorio `content/` y creando plantillas personalizadas en `layouts/`.

## Conclusión

Personalizar tu blog es muy sencillo. Solo necesitas modificar los archivos de plantilla y CSS según tus necesidades.

