
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageSelector = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" }
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.classList.remove("rtl");
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", language === "ar" ? "space-x-reverse" : "", className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as Language)}
          className={cn(
            "px-2 py-1 text-sm rounded-md transition-colors",
            language === lang.code
              ? "bg-sahara-orange text-white"
              : "hover:bg-sahara-sand/30 text-foreground"
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
