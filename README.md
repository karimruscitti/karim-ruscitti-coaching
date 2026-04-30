# Karim Ruscitti | Powerlifting Coaching

React + TypeScript + Tailwind/Vite web app for Karim Ruscitti's powerlifting coaching site.

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
.
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── images/
│       ├── css/
│       └── js/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── styles.css
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

The current visual system is preserved in `src/styles.css`, with Tailwind configured for future component-level styling.

## Form Submissions

The application form posts to Formspree at:

```text
https://formspree.io/f/myklrjav
```

Submissions are delivered to the email connected to that Formspree form. For abuse protection, set "Allowed Domains" in Formspree to the live domain once deployed.

## Deployment

For Netlify or similar static hosts:

- Build command: `npm run build`
- Publish directory: `dist`

Netlify will also pick up `_headers` and `_redirects` from the project root if configured to copy static deploy files.
