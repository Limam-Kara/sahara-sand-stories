
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  const navItems = [
    { label: t("nav.history"), href: "#histoire" },
    { label: t("nav.lifestyle"), href: "#lifestyle" },
    { label: t("nav.festivals"), href: "#festivals" },
    { label: t("nav.art"), href: "#art" },
    { label: t("nav.explore"), href: "#explorer" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-sahara-brown/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      )}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#"
            className={cn(
              "text-xl md:text-2xl font-playfair font-bold transition-colors duration-200",
              isScrolled ? "text-sahara-terracotta" : "text-sahara-sand"
            )}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Sahara<span className="text-sahara-orange">Stories</span>
          </a>

          <div className="hidden md:flex items-center">
            <div className={cn("flex", language === "ar" ? "space-x-reverse" : "", "space-x-8")}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "transition-colors duration-200",
                    isScrolled ? "text-black hover:text-sahara-terracotta" : "text-white hover:text-sahara-terracotta"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="ml-8">
              <LanguageSelector />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <LanguageSelector />
            </div>
            <button
              className={cn("md:hidden", isScrolled ? "text-black" : "text-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-sahara-brown/95 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-60" : "max-h-0"
        )}
      >
        <div className="px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md transition-colors duration-200",
                isScrolled ? "text-black hover:text-sahara-terracotta" : "text-white hover:text-sahara-terracotta"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>


  );
};

export default Navbar;
