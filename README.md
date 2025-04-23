# React Admin Dashboard

An interactive analytics dashboard for startups, featuring real-time metrics visualization, user analytics, revenue tracking, and engagement monitoring.  
Built with React, Chart.js, Tailwind CSS, Vite, and Framer Motion.

## 🚀 Features

- Real-time Line, Bar, Pie, and Doughnut charts (Chart.js)
- Active user analytics (sessions, retention)
- Revenue tracking (daily, weekly, monthly)
- Engagement monitoring (clicks, form conversions)
- Responsive, mobile-first design
- Smooth animations (Framer Motion)
- Modular & scalable architecture

## 🛠 Tech Stack

- **Framework:** React 18  
- **Bundler:** Vite  
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer  
- **Charts:** Chart.js  
- **Routing:** React Router v6  
- **Animations:** Framer Motion  
- **Icons:** Lucide React  
- **Utilities:** date-fns  
- **Linting & Types:** ESLint, TypeScript  

## 📥 Installation

### Prerequisites

- Node.js ≥ 16.x  
- npm ≥ 8.x **or** Yarn ≥ 1.22.x  

### Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/medxpy/React-Admin-Dashboard.git
   cd React-Admin-Dashboard
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser and visit**  
   ```
   http://localhost:5173
   ```

---

## 📁 Folder Structure

```
React Dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # UI and dashboard components
│   │   ├── dashboard/   # Chart and KPI components
│   │   ├── layout/      # Layout and navigation
│   │   └── ui/          # UI primitives (Card, Tab, etc.)
│   ├── pages/           # Application pages (Dashboard, UserAnalytics)
│   ├── services/        # Data and API services (mockData)
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── index.css        # Tailwind CSS entry
│   └── main.tsx         # App entry point
├── index.html           # HTML template
├── package.json         # Project configuration
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript config
└── README.md            # Project documentation
```

---

## 🧑‍💻 Contributing

Contributions are welcome!  
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m 'Add some feature'`)  
4. Push to the branch (`git push origin feature/your-feature`)  
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ by [Mohamed].  
> Inspired by modern SaaS analytics dashboards.