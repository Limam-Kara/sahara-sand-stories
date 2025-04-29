
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
    // Language selector
    "language.select": "Language",
    
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
    "section.history.subtitle": "Discover the origins and customs of the Sahrawi people",
    "section.lifestyle": "Lifestyle & Cuisine",
    "section.lifestyle.subtitle": "Explore the traditional way of life and culinary arts",
    "section.festivals": "Festivals & Celebrations",
    "section.festivals.subtitle": "Discover the events that animate Sahrawi culture throughout the year",
    "section.art": "Art & Music",
    "section.art.subtitle": "Immerse yourself in Sahrawi artistic expressions",
    "section.explore": "Explore the Sahara",
    "section.explore.subtitle": "Tips and information for traveling in the Sahrawi desert",
    
    // Art section
    "art.expression": "Musical Expression",
    "art.description": "Sahrawi music is deeply connected to oral tradition, transmitting the history, values, and emotions of the desert people. The enchanting melodies and hypnotic rhythms evoke the vast expanses of the Sahara and nomadic life.",
    "art.poetry": "Poetry & Stories",
    "art.poetry.description": "Poetry is at the heart of Sahrawi culture. Poems, called \"talab\" or \"lghna\", are recited during gatherings and celebrations. They address themes such as love, honor, bravery, and the beauty of the desert.",
    "art.instruments": "Traditional Instruments",
    "art.crafts": "Sahrawi Crafts",
    "art.crafts.description": "Sahrawi craftsmanship is characterized by vibrant geometric patterns reflecting the desert environment and conveying important cultural symbols. Each piece tells a story and preserves ancestral techniques.",
    "art.instrument.tidinit": "Tidinit",
    "art.instrument.tidinit.description": "Traditional string instrument similar to a lute, central to Sahrawi musical tradition.",
    "art.instrument.tbal": "Tbal",
    "art.instrument.tbal.description": "Large drum that provides the rhythmic foundation for Sahrawi music.",
    "art.instrument.bendir": "Bendir",
    "art.instrument.bendir.description": "Frame drum with snares that creates a buzzing sound, used in festive music.",

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
    
    // History section
    "history.origins": "Origins",
    "history.traditions": "Traditions",
    "history.nomadic": "Nomadic Heritage",
    "history.read.more": "Read more",
    
    // Lifestyle section
    "lifestyle.daily": "Daily Life",
    "lifestyle.clothing": "Traditional Clothing",
    "lifestyle.cuisine": "Cuisine",
    "lifestyle.tea": "Tea Ceremony",
    "lifestyle.recipe": "View Recipe",

    // Footer
    "footer.sections": "Sections",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved."
  },
  fr: {
    // Language selector
    "language.select": "Langue",
    
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
    "section.history.subtitle": "Découvrez les origines et les coutumes du peuple sahraoui",
    "section.lifestyle": "Mode de Vie & Cuisine",
    "section.lifestyle.subtitle": "Explorez le mode de vie traditionnel et les arts culinaires",
    "section.festivals": "Festivals & Célébrations",
    "section.festivals.subtitle": "Découvrez les événements qui animent la culture sahraouie tout au long de l'année",
    "section.art": "Art & Musique",
    "section.art.subtitle": "Plongez dans les expressions artistiques sahraouies",
    "section.explore": "Explorer le Sahara",
    "section.explore.subtitle": "Conseils et informations pour voyager dans le désert sahraoui",
    
    // Art section
    "art.expression": "Expression Musicale",
    "art.description": "La musique sahraouie est profondément liée à la tradition orale, transmettant l'histoire, les valeurs et les émotions du peuple du désert. Les mélodies envoûtantes et les rythmes hypnotiques évoquent les vastes étendues du Sahara et la vie nomade.",
    "art.poetry": "Poésie & Récits",
    "art.poetry.description": "La poésie est au cœur de la culture sahraouie. Les poèmes, appelés \"talab\" ou \"lghna\", sont récités lors des rassemblements et célébrations. Ils abordent des thèmes comme l'amour, l'honneur, la bravoure et la beauté du désert.",
    "art.instruments": "Instruments Traditionnels",
    "art.crafts": "Artisanat Sahraoui",
    "art.crafts.description": "L'artisanat sahraoui est caractérisé par des motifs géométriques aux couleurs vives, reflétant l'environnement désertique et transmettant des symboles culturels importants. Chaque pièce raconte une histoire et préserve les techniques ancestrales.",
    "art.instrument.tidinit": "Tidinit",
    "art.instrument.tidinit.description": "Instrument à cordes traditionnel semblable à un luth, central dans la tradition musicale sahraouie.",
    "art.instrument.tbal": "Tbal",
    "art.instrument.tbal.description": "Grand tambour qui fournit la base rythmique de la musique sahraouie.",
    "art.instrument.bendir": "Bendir",
    "art.instrument.bendir.description": "Tambour sur cadre avec timbre qui crée un son bourdonnant, utilisé dans la musique festive.",

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
    
    // History section
    "history.origins": "Origines",
    "history.traditions": "Traditions",
    "history.nomadic": "Héritage Nomade",
    "history.read.more": "Lire plus",
    
    // Lifestyle section
    "lifestyle.daily": "Vie Quotidienne",
    "lifestyle.clothing": "Vêtements Traditionnels",
    "lifestyle.cuisine": "Cuisine",
    "lifestyle.tea": "Cérémonie du Thé",
    "lifestyle.recipe": "Voir la Recette",

    // Footer
    "footer.sections": "Sections",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés."
  },
  ar: {
    // Language selector
    "language.select": "اللغة",
    
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
    "section.history.subtitle": "اكتشف أصول وعادات الشعب الصحراوي",
    "section.lifestyle": "نمط الحياة والمطبخ",
    "section.lifestyle.subtitle": "استكشف نمط الحياة التقليدي وفنون الطهي",
    "section.festivals": "المهرجانات والاحتفالات",
    "section.festivals.subtitle": "اكتشف الأحداث التي تنشط الثقافة الصحراوية على مدار العام",
    "section.art": "الفن والموسيقى",
    "section.art.subtitle": "انغمس في التعبيرات الفنية الصحراوية",
    "section.explore": "استكشف الصحراء",
    "section.explore.subtitle": "نصائح ومعلومات للسفر في الصحراء الغربية",
    
    // Art section
    "art.expression": "التعبير الموسيقي",
    "art.description": "ترتبط الموسيقى الصحراوية ارتباطًا وثيقًا بالتقاليد الشفهية، وتنقل تاريخ وقيم ومشاعر أهل الصحراء. تستحضر الألحان الساحرة والإيقاعات المنومة المساحات الشاسعة للصحراء والحياة البدوية.",
    "art.poetry": "الشعر والقصص",
    "art.poetry.description": "الشعر هو في صميم الثقافة الصحراوية. تُلقى القصائد، المسماة \"طلب\" أو \"لغنا\"، خلال التجمعات والاحتفالات. تتناول موضوعات مثل الحب والشرف والشجاعة وجمال الصحراء.",
    "art.instruments": "الآلات التقليدية",
    "art.crafts": "الحرف الصحراوية",
    "art.crafts.description": "تتميز الحرف اليدوية الصحراوية بأنماط هندسية نابضة بالحياة تعكس البيئة الصحراوية وتنقل رموزًا ثقافية مهمة. كل قطعة تروي قصة وتحافظ على التقنيات القديمة.",
    "art.instrument.tidinit": "تيدينيت",
    "art.instrument.tidinit.description": "آلة وترية تقليدية تشبه العود، محورية في التقليد الموسيقي الصحراوي.",
    "art.instrument.tbal": "طبل",
    "art.instrument.tbal.description": "طبل كبير يوفر الأساس الإيقاعي للموسيقى الصحراوية.",
    "art.instrument.bendir": "بندير",
    "art.instrument.bendir.description": "طبل إطار مع أوتار يخلق صوتًا طنانًا، يستخدم في الموسيقى الاحتفالية.",

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
    
    // History section
    "history.origins": "الأصول",
    "history.traditions": "التقاليد",
    "history.nomadic": "التراث البدوي",
    "history.read.more": "اقرأ المزيد",
    
    // Lifestyle section
    "lifestyle.daily": "الحياة اليومية",
    "lifestyle.clothing": "الملابس التقليدية",
    "lifestyle.cuisine": "المطبخ",
    "lifestyle.tea": "مراسم الشاي",
    "lifestyle.recipe": "عرض الوصفة",

    // Footer
    "footer.sections": "الأقسام",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة."
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
