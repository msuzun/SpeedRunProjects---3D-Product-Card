# Frontend Setup - Installation Commands

## Initial Setup

```bash
# Create Vite React TypeScript project
npm create vite@latest frontend -- --template react-ts

# Navigate to frontend directory
cd frontend

# Install all required packages
npm install @reduxjs/toolkit react-redux @tanstack/react-query tailwindcss postcss autoprefixer @react-three/fiber @react-three/drei three @tailwindcss/postcss

# Install TypeScript types
npm install -D @types/react @types/react-dom @types/three @types/node
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ErrorBoundary.tsx
│   ├── hooks/
│   │   └── useProduct.ts
│   ├── store/
│   │   ├── uiSlice.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── types/
│   │   └── product.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── vite.config.ts
├── tsconfig.app.json
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_BASE_URL=https://localhost:5001
```

## Running the Project

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

