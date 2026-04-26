# Shaheed Mohamed - Premium Portfolio

A high-end, modern portfolio website with advanced animations, unique UI/UX, and seamless integrations.

## 🎨 Features

- **Cinematic Hero Section** - Stunning entrance animations with mouse-following effects
- **Advanced Animations** - Custom Framer Motion animations, parallax effects, and smooth transitions
- **GitHub Integration** - Auto-fetches and displays your latest projects dynamically
- **Client Reviews** - Animated carousel showcasing testimonials
- **Responsive Design** - Mobile-first approach with perfect performance on all devices
- **Glass Morphism UI** - Modern glass-effect components with gradient accents
- **Dark/Light Mode** - Theme toggle with smooth transitions
- **Contact Form** - Beautiful contact section with form validation
- **SEO Optimized** - Proper meta tags and semantic HTML structure

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Animations**: Framer Motion + GSAP
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd myportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Customization

### Update Personal Information
- Edit `src/components/Contact.jsx` - Add your email, phone, and location
- Edit `src/components/Navbar.jsx` - Update navigation links
- Edit `src/components/Hero.jsx` - Customize the slogan and CTA buttons

### GitHub Integration
The portfolio automatically fetches your repositories from:
```
https://api.github.com/users/shaheedmohamed/repos
```

Update the username in `src/components/Projects.jsx` to your GitHub username.

### Customize Colors
Edit `tailwind.config.js` to change the accent colors:
```js
colors: {
  accent: '#00d9ff',        // Cyan
  'accent-dark': '#0099cc', // Dark cyan
}
```

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly buttons and interactions
- Optimized animations for mobile performance
- Proper viewport scaling

## 🌐 Deployment

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite configuration

## 📊 Performance

- Lazy loading for images
- Optimized animations (GPU-accelerated)
- Code splitting with Vite
- Minified production build

## 🎬 Animation Highlights

- **Hero Section**: Mouse-following gradient, floating elements, staggered text animations
- **Projects**: Hover effects, smooth transitions, animated cards
- **Reviews**: Carousel with spring physics, smooth slide transitions
- **Contact**: Form validation animations, success state feedback
- **Navigation**: Sticky navbar with glass effect on scroll

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues, feel free to reach out!

---

**Built with ❤️ by Shaheed Mohamed**
