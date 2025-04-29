
import { createContext, useContext, useState, ReactNode } from "react";

// Define available languages
export type Language = "en" | "fr" | "ar";

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

// Define translations
const translations = {
  en: {
    // Navbar
    "nav.history": "History",
    "nav.lifestyle": "Lifestyle",
    "nav.festivals": "Festivals",
    "nav.art": "Art & Music",
    "nav.explore": "Explore",

    // Hero
    "hero.title": "Sahrawi Culture",
    "hero.subtitle": "Discover the ancestral heritage of the desert people, a culture rich in traditions, hospitality, and deep connections with nature.",
    "hero.button": "Discover",
    "hero.scroll": "Scroll",

    // Section titles
    "section.history": "History & Traditions",
    "section.lifestyle": "Lifestyle & Cuisine",
    "section.festivals": "Festivals & Celebrations",
    "section.art": "Art & Music",
    "section.explore": "Explore the Sahara",
    
    // Art section
    "art.expression": "Musical Expression",
    "art.description": "Sahrawi music is deeply connected to oral tradition, transmitting the history, values, and emotions of the desert people. The enchanting melodies and hypnotic rhythms evoke the vast expanses of the Sahara and nomadic life.",
    "art.poetry": "Poetry & Stories",
    "art.poetry.description": "Poetry is at the heart of Sahrawi culture. Poems, called \"talab\" or \"lghna\", are recited during gatherings and celebrations. They address themes such as love, honor, bravery, and the beauty of the desert.",
    "art.instruments": "Traditional Instruments",
    "art.crafts": "Sahrawi Crafts",
    "art.crafts.description": "Sahrawi craftsmanship is characterized by vibrant geometric patterns reflecting the desert environment and conveying important cultural symbols. Each piece tells a story and preserves ancestral techniques.",

    // Festivals section
    "festivals.title": "Festivals & Celebrations",
    "festivals.subtitle": "Discover the events that animate Sahrawi culture throughout the year",
    "festivals.calendar": "Festival Calendar",
    "festivals.calendar.description": "Plan your trip to experience these unique cultural experiences",
    "festivals.seasons.spring": "Spring",
    "festivals.seasons.summer": "Summer",
    "festivals.seasons.autumn": "Autumn",
    "festivals.seasons.winter": "Winter",
    "festivals.more": "Learn more",

    // Explore section
    "explore.title": "Explore the Sahara",
    "explore.subtitle": "Tips and information for traveling in the Sahrawi desert",
    "explore.destinations": "Sahrawi Destinations",
    "explore.map": "Interactive Map of Saharan Regions",
    "explore.tips": "Travel Tips",
    "explore.preparation": "Preparing your trip",
    "explore.cultural": "Cultural respect",
    "explore.safety": "Desert safety",
    "explore.tip": "Good to know",

    // Footer
    "footer.sections": "Sections",
    "footer.contact": "Contact"
  },
  fr: {
    // Navbar
    "nav.history": "Histoire",
    "nav.lifestyle": "Mode de Vie",
    "nav.festivals": "Festivals",
    "nav.art": "Art & Musique",
    "nav.explore": "Explorer",

    // Hero
    "hero.title": "Culture Sahraouie",
    "hero.subtitle": "Découvrez l'héritage ancestral du peuple du désert, une culture riche en traditions, hospitalité et liens profonds avec la nature.",
    "hero.button": "Découvrir",
    "hero.scroll": "Défiler",

    // Section titles
    "section.history": "Histoire & Traditions",
    "section.lifestyle": "Mode de Vie & Cuisine",
    "section.festivals": "Festivals & Célébrations",
    "section.art": "Art & Musique",
    "section.explore": "Explorer le Sahara",
    
    // Art section
    "art.expression": "Expression Musicale",
    "art.description": "La musique sahraouie est profondément liée à la tradition orale, transmettant l'histoire, les valeurs et les émotions du peuple du désert. Les mélodies envoûtantes et les rythmes hypnotiques évoquent les vastes étendues du Sahara et la vie nomade.",
    "art.poetry": "Poésie & Récits",
    "art.poetry.description": "La poésie est au cœur de la culture sahraouie. Les poèmes, appelés \"talab\" ou \"lghna\", sont récités lors des rassemblements et célébrations. Ils abordent des thèmes comme l'amour, l'honneur, la bravoure et la beauté du désert.",
    "art.instruments": "Instruments Traditionnels",
    "art.crafts": "Artisanat Sahraoui",
    "art.crafts.description": "L'artisanat sahraoui est caractérisé par des motifs géométriques aux couleurs vives, reflétant l'environnement désertique et transmettant des symboles culturels importants. Chaque pièce raconte une histoire et préserve les techniques ancestrales.",

    // Festivals section
    "festivals.title": "Festivals & Célébrations",
    "festivals.subtitle": "Découvrez les événements qui animent la culture sahraouie tout au long de l'année",
    "festivals.calendar": "Calendrier des Festivals",
    "festivals.calendar.description": "Planifiez votre voyage pour vivre ces expériences culturelles uniques",
    "festivals.seasons.spring": "Printemps",
    "festivals.seasons.summer": "Été",
    "festivals.seasons.autumn": "Automne",
    "festivals.seasons.winter": "Hiver",
    "festivals.more": "En savoir plus",

    // Explore section
    "explore.title": "Explorer le Sahara",
    "explore.subtitle": "Conseils et informations pour voyager dans le désert sahraoui",
    "explore.destinations": "Destinations Sahraouies",
    "explore.map": "Carte Interactive des Régions Sahariennes",
    "explore.tips": "Conseils de Voyage",
    "explore.preparation": "Préparer son voyage",
    "explore.cultural": "Respect culturel",
    "explore.safety": "Sécurité dans le désert",
    "explore.tip": "Bon à savoir",

    // Footer
    "footer.sections": "Sections",
    "footer.contact": "Contact"
  },
  ar: {
    // Navbar
    "nav.history": "التاريخ",
    "nav.lifestyle": "نمط الحياة",
    "nav.festivals": "المهرجانات",
    "nav.art": "الفن والموسيقى",
    "nav.explore": "استكشاف",

    // Hero
    "hero.title": "الثقافة الصحراوية",
    "hero.subtitle": "اكتشف التراث القديم لشعب الصحراء، ثقافة غنية بالتقاليد والضيافة والروابط العميقة مع الطبيعة.",
    "hero.button": "اكتشف",
    "hero.scroll": "مرر للأسفل",

    // Section titles
    "section.history": "التاريخ والتقاليد",
    "section.lifestyle": "نمط الحياة والمطبخ",
    "section.festivals": "المهرجانات والاحتفالات",
    "section.art": "الفن والموسيقى",
    "section.explore": "استكشف الصحراء",
    
    // Art section
    "art.expression": "التعبير الموسيقي",
    "art.description": "ترتبط الموسيقى الصحراوية ارتباطًا وثيقًا بالتقاليد الشفهية، وتنقل تاريخ وقيم ومشاعر أهل الصحراء. تستحضر الألحان الساحرة والإيقاعات المنومة المساحات الشاسعة للصحراء والحياة البدوية.",
    "art.poetry": "الشعر والقصص",
    "art.poetry.description": "الشعر هو في صميم الثقافة الصحراوية. تُلقى القصائد، المسماة \"طلب\" أو \"لغنا\"، خلال التجمعات والاحتفالات. تتناول موضوعات مثل الحب والشرف والشجاعة وجمال الصحراء.",
    "art.instruments": "الآلات التقليدية",
    "art.crafts": "الحرف الصحراوية",
    "art.crafts.description": "تتميز الحرف اليدوية الصحراوية بأنماط هندسية نابضة بالحياة تعكس البيئة الصحراوية وتنقل رموزًا ثقافية مهمة. كل قطعة تروي قصة وتحافظ على التقنيات القديمة.",

    // Festivals section
    "festivals.title": "المهرجانات والاحتفالات",
    "festivals.subtitle": "اكتشف الأحداث التي تنشط الثقافة الصحراوية على مدار العام",
    "festivals.calendar": "جدول المهرجانات",
    "festivals.calendar.description": "خطط لرحلتك لتعيش هذه التجارب الثقافية الفريدة",
    "festivals.seasons.spring": "الربيع",
    "festivals.seasons.summer": "الصيف",
    "festivals.seasons.autumn": "الخريف",
    "festivals.seasons.winter": "الشتاء",
    "festivals.more": "اعرف المزيد",

    // Explore section
    "explore.title": "استكشف الصحراء",
    "explore.subtitle": "نصائح ومعلومات للسفر في الصحراء الغربية",
    "explore.destinations": "وجهات صحراوية",
    "explore.map": "خريطة تفاعلية للمناطق الصحراوية",
    "explore.tips": "نصائح السفر",
    "explore.preparation": "تحضير رحلتك",
    "explore.cultural": "احترام الثقافة",
    "explore.safety": "السلامة في الصحراء",
    "explore.tip": "معلومات مفيدة",

    // Footer
    "footer.sections": "الأقسام",
    "footer.contact": "اتصل بنا"
  }
};

// Language provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Translation function
  const t = (key: string): string => {
    if (!translations[language][key]) {
      console.warn(`No translation found for key: ${key} in language: ${language}`);
      return key;
    }
    return translations[language][key];
  };

  // Context value
  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
