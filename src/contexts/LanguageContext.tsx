
import { createContext, useState, useContext, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    "site.title": "Saharan Heritage",
    "nav.history": "History",
    "nav.art": "Art & Culture",
    "nav.explore": "Explore",
    "nav.lifestyle": "Lifestyle",
    "nav.festivals": "Festivals",
    "nav.contact": "Contact Us",
    "nav.dashboard": "Dashboard",
    "section.history": "Historical Background",
    "section.history.subtitle": "The fascinating past of Sahrawi culture",
    "section.art": "Art & Culture",
    "section.explore": "Explore the Saharan Destinations",
    "section.lifestyle": "Sahrawi Lifestyle",
    "section.festivals": "Festivals & Celebrations",
    "section.festivals.subtitle": "Traditional gatherings and celebrations",
    "history.migrations": "Migrations and Origins",
    "history.migrations.text1": "The Sahrawi people are the indigenous inhabitants of Western Sahara. Their origins trace back to a mixture of Berber, Arab, and African populations that have traversed and settled in the region for thousands of years.",
    "history.migrations.text2": "Historically nomadic, Sahrawis moved across the deserts following seasonal patterns, establishing critical trade routes connecting sub-Saharan Africa with the Mediterranean world.",
    "history.values": "Cultural Values",
    "history.values.text": "Sahrawi society values hospitality, solidarity, and resilience. These core values developed from the harsh desert environment, where survival often depended on cooperation and assistance to fellow travelers.",
    "history.ceremonies": "Traditional Ceremonies",
    "history.marriages": "Marriage Celebrations",
    "history.marriages.text": "Traditional weddings can last up to seven days, with elaborate ceremonies featuring music, poetry, and feasts under large tents.",
    "history.births": "Birth Rituals",
    "history.births.text": "When a child is born, the family organizes a naming ceremony after seven days, accompanied by prayers and community celebration.",
    "history.religious": "Religious Celebrations",
    "history.religious.text": "Islamic holidays are celebrated with special meals, prayers, and visiting family members. Eid al-Fitr and Eid al-Adha hold particular importance.",
    "history.language": "The Hassani Language",
    "history.language.origins": "Origins and Influence",
    "history.language.origins.text1": "Hassaniya is a variety of Maghrebi Arabic spoken by the Sahrawi people. It has evolved over centuries, incorporating elements from Berber languages, standard Arabic, and various African languages.",
    "history.language.origins.text2": "Despite modern influences, the language maintains its distinctive character and serves as a crucial marker of Sahrawi identity.",
    "history.language.transmission": "Oral Tradition",
    "history.language.transmission.text1": "The Hassani dialect has been primarily transmitted through oral tradition, with poetry, stories, and proverbs serving as vehicles for cultural preservation.",
    "history.language.transmission.text2": "Elders play a vital role in preserving linguistic purity and teaching younger generations the subtleties of expression and vocabulary that are unique to Hassaniya.",
    "history.nomadic": "Nomadic Traditions",
    "lifestyle.clothing": "Traditional Clothing",
    "art.crafts": "Craftsmanship",
    "art.culture.title": "Cultural Heritage",
    "art.culture.subtitle": "Discovering the rich intangible heritage of the Sahara",
    "art.proverbs": "Hassani Proverbs",
    "art.proverbs.description": "Proverbs form an essential part of Sahrawi oral tradition, conveying wisdom and cultural values across generations. These concise expressions reflect the worldview and lived experiences of desert communities.",
    "art.poetry.title": "Hassani Poetry",
    "art.poetry.description": "Poetry holds a special place in Sahrawi culture as a medium for preserving history, expressing emotions, and celebrating cultural identity. Oral poetry performances are common during social gatherings and celebrations.",
    "art.poetry.types": "Types of Poetry",
    "art.poetry.themes": "Common Themes",
    "art.myths": "Myths and Tales",
    "art.myths.description": "Folktales and myths have been passed down through generations, often told around evening fires in desert encampments. These narratives explain natural phenomena, teach moral lessons, and entertain while strengthening community bonds.",
    "art.myths.role": "Role in Society",
    "art.games": "Traditional Games",
    "art.games.description": "Traditional games played an important role in Sahrawi society, developing skills necessary for desert life while providing entertainment and strengthening social bonds.",
    "art.beliefs": "Traditional Beliefs",
    "art.beliefs.description": "Sahrawi spiritual beliefs blend Islamic practices with pre-Islamic traditions, creating a unique cultural perspective that guides daily life and special occasions.",
    "art.beliefs.spiritual": "Spiritual Practices",
    "art.beliefs.life": "Life Cycle Rituals"
  },
  fr: {
    "site.title": "Patrimoine Saharien",
    "nav.history": "Histoire",
    "nav.art": "Art & Culture",
    "nav.explore": "Explorer",
    "nav.lifestyle": "Mode de vie",
    "nav.festivals": "Festivals",
    "nav.contact": "Contactez-nous",
    "nav.dashboard": "Tableau de bord",
    "section.history": "Contexte Historique",
    "section.history.subtitle": "Le passé fascinant de la culture sahraouie",
    "section.art": "Art & Culture",
    "section.explore": "Explorez les Destinations Sahariennes",
    "section.lifestyle": "Mode de Vie Sahraoui",
    "section.festivals": "Festivals & Célébrations",
    "section.festivals.subtitle": "Rassemblements et célébrations traditionnels",
    "history.migrations": "Migrations et Origines",
    "history.migrations.text1": "Le peuple sahraoui est la population autochtone du Sahara occidental. Ses origines remontent à un mélange de populations berbères, arabes et africaines qui ont traversé et se sont installées dans la région depuis des milliers d'années.",
    "history.migrations.text2": "Historiquement nomades, les Sahraouis se déplaçaient à travers les déserts selon des schémas saisonniers, établissant des routes commerciales cruciales reliant l'Afrique subsaharienne au monde méditerranéen.",
    "history.values": "Valeurs Culturelles",
    "history.values.text": "La société sahraouie valorise l'hospitalité, la solidarité et la résilience. Ces valeurs fondamentales se sont développées dans l'environnement désertique hostile, où la survie dépendait souvent de la coopération et de l'assistance aux voyageurs.",
    "history.ceremonies": "Cérémonies Traditionnelles",
    "history.marriages": "Célébrations de Mariage",
    "history.marriages.text": "Les mariages traditionnels peuvent durer jusqu'à sept jours, avec des cérémonies élaborées comprenant musique, poésie et festins sous de grandes tentes.",
    "history.births": "Rituels de Naissance",
    "history.births.text": "À la naissance d'un enfant, la famille organise une cérémonie de nomination après sept jours, accompagnée de prières et de célébrations communautaires.",
    "history.religious": "Célébrations Religieuses",
    "history.religious.text": "Les fêtes islamiques sont célébrées avec des repas spéciaux, des prières et des visites aux membres de la famille. L'Aïd al-Fitr et l'Aïd al-Adha ont une importance particulière.",
    "history.language": "Le Dialecte Hassani",
    "history.language.origins": "Origines et Influence",
    "history.language.origins.text1": "Le hassaniya est une variété d'arabe maghrébin parlée par le peuple sahraoui. Il a évolué au cours des siècles, incorporant des éléments des langues berbères, de l'arabe standard et de diverses langues africaines.",
    "history.language.origins.text2": "Malgré les influences modernes, la langue conserve son caractère distinctif et constitue un marqueur crucial de l'identité sahraouie.",
    "history.language.transmission": "Tradition Orale",
    "history.language.transmission.text1": "Le dialecte hassani a été principalement transmis par tradition orale, la poésie, les histoires et les proverbes servant de véhicules pour la préservation culturelle.",
    "history.language.transmission.text2": "Les anciens jouent un rôle vital dans la préservation de la pureté linguistique et l'enseignement aux jeunes générations des subtilités d'expression et du vocabulaire propres au hassaniya.",
    "history.nomadic": "Traditions Nomades",
    "lifestyle.clothing": "Vêtements Traditionnels",
    "art.crafts": "Artisanat",
    "art.culture.title": "Patrimoine Culturel",
    "art.culture.subtitle": "À la découverte du riche patrimoine immatériel du Sahara",
    "art.proverbs": "Proverbes Hassanis",
    "art.proverbs.description": "Les proverbes constituent une part essentielle de la tradition orale sahraouie, transmettant sagesse et valeurs culturelles à travers les générations. Ces expressions concises reflètent la vision du monde et les expériences vécues des communautés désertiques.",
    "art.poetry.title": "Poésie Hassanie",
    "art.poetry.description": "La poésie occupe une place spéciale dans la culture sahraouie en tant que moyen de préserver l'histoire, d'exprimer des émotions et de célébrer l'identité culturelle. Les performances de poésie orale sont courantes lors de rassemblements sociaux et de célébrations.",
    "art.poetry.types": "Types de Poésie",
    "art.poetry.themes": "Thèmes Communs",
    "art.myths": "Mythes et Contes",
    "art.myths.description": "Les contes populaires et les mythes ont été transmis de génération en génération, souvent racontés autour de feux du soir dans les campements du désert. Ces récits expliquent les phénomènes naturels, enseignent des leçons morales et divertissent tout en renforçant les liens communautaires.",
    "art.myths.role": "Rôle dans la Société",
    "art.games": "Jeux Traditionnels",
    "art.games.description": "Les jeux traditionnels jouaient un rôle important dans la société sahraouie, développant des compétences nécessaires à la vie désertique tout en fournissant divertissement et renforcement des liens sociaux.",
    "art.beliefs": "Croyances Traditionnelles",
    "art.beliefs.description": "Les croyances spirituelles sahraouies mélangent les pratiques islamiques avec des traditions préislamiques, créant une perspective culturelle unique qui guide la vie quotidienne et les occasions spéciales.",
    "art.beliefs.spiritual": "Pratiques Spirituelles",
    "art.beliefs.life": "Rituels du Cycle de Vie"
  },
  ar: {
    "site.title": "التراث الصحراوي",
    "nav.history": "التاريخ",
    "nav.art": "الفن والثقافة",
    "nav.explore": "استكشف",
    "nav.lifestyle": "نمط الحياة",
    "nav.festivals": "المهرجانات",
    "nav.contact": "اتصل بنا",
    "nav.dashboard": "لوحة التحكم",
    "section.history": "الخلفية التاريخية",
    "section.history.subtitle": "الماضي المثير للاهتمام للثقافة الصحراوية",
    "section.art": "الفن والثقافة",
    "section.explore": "استكشف الوجهات الصحراوية",
    "section.lifestyle": "نمط الحياة الصحراوي",
    "section.festivals": "المهرجانات والاحتفالات",
    "section.festivals.subtitle": "التجمعات والاحتفالات التقليدية",
    "history.migrations": "الهجرات والأصول",
    "history.migrations.text1": "الشعب الصحراوي هو السكان الأصليون للصحراء الغربية. تعود أصولهم إلى مزيج من السكان البربر والعرب والأفارقة الذين عبروا واستقروا في المنطقة منذ آلاف السنين.",
    "history.migrations.text2": "تاريخياً، كان الصحراويون رحّل، يتنقلون عبر الصحاري متبعين الأنماط الموسمية، مؤسسين طرق تجارة حيوية تربط أفريقيا جنوب الصحراء بالعالم المتوسطي.",
    "history.values": "القيم الثقافية",
    "history.values.text": "يقدر المجتمع الصحراوي الضيافة والتضامن والمرونة. تطورت هذه القيم الأساسية من بيئة الصحراء القاسية، حيث كان البقاء يعتمد غالبًا على التعاون والمساعدة للمسافرين.",
    "history.ceremonies": "المراسم التقليدية",
    "history.marriages": "احتفالات الزواج",
    "history.marriages.text": "يمكن أن تستمر حفلات الزفاف التقليدية حتى سبعة أيام، مع مراسم مفصلة تضم الموسيقى والشعر والولائم تحت خيام كبيرة.",
    "history.births": "طقوس الولادة",
    "history.births.text": "عند ولادة طفل، تنظم العائلة حفل تسمية بعد سبعة أيام، مصحوبًا بالصلوات والاحتفال المجتمعي.",
    "history.religious": "الاحتفالات الدينية",
    "history.religious.text": "يتم الاحتفال بالأعياد الإسلامية بوجبات خاصة وصلوات وزيارة أفراد العائلة. يكتسب عيد الفطر وعيد الأضحى أهمية خاصة.",
    "history.language": "اللغة الحسانية",
    "history.language.origins": "الأصول والتأثير",
    "history.language.origins.text1": "الحسانية هي نوع من العربية المغربية يتحدثها الشعب الصحراوي. تطورت على مدى قرون، مدمجة عناصر من اللغات البربرية والعربية الفصحى ومختلف اللغات الأفريقية.",
    "history.language.origins.text2": "رغم التأثيرات الحديثة، تحافظ اللغة على طابعها المميز وتعد علامة حاسمة على الهوية الصحراوية.",
    "history.language.transmission": "التقاليد الشفوية",
    "history.language.transmission.text1": "انتقلت اللهجة الحسانية بشكل أساسي من خلال التقاليد الشفوية، حيث كانت الشعر والقصص والأمثال بمثابة وسائل للحفاظ على الثقافة.",
    "history.language.transmission.text2": "يلعب الشيوخ دورًا حيويًا في الحفاظ على نقاء اللغة وتعليم الأجيال الشابة دقائق التعبير والمفردات الخاصة بالحسانية.",
    "history.nomadic": "التقاليد البدوية",
    "lifestyle.clothing": "الملابس التقليدية",
    "art.crafts": "الحرف اليدوية",
    "art.culture.title": "التراث الثقافي",
    "art.culture.subtitle": "اكتشاف التراث الثقافي غير المادي الغني للصحراء",
    "art.proverbs": "الأمثال الحسانية",
    "art.proverbs.description": "تشكل الأمثال جزءًا أساسيًا من التقاليد الشفوية الصحراوية، تنقل الحكمة والقيم الثقافية عبر الأجيال. تعكس هذه التعبيرات الموجزة نظرة العالم والتجارب المعيشية لمجتمعات الصحراء.",
    "art.poetry.title": "الشعر الحساني",
    "art.poetry.description": "يحتل الشعر مكانة خاصة في الثقافة الصحراوية كوسيلة للحفاظ على التاريخ والتعبير عن المشاعر والاحتفال بالهوية الثقافية. عروض الشعر الشفهي شائعة خلال التجمعات الاجتماعية والاحتفالات.",
    "art.poetry.types": "أنواع الشعر",
    "art.poetry.themes": "المواضيع الشائعة",
    "art.myths": "الأساطير والحكايات",
    "art.myths.description": "تم تناقل الحكايات الشعبية والأساطير عبر الأجيال، وغالباً ما يتم سردها حول نيران المساء في معسكرات الصحراء. تشرح هذه الروايات الظواهر الطبيعية، وتعلم الدروس الأخلاقية، وتسلي مع تعزيز الروابط المجتمعية.",
    "art.myths.role": "الدور في المجتمع",
    "art.games": "الألعاب التقليدية",
    "art.games.description": "لعبت الألعاب التقليدية دوراً مهماً في المجتمع الصحراوي، مطورة المهارات اللازمة للحياة الصحراوية مع توفير الترفيه وتعزيز الروابط الاجتماعية.",
    "art.beliefs": "المعتقدات التقليدية",
    "art.beliefs.description": "تمزج المعتقدات الروحية الصحراوية بين الممارسات الإسلامية والتقاليد ما قبل الإسلام، مما يخلق منظوراً ثقافياً فريداً يوجه الحياة اليومية والمناسبات الخاصة.",
    "art.beliefs.spiritual": "الممارسات الروحية",
    "art.beliefs.life": "طقوس دورة الحياة"
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("fr");

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
