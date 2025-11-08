# NutriAI Website Development

Marketing website for NutriAI - an AI-powered nutrition app with integrated beta testing system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

**Option 1: Automated Setup (Recommended)**
```powershell
# Run setup script
.\setup.ps1
```

**Option 2: Manual Setup**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Development

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 📁 Project Structure

```
project/
├── src/                        # Frontend React application
│   ├── pages/                  # Page components
│   │   ├── Home.tsx           # Landing page
│   │   ├── About.tsx          # About page
│   │   ├── Features.tsx       # Features showcase
│   │   ├── Contact.tsx        # Contact form
│   │   ├── Beta.tsx           # 🆕 Beta signup page
│   │   └── beta-admin.tsx      # 🆕 Admin dashboard
│   ├── components/            # Shared components
│   │   └── Layout.tsx         # Navigation & footer
│   └── App.tsx                # Router configuration
├── server/                     # 🆕 Backend API server
│   ├── index.js               # Express server
│   ├── package.json           # Server dependencies
│   └── .env.example           # Environment template
├── public/                     # Static assets
└── ...config files
```

---

## 🎯 Features

### Website
- ✨ Modern React + TypeScript + Vite stack
- 🎨 Tailwind CSS with custom NutriAI brand colors
- 📱 Fully responsive mobile-first design
- 🔄 React Router for smooth navigation
- 🎭 Lucide React icons
- ⚡ Fast HMR with Vite

### Beta Testing System 🆕
- 📝 User signup with platform selection (Android/iOS)
- 🔗 Automatic Google Groups integration
- 📧 Automated welcome emails
- 📊 Admin dashboard for managing testers
- 📤 Export to CSV/JSON
- 🔐 Password-protected admin panel

---

## 🎨 Design System

### Colors
- **Primary:** `nutri-blue-500` (#33A9FF)
- **Background:** `nutri-bg` (#E3F4FF)
- **Scale:** `nutri-blue-{50-900}`

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** text-5xl to text-6xl, font-bold
- **Body:** text-xl, font-normal

### Components
- **Buttons:** Rounded-full with hover scale effects
- **Cards:** Rounded-3xl with shadow transitions
- **Icons:** w-6 h-6 or w-12 h-12 from Lucide React

---

## 🔧 Available Scripts

### Frontend
```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # TypeScript validation
```

### Backend
```bash
cd server
npm run dev       # Start API server (localhost:3001)
npm start         # Production server
```

---

## 🆕 Beta Testing System

### Setup
See [GOOGLE_SETUP_GUIDE.md](./GOOGLE_SETUP_GUIDE.md) for complete setup instructions.

### Quick Test
1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm run dev`
3. Visit: `http://localhost:5173/beta`
4. Admin panel: `http://localhost:5173/beta-admin` (password: `nutriai2025`)

### Documentation
- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[GOOGLE_SETUP_GUIDE.md](./GOOGLE_SETUP_GUIDE.md)** - Complete Google Cloud setup
- **[BETA_IMPLEMENTATION.md](./BETA_IMPLEMENTATION.md)** - System architecture

### API Endpoints
```
GET    /api/health             # Health check
GET    /api/beta-testers       # List all testers
POST   /api/beta-testers       # Add new tester
DELETE /api/beta-testers/:id   # Delete tester
DELETE /api/beta-testers       # Clear all data
```

---

## 🌐 Pages

- `/` - Home (Hero, features, CTA)
- `/about` - About NutriAI
- `/features` - Detailed features showcase
- `/contact` - Contact form
- `/beta` - 🆕 Beta testing signup
- `/beta-admin` - 🆕 Admin dashboard

---

## 🔐 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001  # Backend API URL
```

### Backend (server/.env)
```bash
PORT=3001
GOOGLE_CLIENT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
GOOGLE_GROUP_ANDROID=...
GOOGLE_GROUP_IOS=...
SMTP_HOST=...
SMTP_USER=...
# See server/.env.example for full list
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Backend (Railway/Heroku)
1. Deploy server directory
2. Set all environment variables from .env
3. Set `NODE_ENV=production`

### Before Launch
- [ ] Change admin password in `beta-admin.tsx`
- [ ] Set up Google Cloud service account
- [ ] Configure Google Groups
- [ ] Link to Play Console closed testing
- [ ] Set up TestFlight (iOS)
- [ ] Test end-to-end beta flow

---

## 🧪 Tech Stack

### Frontend
- React 18.3+
- TypeScript 5.5+
- Vite 5.4+
- Tailwind CSS 3.4+
- React Router DOM 7+
- Lucide React

### Backend
- Node.js 18+
- Express 4.18+
- Google APIs (Admin SDK)
- Nodemailer
- CORS

### Tools
- ESLint (flat config)
- PostCSS + Autoprefixer
- TypeScript compiler

---

## 📚 Development Guidelines

See [.github/copilot-instructions.md](./.github/copilot-instructions.md) for:
- Architecture patterns
- Component conventions
- Styling guidelines
- Development workflows

---

## 🐛 Troubleshooting

### Frontend Issues
- **Port 5173 in use:** Change in `vite.config.ts` or kill process
- **Module not found:** Run `npm install`
- **Type errors:** Run `npm run typecheck`

### Backend Issues
- **Port 3001 in use:** Change PORT in `.env`
- **Google API errors:** Check service account credentials
- **CORS errors:** Verify origin in CORS config
- **Email not sending:** Check SMTP credentials

### Common Solutions
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist`
3. Check all environment variables are set
4. Verify Node.js version (18+)

---

## 📖 Documentation Index

- **README.md** (this file) - Project overview
- **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup guide
- **[GOOGLE_SETUP_GUIDE.md](./GOOGLE_SETUP_GUIDE.md)** - Google Cloud configuration
- **[BETA_IMPLEMENTATION.md](./BETA_IMPLEMENTATION.md)** - Beta system details
- **[BETA_SYSTEM.md](./BETA_SYSTEM.md)** - Legacy local storage docs
- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** - Dev guidelines

---

## 🤝 Contributing

1. Follow the code style in `.github/copilot-instructions.md`
2. Use meaningful commit messages
3. Test changes locally before committing
4. Keep the design system consistent

---

## 📝 License

Private - NutriAI Project

---

## 💡 Tips

- Use the setup script for first-time setup: `.\setup.ps1`
- Test beta system locally before deploying
- Export beta tester data regularly
- Monitor Google Cloud Console for API quotas
- Keep service account keys secure
- Update admin password before launch

---

## 🆘 Need Help?

1. Check documentation in project root
2. Review server logs for detailed errors
3. Test API endpoints with curl/Postman
4. Verify environment variables
5. Check Google Cloud Console for errors

---

**Built with ❤️ for NutriAI**

🚀 Happy coding!
