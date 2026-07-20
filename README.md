# 🟦 Tetris Moderno

Juego interactivo de Tetris con Canvas, TypeScript, niveles dinámicos y controles para desktop y mobile.

<img alt="Tetris" src="https://github.com/micazoyolli/tetris/blob/main/public/assets/screenshot.png" width="500" />

## 🌐 Demo

[Tetris Demo](https://micazoyolli.github.io/tetris/)

## 🛠️ Tecnologías

- HTML5
- TypeScript
- SCSS
- Vite
- Canvas API
- Node 24
- Micazoyolli Foundation para SEO/build y reduced motion

## 📦 Instalación

```bash
yarn install
```

## 🚀 Scripts

```bash
yarn dev
yarn lint
yarn typecheck
yarn build
yarn preview
yarn deploy
```

Abre `http://localhost:5173/tetris/` para jugar en local.

## 🗂️ Estructura del proyecto

```txt
public/
scripts/
src/
├── game/
└── styles/
```

## 🚢 Despliegue en GitHub Pages

Este proyecto se publica en GitHub Pages desde la rama `gh-pages`. El comando `yarn deploy` compila la aplicación, limpia archivos `.DS_Store` del build y publica `dist/` usando el CLI de Micazoyolli Foundation sin crear commits de despliegue en `main`.

La configuración `base` de Vite debe conservar la subruta del repositorio: `/tetris/`.

## 🧠 Funcionalidad

- Lógica modular para piezas, tablero y render.
- Niveles que incrementan la velocidad dinámicamente.
- Controles por teclado y touch.
- Diseño responsive para desktop y mobile.

## 🧩 Construido con Micazoyolli Foundation

Este proyecto utiliza [Micazoyolli Foundation](https://github.com/micazoyolli/foundation) como infraestructura compartida. Las mejoras de tooling, estructura y despliegue deben realizarse en Foundation para beneficiar a todos los proyectos que la consumen.

## 👩‍💻 Autora

Una creación de [`<micazoyolli />✨`](https://nadia.dev)
