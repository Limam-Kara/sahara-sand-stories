
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/95 dark:bg-sahara-brown/95 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold text-sahara-brown dark:text-sahara-sand font-serif">
            {t('site.title')}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5">
            <a href="#histoire" className="nav-link">
              {t('nav.history')}
            </a>
            <a href="#art" className="nav-link">
              {t('nav.art')}
            </a>
            <a href="#explorer" className="nav-link">
              {t('nav.explore')}
            </a>
            <Link to="/dashboard" className="nav-link">
              {t('nav.dashboard')}
            </Link>
          </nav>

          <LanguageSelector />

          <Button
            variant="outline"
            className="hidden md:inline-flex border-sahara-brown text-sahara-brown dark:border-sahara-sand dark:text-sahara-sand hover:bg-sahara-sand/10"
          >
            {t('nav.contact')}
          </Button>

          {/* Mobile menu button */}
          <button className="md:hidden text-sahara-brown dark:text-sahara-sand">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
