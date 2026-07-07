# Chiune Honda Portfolio

A minimal professional engineering portfolio website built as a static web app.

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

The command requires Python 3. On Windows, the equivalent command is:

```powershell
py -m http.server 5173 --directory public
```

## Deploy

Vercel deploys the contents of `public` as a static site. No build step is required.

Use the **Other** framework preset if configuring the Vercel project manually. The output directory is also declared in `vercel.json` so the deployment does not depend only on dashboard settings.

## Update Content

Edit `public/app.js` for project content, `public/index.html` for page copy and links, and `public/styles.css` for presentation. Keep deployable images in `public/assets`.
