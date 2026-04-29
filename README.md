# Karim Ruscitti | Powerlifting Coaching

Personal coaching site for Karim Ruscitti.
Single-page static site, no build step required.

## Deploying

### GitHub Pages

1. Create a new public repo on GitHub.
2. Push the contents of this folder to the repo's default branch.
3. In the repo settings → Pages, set the source to the default branch and `/` (root).
4. Your site will go live at `https://<username>.github.io/<repo>/`.

### Netlify

1. Push this folder to a GitHub repo.
2. On Netlify, click **Add new site → Import an existing project**.
3. Pick the repo. Leave **Build command** empty and set **Publish directory** to `.` (or leave blank).
4. Deploy.
5. (Optional) Connect a custom domain in **Site settings → Domain management**.

Netlify will automatically pick up the `_redirects` and `_headers` files in this folder.

## Folder structure

```
.
├── index.html                       # Main page
├── README.md                        # This file
├── _headers                         # Netlify response headers (caching + security)
├── _redirects                       # Netlify redirects (SPA-style 404 → index)
├── robots.txt                       # Crawler instructions
├── .gitignore                       # Git ignore rules
└── assets/
    ├── css/
    │   └── styles.css               # All page styles
    ├── js/
    │   └── app.js                   # All page behavior (form, animations, FAQ, etc.)
    └── images/
        ├── favicon.svg              # Browser tab icon
        ├── karim-hero.jpg           # Hero portrait
        └── karim-coach.jpg          # Coach section photo
```

## Form submissions

The application form posts to **Formspree** at:
`https://formspree.io/f/myklrjav`

Submissions are delivered to the email connected to that Formspree form. Manage the form's settings at https://formspree.io.

The first time someone submits, Formspree will send a verification email — confirm it once and submissions will start flowing.

For abuse protection, set "Allowed Domains" in the Formspree dashboard to your live domain once deployed.

## Local preview

Just open `index.html` in a browser, or for a closer-to-production preview run any static server in this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Updating content

* Copy / wording: edit `index.html`.
* Styles: edit `assets/css/styles.css`.
* Behavior: edit `assets/js/app.js`.
* Images: drop replacements into `assets/images/` keeping the same filenames.
