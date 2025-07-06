# ROKKA.AI Website

Development repository for ROKKA.AI Website. 2025

## Description

A modern, interactive website for ROKKA featuring advanced 3D visualizations, responsive design, and comprehensive data analytics platform showcase. Built with React 18, Three.js, and modern web technologies.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── About/           # About modal component
│   ├── Footer/          # Footer with navigation
│   ├── HomePage/        # Home page sections
│   ├── Menu/            # Navigation components
│   ├── Sketchs/         # Three.js visualization components
│   ├── UI/              # UI components (buttons, modals, etc.)
│   └── Utils/           # Utility components
├── data/                # Static data and configuration
├── plugins/             # Plugin system components
├── products/            # Product page components
│   ├── data-manager/    # Data Manager product pages
│   ├── monitoring/      # Monitoring product pages
│   └── PILA/           # PILA product pages
├── styles/              # SCSS stylesheets
└── main.jsx            # Application entry point

static/
├── fonts/               # Font files
├── glb/                 # 3D model files
├── glsl/                # Shader files
├── png/                 # PNG images
├── svg/                 # SVG icons and graphics
└── videos/              # Video assets
```

## Key Features

- **Interactive 3D Visualizations**: Advanced Three.js scenes with shader effects
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Modular Architecture**: Reusable components and modern React patterns
- **Performance Optimized**: Code splitting and optimized build pipeline
- **Professional UI/UX**: Clean design with smooth animations

## Tech Stack

- React 18 + Vite 7
- Three.js + React Three Fiber
- SCSS + Modern CSS
- GSAP for animations
- React Router v6