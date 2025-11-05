import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/beta', label: 'Beta' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-nutri-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-nutri-blue-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                NutriAI
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative ${
                    isActive(link.path)
                      ? 'text-nutri-blue-500'
                      : 'text-gray-700 hover:text-nutri-blue-500'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <div className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-nutri-blue-500" />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-nutri-blue-500 text-white rounded-full font-semibold hover:bg-nutri-blue-600 hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-nutri-blue-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-nutri-blue-100">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-2xl transition-colors ${
                    isActive(link.path)
                      ? 'bg-nutri-blue-50 text-nutri-blue-500 font-semibold'
                      : 'text-gray-700 hover:bg-nutri-blue-50 hover:text-nutri-blue-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 bg-nutri-blue-500 text-white rounded-2xl font-semibold text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-nutri-blue-500 rounded-2xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">NutriAI</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Your personal AI nutritionist, helping you make smarter food choices and reach your wellness goals effortlessly.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-nutri-blue-500 transition-colors font-medium">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-nutri-blue-500 transition-colors font-medium">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-nutri-blue-500 transition-colors font-medium">
                  Facebook
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-600 hover:text-nutri-blue-500 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>hello@nutriai.app</li>
                <li>@NutriAI</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2025 NutriAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
