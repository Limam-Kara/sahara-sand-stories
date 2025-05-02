
import React from "react";
import { Map as MapIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MapLegend = () => {
  const { language } = useLanguage();
  
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow-sm z-20">
      <MapIcon className="w-4 h-4 text-sahara-terracotta" />
      <span className="text-xs font-medium">
        {language === 'ar' ? 'الصحراء المغربية' : language === 'fr' ? 'Sahara Marocain' : 'Moroccan Sahara'}
      </span>
    </div>
  );
};

export default MapLegend;
