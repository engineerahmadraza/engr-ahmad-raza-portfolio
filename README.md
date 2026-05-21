# Engineer Ahmad Raza — 3D Portfolio

> A stunning one-page portfolio featuring an interactive 3D Iron Man helmet, Iron Man HUD-inspired UI, dark/light mode, admin project management, and full freelancer profile integration.

**Live Demo:** Deploy to Vercel (instructions below)

---

## 🚀 Tech Stack

- **Next.js 15** (App Router + Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — scroll animations & transitions
- **React Three Fiber + Three.js** — 3D Iron Man helmet
- **@react-three/drei** — 3D helpers (Float, Sparkles, Environment)
- **next-themes** — Dark / Light mode
- **Lucide React** — Icons
- **Sonner** — Toast notifications

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css        # Tailwind v4 + custom CSS
│   ├── layout.tsx         # Root layout + fonts + metadata
│   └── page.tsx           # Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx         # Top navigation + theme toggle + admin btn
│   ├── Hero.tsx           # Hero section with 3D Iron Man
│   ├── IronManScene.tsx   # Three.js Iron Man helmet
│   ├── About.tsx          # About + stats + education
│   ├── Skills.tsx         # Skill bars + tech tags
│   ├── Experience.tsx     # Career timeline
│   ├── Projects.tsx       # Portfolio grid + filter
│   ├── Research.tsx       # Research papers
│   ├── Contact.tsx        # Contact form
│   ├── Footer.tsx         # Footer
│   ├── AdminModal.tsx     # Admin panel (login + add/delete projects)
│   ├── CustomCursor.tsx   # Iron Man custom cursor
│   └── ThemeProvider.tsx  # next-themes wrapper
├── lib/
│   ├── data.ts            # All portfolio data
│   └── utils.ts           # cn() utility
└── public/
    └── projects/          # Add your project screenshots here
```

---

## 🛠️ Local Development

```bash
# 1. Clone / extract this project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 🌐 Deploy to Vercel

### Option A: GitHub → Vercel (Recommended)

1. Push this project to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit — Ahmad Raza Portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** — done! ✅

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## 🔐 Admin Panel

- Click **ADMIN** button in the navbar
- Default password: `AhmadRaza@2025`
- **Change the password** in `components/AdminModal.tsx` line:
  ```ts
  const ADMIN_PASSWORD = 'AhmadRaza@2025';
  ```
- Admin can: Add projects, delete projects, mark as featured
- Projects added via admin are stored in React state (session only)
- For persistent storage, integrate with a database (Supabase, PlanetScale, etc.)

---

## ✏️ Customization

### Update personal data
Edit `lib/data.ts`:
- `siteConfig` — name, email, phone, social links
- `stats` — update your stats
- `skills` — update skill levels
- `experience` — update work history
- `defaultProjects` — update/add projects
- `researchPapers` — update papers

### Add project images
Place images in `/public/projects/` and update the `image` field in `lib/data.ts`:
```ts
image: '/projects/your-project-image.jpg'
```

### Fonts (Google Fonts)
Currently using: **Bebas Neue** (display), **Rajdhani** (headings), **Barlow** (body)
Change in `app/layout.tsx`.

### Colors
Edit CSS variables in `app/globals.css` under `@theme { ... }`.

### Contact Form
The contact form currently shows a toast notification. To make it functional, integrate:
- **Formspree**: `https://formspree.io/f/YOUR_ID`
- **EmailJS**: `emailjs.send(...)`
- **Resend API**: `/app/api/contact/route.ts`

---

## 📸 Add Real Project Images

Replace placeholder images in `/public/projects/`:
```
stamping-machine.jpg
coffee-machine.jpg
radar-system.jpg
pizza-system.jpg
kinematics.jpg
plc-conveyor.jpg
predictive-maintenance.jpg
solar-dashboard.jpg
```

---

## 🤖 3D Iron Man

The Iron Man helmet is built entirely from Three.js geometries — no external model needed!

- **Location**: `components/IronManScene.tsx`
- **Responds to mouse movement** (parallax tilt)
- **Orbit rings** in Iron Man red, gold, and arc reactor blue
- **Glowing eyes** with pulsing animation
- **Arc reactor** with blue glow
- **Sparkles** particle system

To replace with a real Iron Man GLB model:
```tsx
// In IronManScene.tsx, replace IronManHelmet with:
import { useGLTF } from '@react-three/drei'

function IronManModel() {
  const { scene } = useGLTF('/models/iron-man.glb')
  return <primitive object={scene} />
}
```
Then place your `.glb` file in `/public/models/`.

---

## 🎨 Design Credits

- Color palette: Iron Man (Red #C62828, Gold #FFB300, Arc Blue #00BCD4)
- Style inspiration: Daily Hero - 03 Community template aesthetics
- HUD UI: Iron Man JARVIS interface inspired

---

Made with ❤️ for **Engineer Ahmad Raza** — Mechatronics Engineer, Pakistan
