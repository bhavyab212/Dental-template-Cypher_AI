# Dental-template-Cypher_AI

Dental clinic site (Framer export) with custom booking slot-picker, FlavorFit-style refresh, and Cypher AI credit.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy

```bash
npm run build    # outputs static files to dist/
```

Upload the contents of `dist/` to your server (or `npm start` to serve it with preview).
SPA fallback for sub-routes (`/contact`, `/about`, …) is included:

- Vercel → `vercel.json`
- Netlify → `netlify.toml`
- Apache/cPanel → `.htaccess` (shipped inside `dist/` via `public/`)

For Nginx add:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```