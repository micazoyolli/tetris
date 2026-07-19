# 🟦 Tetris Moderno

Juego interactivo de Tetris con canvas HTML5 y TypeScript, desarrollado con estructura modular, SCSS y Vite. Incluye lógica para niveles dinámicos y diseño responsive para desktop y mobile.

<img alt="Tetris" src="https://github.com/micazoyolli/tetris/blob/main/public/assets/screenshot.png" width="500" />

## 🌐 Demo

[Tetris Demo](https://micazoyolli.github.io/tetris/)

## 🚀 Tecnologías usadas

- HTML5 + SCSS (estructura modular)
- TypeScript (ES6+)
- Vite 8
- Node 24
- @micazoyolli/foundation para SEO/build y reduced motion

## 📦 Estructura del proyecto

```
tetris/
├── public/
│   ├── assets/
│   ├── icons/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── meta.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── game/
│   │   ├── board.ts
│   │   ├── main.ts
│   │   ├── piece.ts
│   │   ├── renderer.ts
│   │   └── tetrominoes.ts
│   ├── styles/
│   │   ├── _buttons.scss
│   │   ├── _footer.scss
│   │   ├── _layout.scss
│   │   ├── _variables.scss
│   │   └── main.scss
├── .editorconfig
├── .gitignore
├── .nvmrc
├── index.html
├── LICENSE
├── package.json
├── tsconfig.json
└── vite.config.js
```

## ▶️ Uso

```bash
yarn install
yarn dev
yarn lint
yarn typecheck
yarn build
```

Abre `http://localhost:5173/tetris/` para jugar.

## Despliegue en GitHub Pages

Este proyecto se publica en GitHub Pages desde la rama `gh-pages`. El comando `yarn deploy` compila la aplicación, limpia archivos `.DS_Store` del build y publica `dist/` usando el CLI de Micazoyolli Foundation sin crear commits de despliegue en `main`.

La configuración `base` de Vite debe conservar la subruta del repositorio: `/tetris/`.

## 🧠 Funcionalidad

- Lógica modular para piezas, tablero y render
- Diseño responsive (desktop + mobile)
- Niveles que incrementan la velocidad dinámicamente
- Controles por teclado y touch (mobile)

---

## Construido con Micazoyolli Foundation

Este proyecto utiliza [Micazoyolli Foundation](https://github.com/micazoyolli/foundation) como infraestructura compartida. Las mejoras de tooling, estructura y despliegue deben realizarse en Foundation para beneficiar a todos los proyectos que la consumen.

## 👩‍💻 Autora

Una creación de [`<micazoyolli />✨`](https://nadia.dev)
