# 🚀 Kshitij Rastogi — 3D Developer Portfolio

A modern, highly interactive **3D Developer Portfolio** built with **React**, **Three.js**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**. This portfolio features an animated 3D canvas background with scroll-reactive avatar movement state management, interactive problem-solving dashboards, modular UI components, and a serverless contact API.

---

## 🌟 Features & Highlights

- **3D Background Canvas (`ThreeBackground`)**: Interactive 3D scene powered by Three.js & `@react-three/fiber` featuring dynamic lighting, particle effects, and floating 3D elements.
- **Scroll-Reactive Character Mechanics**: Character animation states (`idle` ↔ `walk` ↔ `run`) dynamically driven by scroll velocity (`framer-motion`) and navigation clicks.
- **LeetCode Stats Dashboard (`Leetcode`)**: Dedicated interactive section visualizing solved problem metrics, difficulty distributions, topic tags, and streak trackers.
- **Interactive Experience Timeline (`Experience`)**: Visual card timeline detailing professional software engineering experience and roles.
- **Projects Showcase (`Projects`)**: Filterable project cards highlighting full-stack web applications with live links and source code buttons.
- **Certifications Gallery (`Certificates`)**: Tech certification grid with preview modals and direct verification links.
- **Education & Resume Viewer**: Detailed academic background along with quick resume preview and download features.
- **Serverless Contact Form (`Contact`)**: Functional contact form powered by an Express API locally and Vercel serverless functions in production.
- **Responsive Dark Design**: Optimized for all device sizes with Tailwind CSS v4 and sleek micro-animations.

---

## 🏗️ Architecture & Project Structure

The project follows a component-driven architecture separating UI components, 3D graphics state engines, and API endpoints.

```
kshitij3jsportfolio/
├── api/
│   └── contact.ts           # Production Vercel serverless API function
├── public/                  # Static assets (3D GLTF models, icons, images)
├── src/
│   ├── components/
│   │   ├── About.tsx        # Technical skills & bio section
│   │   ├── Certificates.tsx # Certifications card grid & viewer
│   │   ├── Contact.tsx      # Interactive contact form & API integration
│   │   ├── Education.tsx    # Academic timeline & qualifications
│   │   ├── Experience.tsx   # Professional career history timeline
│   │   ├── Hero.tsx         # Intro landing section with animated typewriter
│   │   ├── Leetcode.tsx     # Coding stats dashboard & topic breakdowns
│   │   ├── Navbar.tsx       # Navigation bar with scroll-trigger dispatchers
│   │   ├── Projects.tsx     # Card showcase of full-stack projects
│   │   ├── Resume.tsx       # Resume preview modal / download links
│   │   └── ThreeBackground.tsx # Three.js canvas, GLTF model loader & animation loop
│   ├── lib/
│   │   └── utils.ts         # Helper utilities (clsx + tailwind-merge)
│   ├── App.tsx              # Main layout, scroll velocity listener & state orchestrator
│   ├── index.css            # Tailwind CSS styling & custom dark mode rules
│   └── main.tsx             # React application entry point
├── server.ts                # Custom Node.js/Express server for dev & local API testing
├── vercel.json              # Rewrites configuration for Vercel deployment
├── vite.config.ts           # Vite build & plugin configuration
└── package.json             # Project metadata and dependency configuration
```

### 🧠 Core Architectural Flow
1. **Scroll State Engine**: `App.tsx` attaches listeners to `scrollYProgress` and `scrollVelocity` using `framer-motion`. State updates trigger prop changes in `ThreeBackground.tsx`.
2. **3D Animation Loop**: `ThreeBackground.tsx` consumes the `movementMode` prop (`idle`, `walk`, `run`) to smoothly transition 3D avatar GLTF clip actions via `@react-three/drei` and `framer-motion-3d`.
3. **Contact API Handling**:
   - **Local Development**: `server.ts` runs an Express backend that handles `POST /api/contact`.
   - **Production**: Requests to `/api/contact` are routed via `vercel.json` to the Vercel serverless function at `api/contact.ts`.

---

## 🛠️ Tech Stack

### Frontend & Graphics
- **Core Library**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **3D Graphics & Models**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), `framer-motion-3d`, `maath`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/vite`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons & UI Helpers**: [Lucide React](https://lucide.dev/), `react-scroll`, `react-simple-typewriter`

### Backend & API
- **Server Framework**: [Express.js](https://expressjs.com/) (Local server)
- **Deployment & Serverless**: [Vercel Serverless Functions](https://vercel.com/docs/functions) (`@vercel/node`)

---

## ⚙️ Getting Started (Run Locally)

Follow these steps to run the application on your local environment:

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm** (v9+) or **yarn** / **pnpm**

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/kshitij3jsportfolio.git
cd kshitij3jsportfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Local Development Server

#### Option A: Standard Vite Dev Server
To launch the Vite development server with hot-module replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

#### Option B: Express Server with API Endpoints
To test local API endpoints (`/api/contact`) alongside the Vite app using the Express server:
```bash
npx tsx server.ts
```
Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

