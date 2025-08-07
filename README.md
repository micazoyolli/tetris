# 🟦 Tetris Moderno

Juego interactivo de Tetris con canvas HTML5 y TypeScript, desarrollado con estructura modular, SCSS y Vite. Incluye lógica para niveles dinámicos y diseño responsive para desktop y mobile.

<img alt="Tetris" src="https://github.com/micazoyolli/tetris/blob/master/public/assets/screenshot.png" width="500" />

## 🌐 Demo

[Tetris Demo](https://micazoyolli.github.io/tetris/)

## 🚀 Tecnologías usadas

- HTML5 + SCSS (estructura modular)
- TypeScript (ES6+)
- Vite

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
```

Abre `http://localhost:5173/tetris/` para jugar.

## 🧠 Funcionalidad

- Lógica modular para piezas, tablero y render
- Diseño responsive (desktop + mobile)
- Niveles que incrementan la velocidad dinámicamente
- Controles por teclado y touch (mobile)

---

## 👩‍💻 Autora

Una creación de [`<micazoyolli />✨`](https://nadia.dev)
