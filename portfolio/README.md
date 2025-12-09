# Portfolio

A clean, minimal portfolio website for UX designers built with React, TypeScript, and Vite.

## Features

- **Minimal Design**: Clean, off-white background with elegant typography
- **Responsive**: Fully responsive design that works on all devices (mobile, tablet, desktop)
- **Smooth Navigation**: Fixed navigation menu with smooth scrolling between sections
- **Three Main Sections**:
  - My Work
  - About Me
  - Contact

## Tech Stack

- React 19
- TypeScript
- Vite
- Firebase (for hosting)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint
- `yarn deploy` - Build and deploy to Firebase Hosting

## Deployment

The project is configured to deploy to Firebase Hosting. To deploy:

1. Make sure you have Firebase CLI installed and are logged in
2. Run:
```bash
yarn deploy
```

This will build the project and deploy it to Firebase Hosting.

## Project Structure

```
portfolio/
├── src/
│   ├── App.tsx       # Main application component
│   ├── App.css       # Component styles
│   ├── index.css     # Global styles
│   └── main.tsx      # Application entry point
├── public/           # Static assets
├── firebase.json     # Firebase configuration
└── package.json      # Dependencies and scripts
```

## Customization

Replace the Lorem ipsum text in `src/App.tsx` with your actual content. The design uses:

- **Background**: Off-white (#FAFAFA)
- **Text**: Off-black (#1A1A1A)
- **Font**: Georgia serif font family

## License

Private project
