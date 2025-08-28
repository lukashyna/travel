# 🌍 Travel App

A modern **Next.js 15 + TypeScript** web application that helps users explore and organize their favorite places.  
The app includes **interactive maps**, **multilingual support**, and a smooth **responsive UI** built with TailwindCSS.

---

## 🚀 Features

- **Next.js 15** – server-side rendering, static site generation, and fast routing.
- **TypeScript** – type safety and cleaner development.
- **Tailwind CSS** – utility-first styling for a modern and responsive design.
- **Mapbox GL** – interactive maps with custom markers and favorite places.
- **Formik + Yup** – form handling with validation.
- **Axios** – API requests made simple.
- **next-intl** – full internationalization support (English, Ukrainian, Estonian).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Maps:** [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- **Forms:** [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
- **State & API:** [Axios](https://axios-http.com/)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/)

---

## 📦 Installation & Setup

Clone the repository:

```
git clone https://github.com/your-username/travel-app.git
cd travel-app
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Build for production:

```
npm run build
npm start
```

Lint and fix:

```
npm run lint
```

## 🌍 Internationalization (i18n)

The app supports multiple languages:
• 🇬🇧 English
• 🇺🇦 Українська
• 🇪🇪 Eesti

Translations are managed with next-intl and stored in JSON files inside /messages.

## 🗺️ Mapbox Setup

To use the map features, create a free account at Mapbox, get your API key, and add it to your environment variables:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```
