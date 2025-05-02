
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
    
    // Art Cultural Heritage section
    "art.culture.title": "Intangible Cultural Heritage",
    "art.culture.subtitle": "Explore the intangible cultural elements that define Hassani identity",
    "art.proverbs": "Hassani Proverbs",
    "art.proverbs.description": "Hassani proverbs reflect the folk wisdom and collective experience of the Sahrawi people. They are used in everyday conversation to illustrate ideas, give advice, or teach values.",
    "art.poetry.title": "Hassani Poetry",
    "art.poetry.types": "Types of poetry",
    "art.poetry.themes": "Main themes",
    "art.myths": "Myths and Tales",
    "art.myths.description": "Hassani myths and tales are oral narratives passed down from generation to generation. They serve to explain natural phenomena, convey moral lessons, and entertain.",
    "art.myths.role": "Role of tales in Hassani society",
    "art.games": "Popular Games",
    "art.games.description": "Traditional Hassani games are more than just entertainment; they promote social cohesion, develop skills, and transmit cultural values to younger generations.",
    "art.beliefs": "Beliefs",
    "art.beliefs.description": "Hassani beliefs are a unique blend of Islamic traditions and pre-Islamic cultural practices. They influence all aspects of daily life, from birth rituals to funeral ceremonies.",
    "art.beliefs.spiritual": "Spiritual practices",
    "art.beliefs.life": "Life moments",

    // Lifestyle section
    "lifestyle.title": "Lifestyle & Cuisine",
    "lifestyle.subtitle": "Discover the traditional clothes, desert gastronomy, and daily customs",
    "lifestyle.clothing": "Traditional Clothing",
    "lifestyle.mlahfa": "Mlahfa",
    "lifestyle.mlahfa.description": "Traditional garment of Sahrawi women, the Mlahfa is a colorful 4-meter piece of fabric wrapped around the body.",
    "lifestyle.daraa": "Daraa",
    "lifestyle.daraa.description": "The Daraa is the traditional men's attire, a long loose-fitting robe often in indigo blue with embroidery.",
    "lifestyle.housing": "Nomadic Housing",
    "lifestyle.housing.description": "The traditional tent, called \"khaïma\", is at the heart of Sahrawi nomadic life. Made of goat hair or camel wool, it protects from the extreme desert conditions while being easily transportable.",
    "lifestyle.cuisine": "Sahrawi Cuisine",
    "lifestyle.cuisine.description": "Sahrawi cuisine is adapted to the nomadic lifestyle, combining simple ingredients to create nourishing dishes. Couscous, meat stews, and dates are essential elements. Mint tea, served in three glasses, represents hospitality and is shared at every meeting.",
    "lifestyle.tea": "Sahrawi Tea Preparation",
    "lifestyle.tea.step1": "Boil the water",
    "lifestyle.tea.step1.description": "Bring water to a boil in a traditional teapot.",
    "lifestyle.tea.step2": "First infusion",
    "lifestyle.tea.step2.description": "Add the green tea and let it steep for 2-3 minutes. This first infusion is poured and then poured back into the teapot several times to mix.",
    "lifestyle.tea.step3": "Sugar and mint",
    "lifestyle.tea.step3.description": "Add generous amounts of sugar and fresh mint leaves.",
    "lifestyle.tea.step4": "Service",
    "lifestyle.tea.step4.description": "Pour the tea from a height to create a characteristic foam. Serve three successive glasses, increasingly sweet.",
    "lifestyle.tea.proverb": "The first glass is bitter like life, the second is sweet like love, and the third is smooth like death.",
    "lifestyle.tea.proverb.attribution": "Sahrawi proverb on the three glasses of tea",

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
    "history.language": "Arabic Language & Hassani Dialect",
    "history.language.origins": "Origins and Influence",
    "history.language.transmission": "Transmission and Preservation",
    "history.ceremonies": "Ceremonies & Rituals",
    "history.marriages": "Marriages",
    "history.births": "Births",
    "history.religious": "Religious celebrations",
    "history.migrations": "Origins & Migrations",
    "history.values": "Values & Traditions",
    
    // Footer
    "footer.sections": "Sections",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.brand": "Explore the richness of Sahrawi culture through our pages dedicated to the traditions, art, and history of this fascinating people."
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
    
    // Art Cultural Heritage section
    "art.culture.title": "Patrimoine Culturel Immatériel",
    "art.culture.subtitle": "Explorez les éléments culturels non matériels qui définissent l'identité hassanie",
    "art.proverbs": "Proverbes Hassanis",
    "art.proverbs.description": "Les proverbes hassanis reflètent la sagesse populaire et l'expérience collective du peuple sahraoui. Ils sont utilisés dans la conversation quotidienne pour illustrer des idées, donner des conseils ou enseigner des valeurs.",
    "art.poetry.title": "Poésie Hassanie",
    "art.poetry.types": "Types de poésie",
    "art.poetry.themes": "Thèmes principaux",
    "art.myths": "Mythes et Contes",
    "art.myths.description": "Les mythes et contes hassanis sont des récits oraux transmis de génération en génération. Ils servent à expliquer les phénomènes naturels, transmettre des leçons morales et divertir.",
    "art.myths.role": "Rôle des contes dans la société hassanie",
    "art.games": "Jeux Populaires",
    "art.games.description": "Les jeux traditionnels hassanis sont plus que de simples divertissements ; ils favorisent la cohésion sociale, développent des compétences et transmettent des valeurs culturelles aux jeunes générations.",
    "art.beliefs": "Croyances",
    "art.beliefs.description": "Les croyances hassanies sont un mélange unique de traditions islamiques et de pratiques culturelles préislamiques. Elles influencent tous les aspects de la vie quotidienne, des rituels de naissance aux cérémonies funéraires.",
    "art.beliefs.spiritual": "Pratiques spirituelles",
    "art.beliefs.life": "Moments de vie",

    // Lifestyle section
    "lifestyle.title": "Mode de Vie & Cuisine",
    "lifestyle.subtitle": "Découvrez les vêtements traditionnels, la gastronomie du désert et les coutumes quotidiennes",
    "lifestyle.clothing": "Vêtements Traditionnels",
    "lifestyle.mlahfa": "Mlahfa",
    "lifestyle.mlahfa.description": "Vêtement traditionnel des femmes sahraouies, la Mlahfa est une pièce de tissu colorée de 4 mètres enroulée autour du corps.",
    "lifestyle.daraa": "Daraa",
    "lifestyle.daraa.description": "La Daraa est la tenue traditionnelle des hommes, une longue robe ample souvent de couleur bleue indigo avec des broderies.",
    "lifestyle.housing": "Habitat Nomade",
    "lifestyle.housing.description": "La tente traditionnelle, appelée \"khaïma\", est au cœur de la vie nomade sahraouie. Fabriquée en poils de chèvre ou en laine de chameau, elle protège des conditions extrêmes du désert tout en étant facilement transportable.",
    "lifestyle.cuisine": "Cuisine Sahraouie",
    "lifestyle.cuisine.description": "La cuisine sahraouie est adaptée au mode de vie nomade, combinant des ingrédients simples pour créer des plats nourrissants. Le couscous, les ragoûts de viande et les dattes sont des éléments essentiels. Le thé à la menthe, servi en trois verres, représente l'hospitalité et est partagé lors de chaque rencontre.",
    "lifestyle.tea": "La Préparation du Thé Sahraoui",
    "lifestyle.tea.step1": "Faire bouillir l'eau",
    "lifestyle.tea.step1.description": "Portez de l'eau à ébullition dans une théière traditionnelle.",
    "lifestyle.tea.step2": "Première infusion",
    "lifestyle.tea.step2.description": "Ajoutez le thé vert et laissez infuser 2-3 minutes. Cette première infusion est versée puis reversée plusieurs fois dans la théière pour mélanger.",
    "lifestyle.tea.step3": "Sucre et menthe",
    "lifestyle.tea.step3.description": "Ajoutez généreusement du sucre et des feuilles de menthe fraîche.",
    "lifestyle.tea.step4": "Service",
    "lifestyle.tea.step4.description": "Versez le thé de haut pour créer une mousse caractéristique. Servez trois verres successifs, de plus en plus sucrés.",
    "lifestyle.tea.proverb": "Le premier verre est amer comme la vie, le second est doux comme l'amour, et le troisième est suave comme la mort.",
    "lifestyle.tea.proverb.attribution": "Proverbe sahraoui sur les trois verres de thé",

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
    "history.language": "Langue Arabe & Dialecte Hassani",
    "history.language.origins": "Origines et Influence",
    "history.language.transmission": "Transmission et Préservation",
    "history.ceremonies": "Cérémonies & Rituels",
    "history.marriages": "Mariages",
    "history.births": "Naissances",
    "history.religious": "Fêtes religieuses",
    "history.migrations": "Origines & Migrations",
    "history.values": "Valeurs & Traditions",
    
    // Footer
    "footer.sections": "Sections",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
    "footer.brand": "Explorez la richesse de la culture sahraouie à travers nos pages dédiées aux traditions, à l'art et à l'histoire de ce peuple fascinant."
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
    
    // Art Cultural Heritage section
    "art.culture.title": "التراث الثقافي غير المادي",
    "art.culture.subtitle": "استكشف العناصر الثقافية غير المادية التي تحدد الهوية الحسانية",
    "art.proverbs": "الأمثال الحسانية",
    "art.proverbs.description": "تعكس الأمثال الحسانية الحكمة الشعبية والخبرة الجماعية للشعب الصحراوي. تستخدم في المحادثات اليومية لتوضيح الأفكار وتقديم النصائح أو تعليم القيم.",
    "art.poetry.title": "الشعر الحساني",
    "art.poetry.types": "أنواع الشعر",
    "art.poetry.themes": "المواضيع الرئيسية",
    "art.myths": "الأساطير والحكايات",
    "art.myths.description": "الأساطير والحكايات الحسانية هي روايات شفهية متوارثة عبر الأجيال. تهدف إلى شرح الظواهر الطبيعية ونقل الدروس الأخلاقية والترفيه.",
    "art.myths.role": "دور الحكايات في المجتمع الحساني",
    "art.games": "الألعاب الشعبية",
    "art.games.description": "الألعاب الحسانية التقليدية هي أكثر من مجرد تسلية؛ فهي تعزز التماسك الاجتماعي وتنمي المهارات وتنقل القيم الثقافية للأجيال الشابة.",
    "art.beliefs": "المعتقدات",
    "art.beliefs.description": "المعتقدات الحسانية هي مزيج فريد من التقاليد الإسلامية والممارسات الثقافية ما قبل الإسلام. تؤثر على جميع جوانب الحياة اليومية، من طقوس الولادة إلى مراسم الجنازة.",
    "art.beliefs.spiritual": "الممارسات الروحية",
    "art.beliefs.life": "لحظات الحياة",

    // Lifestyle section
    "lifestyle.title": "نمط الحياة والمطبخ",
    "lifestyle.subtitle": "اكتشف الملابس التقليدية ومطبخ الصحراء والعادات اليومية",
    "lifestyle.clothing": "الملابس التقليدية",
    "lifestyle.mlahfa": "ملحفة",
    "lifestyle.mlahfa.description": "الملبس التقليدي للنساء الصحراويات، الملحفة هي قطعة قماش ملونة بطول 4 أمتار تلف حول الجسم.",
    "lifestyle.daraa": "دراعة",
    "lifestyle.daraa.description": "الدراعة هي الزي التقليدي للرجال، وهي عبارة عن ثوب طويل فضفاض غالبًا ما يكون باللون الأزرق النيلي مع تطريز.",
    "lifestyle.housing": "السكن البدوي",
    "lifestyle.housing.description": "الخيمة التقليدية، المسماة \"خيمة\"، هي في قلب الحياة البدوية الصحراوية. مصنوعة من شعر الماعز أو صوف الجمال، تحمي من الظروف الصحراوية القاسية مع إمكانية نقلها بسهولة.",
    "lifestyle.cuisine": "المطبخ الصحراوي",
    "lifestyle.cuisine.description": "المطبخ الصحراوي مكيف مع نمط الحياة البدوي، يجمع بين مكونات بسيطة لإنشاء أطباق مغذية. الكسكس وطواجن اللحم والتمر هي عناصر أساسية. الشاي بالنعناع، الذي يقدم في ثلاثة أكواب، يمثل الضيافة ويشارك في كل لقاء.",
    "lifestyle.tea": "تحضير الشاي الصحراوي",
    "lifestyle.tea.step1": "غلي الماء",
    "lifestyle.tea.step1.description": "يتم غلي الماء في إبريق الشاي التقليدي.",
    "lifestyle.tea.step2": "النقعة الأولى",
    "lifestyle.tea.step2.description": "أضف الشاي الأخضر واتركه ينقع لمدة 2-3 دقائق. يتم صب هذه النقعة الأولى ثم إعادة صبها في الإبريق عدة مرات للخلط.",
    "lifestyle.tea.step3": "السكر والنعناع",
    "lifestyle.tea.step3.description": "أضف كميات وافرة من السكر وأوراق النعناع الطازجة.",
    "lifestyle.tea.step4": "التقديم",
    "lifestyle.tea.step4.description": "صب الشاي من ارتفاع لتكوين رغوة مميزة. قدم ثلاثة أكواب متتالية، تزداد حلاوة.",
    "lifestyle.tea.proverb": "الكأس الأول مر مثل الحياة، والثاني حلو مثل الحب، والثالث ناعم مثل الموت.",
    "lifestyle.tea.proverb.attribution": "مثل صحراوي عن أكواب الشاي الثلاثة",

    // Festivals section
    "festivals.title": "المهرجانات والاحتفالات",
    "festivals.subtitle": "اكتشف الأحداث التي تنشط الثقافة الصحراوية على مدار العام",
    "festivals.calendar": "تقويم المهرجانات",
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
    "history.language": "اللغة العربية واللهجة الحسانية",
    "history.language.origins": "الأصول والتأثير",
    "history.language.transmission": "النقل والحفاظ",
    "history.ceremonies": "الاحتفالات والطقوس",
    "history.marriages": "الزواجات",
    "history.births": "المواليد",
    "history.religious": "الاحتفالات الدينية",
    "history.migrations": "الأصول والهجرات",
    "history.values": "القيم والتقاليد",
    
    // Footer
    "footer.sections": "الأقسام",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.brand": "اكتشف ثراء الثقافة الصحراوية من خلال صفحاتنا المخصصة للتقاليد والفن وتاريخ هذا الشعب الرائع."
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
