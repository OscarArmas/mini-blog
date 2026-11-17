# mini-blog

Blog personal de Oscar A, generado con Hugo y un tema propio en `layouts/`. El contenido está en inglés.

## Requisitos

- [Hugo extended](https://gohugo.io/installation/) 0.152.2 (la misma versión que usa GitHub Actions)

## Desarrollo

```bash
hugo server
```

El sitio local queda en `http://localhost:1313`.

## Publicar

Cada push a `main` construye el sitio y lo despliega en GitHub Pages. `baseURL` en `hugo.toml` apunta al project site; el workflow lo vuelve a fijar con la URL que reporta Pages.

`public/` no se versiona. El build usa `--cleanDestinationDir` para no dejar HTML de posts borrados.

## Posts

```bash
hugo new content posts/mi-post/index.md
```

Front matter que usa el tema:

```yaml
---
title: "Título"
date: 2026-01-01
description: "Resumen para la tarjeta y el meta description"
tags: ["mlops"]
categories: ["platform"]
context: "Empresa · Área"
metric: "200+"
metric_unit: "RPS"
draft: true
---
```

`draft: true` oculta el post de la home y de las listas. Quítalo para publicarlo.

Las imágenes van en la misma carpeta que el `index.md` y se referencian por nombre de archivo.

## Dónde editar

- `hugo.toml`: título, bio, menú y descripción
- `layouts/`: HTML del home, listas y posts
- `layouts/partials/css/`: estilos (el CSS se incrusta en cada página)
- `static/images/`: favicon y assets que no pertenecen a un post
