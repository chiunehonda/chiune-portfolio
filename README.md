# Chiune Honda Engineering Portfolio

A fast, static engineering portfolio deployed from `public` on Vercel.

## Structure

- `public/index.html` contains the page structure and contact information.
- `public/app.js` contains project content and interactions.
- `public/styles.css` contains the responsive visual system.
- `public/assets` contains project images.
- `public/projects` contains standalone interactive project demos.

## Repository Structure

- `public/index.html` contains the page structure.
- `public/app.js` contains project content and interactions.
- `public/styles.css` contains the visual styling.
- `public/assets` contains the portfolio images.

The `public` directory is the complete deployable website.

## Preview Locally

```bash
npm run dev
```

Open `http://localhost:5173`.

Python 3 is required. On Windows, the equivalent direct command is:

```powershell
py -m http.server 5173 --directory public
```

## Deploy

Vercel serves `public` directly with no build step. Use the **Other** framework preset if configuring the project manually.
