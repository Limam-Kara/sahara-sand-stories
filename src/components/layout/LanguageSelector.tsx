
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";

const LanguageSelector = ({ className }: { className?: string }) => {
  const { language, setLanguage, t } = useLanguage();

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
    <div className={className}>
      <Select
        value={language}
        onValueChange={(value) => handleLanguageChange(value as Language)}
      >
        <SelectTrigger className="w-[140px] bg-background/80 border-sahara-sand">
          <div className="flex items-center">
            <Languages className="mr-2 h-4 w-4 text-sahara-orange" />
            <SelectValue placeholder={t("language.select")} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
