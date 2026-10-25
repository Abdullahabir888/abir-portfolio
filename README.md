# Abir Portfolio

React + Vite + Tailwind CSS + Framer Motion. Dark by default, light mode toggle, fully responsive, reduced-motion aware. Contact form sends real email through a Vercel serverless function.

## Run it locally

Needs Node.js 20 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build
```

> The contact form calls `/api/contact`, which only exists on Vercel. On `npm run dev` it will show the error message (that's expected). To test it locally, run `npx vercel dev` instead.

## Edit your content

Everything lives in `src/data/` — no need to touch components.

| File | What's in it |
|---|---|
| `profile.js` | Name, email, phone, LinkedIn, **GitHub**, headline, about text, stats |
| `skills.js` | The five skill categories |
| `experience.js` | Jobs, responsibilities, verified achievements |
| `projects.js` | Projects, filters, links, screenshots |
| `products.js` | Live products you tested (Banglalink, Toffee, …) |
| `workflow.js` | QA workflow steps |
| `education.js` | Degrees, certifications, research, leadership |

- **Empty link = hidden button.** Set `github: ''` and the button disappears. No broken links.
- **Project screenshot:** drop `my-shot.png` in `public/` and set `image: '/my-shot.png'`.
- **Draft projects** (`draft: true`) show a "Details coming soon" badge.
- **Photo:** replace `public/abir.webp` (transparent background works best).
- **Resume:** replace `public/Abdullah_Al_Ahad_Abir_SQA_Resume.pdf` (keep the name or update `resume` in `profile.js`).

## Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio: first version"
git branch -M main
git remote add origin https://github.com/Abdullahabir888/abir-portfolio.git
git push -u origin main
```

Create the empty repo on github.com first (no README, no .gitignore).

## Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub.
2. **Add New → Project** → import your `abir-portfolio` repo.
3. Vercel detects Vite. Leave the defaults (build: `npm run build`, output: `dist`).
4. Add the environment variables below, then click **Deploy**.

Every push to `main` redeploys automatically.

## Contact form setup (Resend)

1. Sign up at [resend.com](https://resend.com) (free tier is enough).
2. **API Keys → Create API Key**. Copy it.
3. In Vercel: **Project → Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | `re_...` your key |
| `CONTACT_TO_EMAIL` | `abdullahabir888@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Portfolio <onboarding@resend.dev>` |

4. **Redeploy** (Deployments → ⋯ → Redeploy) so the variables load.

Notes:
- With `onboarding@resend.dev` as the sender, Resend only delivers to the email you signed up with. Sign up using the same address as `CONTACT_TO_EMAIL`. For any sender address, verify your own domain in Resend.
- The key is only read on the server (`api/contact.js`). It never reaches the browser.
- The form has client + server validation and a hidden honeypot field against bots.

## Project structure

```
api/contact.js          serverless email function
public/                 photo, resume, favicon
src/data/               all your content
src/components/         sections (Hero, About, Skills, …)
src/hooks/              theme + scroll-spy
```
