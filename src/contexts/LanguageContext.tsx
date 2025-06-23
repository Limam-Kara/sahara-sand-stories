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
  setLanguage: () => { },
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
    "nav.festivals": "Activities",
    "nav.art": "Art & Music",
    "nav.explore": "Explore",

    // Hero
    "hero.title": "Hassani Culture",
    "hero.subtitle": "Discover the ancestral heritage of the desert people, a culture rich in traditions, hospitality, and deep connections with nature.",
    "hero.button": "Discover",
    "hero.scroll": "Scroll",

    // Section titles
    "section.history": "History & Traditions",
    "section.history.subtitle": "Discover the origins and customs of the Sahrawi people",
    "section.lifestyle": "Material heritage",
    "section.lifestyle.subtitle": "Features of Authenticity: Traditional Lifestyle from Cuisine to Clothing",
    "section.festivals": "The presence of Hassani culture in school life",
    "section.festivals.subtitle": "Learn about the role of school activities and events in highlighting Hassani culture and instilling it in the educational environment.",
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
    "art.myths.description":"Hassani myths and tales are oral narratives passed down through generations. Nighttime remains the ideal moment for storytelling - either to entertain children until they fall asleep or for adults to gather around tales. Hassani storytelling requires narrative skill, embodiment, vocal characterization, and precision in conveying meaning. The storyteller is typically an elder (shaybani) or an old woman (kahla), chosen for their narrative ability and mastery of story texts, all delivered in the Hassani dialect.",
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
    "lifestyle.cuisine.description": "Sahrawi cuisine is adapted to the nomadic lifestyle, combining simple ingredients to create nourishing dishes. Couscous, meat rice, and dates are essential elements. Mint tea, served in three glasses, represents hospitality and is shared at every meeting.",
    "lifestyle.cuisine.description2": "Bulman or Lebsis: It is a meal made from barley flour. Some flour is placed in a bowl, then hot water, sugar, olive oil or butter, and sometimes sheep and honey are poured over it. The difference between Bulman and Lebsis is that a lot of water is poured over the first until it becomes a dough.",
    "lifestyle.tea": "Sahrawi Tea",
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
    "lifestyle.tea.title1": "Saharan Tea Rituals: Atay",
    "lifestyle.tea.p1":
      "The Sahrawi community, including the Beni Hassan tribes in the southern regions, is known for unique customs reflecting its cultural identity. Among these is the tradition of preparing tea, or 'Atay'. For Sahrawis, tea symbolizes hospitality and is served through special rituals, serving as an occasion to strengthen family bonds, share news, and discuss life matters."
    ,
    "lifestyle.tea.title2": "Benefits and Types of Saharan Tea",
    "lifestyle.tea.p2":
      "Tea aids digestion, making it a staple after heavy meals. Beyond a traditional drink, it represents generosity and warm hospitality. High-quality tea is called 'Hada Atay Yeklaa Douakh' (headache-relieving tea), especially 'Atay Adhamis' (afternoon tea). Two types exist: 'Ashaara' (long leaves, light red) and 'Mkarkab' (darker in color)."
    ,// Festivals section
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
    "history.language": "Linguistic identity between Arabic and Hassaniya.",
    "history.language.origins": "Origins and Influence",
    "history.language.origins.text1": "The Hassani dialect, spoken by the Sahrawis, is a variant of Arabic that developed in the Saharan regions through contact with Berber and African languages. It takes its name from the Beni Hassan tribe that settled in the region in the 13th century.",
    "history.language.origins.text2": "Although fundamentally Arabic in structure, Hassani is distinguished by specific vocabulary related to the desert environment, nomadic herding, and local traditions. Its pronunciation is also characteristic, with softer sounds than classical Arabic.",
    "history.language.transmission": "Transmission and Preservation",
    "history.language.transmission.text1": "Traditionally transmitted orally through poetry, tales, and songs, Hassani is an essential vector of Sahrawi culture. Hassani poems (tidinit) occupy an important place in gatherings and celebrations.",
    "history.language.transmission.text2": "Today, while modern standard Arabic is used in formal education and media, the Hassani dialect remains the language of everyday life and authentic cultural expression. Efforts are being made to document and preserve this unique linguistic heritage, a witness to the nomadic history of the Sahrawi people.",
    "history.ceremonies": "Ceremonies & Rituals",
    "history.marriages": "Marriages",
    "history.marriages.text": "Wedding ceremonies last several days and involve many traditions, including music, dance, and elaborate feasts.",
    "history.births": "Births",
    "history.births.text": "The birth of a child is celebrated by the entire community, with specific rituals to protect the newborn from desert spirits.",
    "history.religious": "Religious celebrations",
    "history.religious.text": "Eid al-Fitr and Eid al-Adha are important times of the year, celebrated with collective prayers and shared meals.",
    "history.migrations": "History of Hassani heritage",
    "history.migrations.text1": "The Sahrawis are a people of nomadic origin inhabiting the desert regions of Western Sahara. Their history is marked by seasonal migrations, following the rains and pastures for their herds.",
    "history.migrations.text2": "Sahrawi culture has developed over the centuries through exchanges with various civilizations of the Maghreb and sub-Saharan Africa. Their oral traditions, poetry, and music bear witness to this rich history.",
    "history.values": "Values & Traditions",
    "history.values.text": "Hospitality is a fundamental value of Sahrawi culture. Strangers are always welcomed with generosity, even in the difficult conditions of the desert. Respect for elders and tribal solidarity are also pillars of this society.",

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
    "nav.festivals": "Activités",
    "nav.art": "Art & Musique",
    "nav.explore": "Explorer",

    // Hero
    "hero.title": "Culture Hassani",
    "hero.subtitle": "Découvrez l'héritage ancestral du peuple du désert, une culture riche en traditions, hospitalité et liens profonds avec la nature.",
    "hero.button": "Découvrir",
    "hero.scroll": "Défiler",

    // Section titles
    "section.history": "Histoire & Traditions",
    "section.history.subtitle": "Découvrez les origines et les coutumes du peuple sahraoui",
    "section.lifestyle": "Patrimoine matériel.",
    "section.lifestyle.subtitle": "Traits d'authenticité : Mode de vie traditionnel, de la cuisine à l'habillement",
    "section.festivals": "La présence de la culture hassani dans la vie scolaire",
    "section.festivals.subtitle": "Découvrez le rôle des activités et événements scolaires dans la mise en valeur de la culture hassani et son intégration dans l’environnement éducatif.",
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
    "art.crafts.description": "L'artisanat sahraoui est caractérisé par des motifs géométriques aux couleurs vives, reflétant l'environnement désertique et transmettant des symboles culturels importants. Chaque piece raconte une histoire et préserve les techniques ancestrales.",
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
    "art.myths.description": "Les mythes et contes hassanis sont des récits oraux transmis à travers les générations. La nuit reste le moment idéal pour le conte - soit pour divertir les enfants jusqu'à ce qu'ils s'endorment, soit pour que les adultes se rassemblent autour des histoires. L'art du conte hassani exige une habileté narrative, une incarnation, une caractérisation vocale et une précision dans la transmission du sens. Le conteur est généralement un ancien (shaybani) ou une vieille femme (kahla), choisis pour leur capacité narrative et leur maîtrise des textes des histoires, le tout délivré dans le dialecte hassani.",
    "art.myths.role": "Rôle des contes dans la société hassanie",
    "art.games": "Jeux Populaires",
    "art.games.description": "Les jeux traditionnels hassanis sont plus que de simples divertissements ; ils favorisent la cohésion sociale, développent des compétences et transmettent des valeurs culturelles aux jeunes générations.",
    "art.beliefs": "Croyances",
    "art.beliefs.description": "Les croyances hassanies sont un mélange unique de traditions islamiques et de pratiques culturelles préislamiques. Elles influencent tous les aspects de la vie quotidienne, des rituels de naissance aux cérémonies funéraires.",
    "art.beliefs.spiritual": "Pratiques spirituelles",
    "art.beliefs.life": "Moments de vie",

    // Lifestyle section
    "lifestyle.title": "Patrimoine matériel.",
    "lifestyle.subtitle": "Découvrez les vêtements traditionnels, la gastronomie du désert et les coutumes quotidiennes",
    "lifestyle.clothing": "Vêtements Traditionnels",
    "lifestyle.mlahfa": "Mlahfa",
    "lifestyle.mlahfa.description": "Vêtement traditionnel des femmes sahraouies, la Mlahfa est une pièce de tissu colorée de 4 mètres enroulée autour du corps.",
    "lifestyle.daraa": "Daraa",
    "lifestyle.daraa.description": "La Daraa est la tenue traditionnelle des hommes, une longue robe ample souvent de couleur bleue indigo avec des broderies.",
    "lifestyle.housing": "Habitat Nomade",
    "lifestyle.housing.description": "La tente traditionnelle, appelée \"khaïma\", est au cœur de la vie nomade sahraouie. Fabriquée en poils de chèvre ou en laine de chameau, elle protège des conditions extrêmes du désert tout en étant facilement transportable.",
    "lifestyle.cuisine": "Cuisine Sahraouie",
    "lifestyle.cuisine.description": "La cuisine sahraouie est adaptée au mode de vie nomade, combinant des ingrédients simples pour créer des plats nourrissants. Le couscous, riz de viande et les dattes sont des éléments essentiels. Le thé à la menthe, servi en trois verres, représente l'hospitalité et est partagé lors de chaque rencontre.",
    "lifestyle.cuisine.description2": "Bulman ou Lebsis : C'est un repas à base de farine d'orge. On met de la farine dans un bol, puis on verse dessus de l'eau chaude, du sucre, de l'huile d'olive ou du beurre, et parfois du mouton et du miel. La différence entre Bulman et Lebsis est que beaucoup d'eau est versée sur le premier jusqu'à ce qu'il devienne une pâte.",
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
    "lifestyle.tea.title1": "Le rituel du thé saharien : l'Atay",
    "lifestyle.tea.p1":
      "La communauté sahraouie, y compris les tribus Beni Hassan dans les régions du sud, se distingue par des coutumes uniques reflétant son identité culturelle. Parmi elles, la préparation du thé, appelé 'Atay'. Pour les Sahraouis, le thé symbolise l'hospitalité et est servi selon des rituels précis, servant d'occasion pour renforcer les liens familiaux, échanger des nouvelles et discuter des affaires de la vie."
    ,
    "lifestyle.tea.title2": "Bienfaits et variétés du thé saharien",
    "lifestyle.tea.p2":
      "Le thé facilite la digestion, d'où sa consommation après les repas copieux. Plus qu'une simple boisson, il incarne la générosité et l'accueil chaleureux. Un thé exceptionnel est appelé 'Hada Atay Yeklaa Douakh' (ce thé soulage les maux de tête), notamment l''Atay Adhamis' préparé l'après-midi. Deux types de thé existent : 'Ashaara' (feuilles longues, couleur rouge claire) et 'Mkarkab' (plus foncé)."
    ,// Festivals section
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
    "history.language": "Identité linguistique entre l'arabe et le hassanya.",
    "history.language.origins": "Origines et Influence",
    "history.language.origins.text1": "Le dialecte hassani, parlé par les Sahraouis, est une variante de l'arabe qui s'est développée dans les régions sahariennes au contact des langues berbères et africaines. Il tire son nom de la tribu des Beni Hassan qui s'est installée dans la région au XIIIe siècle.",
    "history.language.origins.text2": "Bien que fondamentalement arabe dans sa structure, le hassani se distingue par un vocabulaire spécifique lié à l'environnement désertique, à l'élevage nomade et aux traditions locales. Sa prononciation est également caractéristique, avec des sonorités plus douces que l'arabe classique.",
    "history.language.transmission": "Transmission et Préservation",
    "history.language.transmission.text1": "Traditionnellement transmis oralement à travers la poésie, les contes et les chants, le hassani est un vecteur essentiel de la culture sahraouie. Les poèmes hassanis (tidinit) occupent une place importante dans les rassemblements et célébrations.",
    "history.language.transmission.text2": "Aujourd'hui, alors que l'arabe standard moderne est utilisé dans l'éducation formelle et les médias, le dialecte hassani demeure la langue du quotidien et de l'expression culturelle authentique. Des efforts sont déployés pour documenter et préserver ce patrimoine linguistique unique, témoin de l'histoire nomade du peuple sahraoui.",
    "history.ceremonies": "Cérémonies & Rituels",
    "history.marriages": "Mariages",
    "history.marriages.text": "Les cérémonies de mariage durent plusieurs jours et impliquent de nombreuses traditions, dont la musique, la danse et des festins élaborés.",
    "history.births": "Naissances",
    "history.births.text": "La naissance d'un enfant est célébrée par toute la communauté, avec des rituels spécifiques pour protéger le nouveau-né des esprits du désert.",
    "history.religious": "Fêtes religieuses",
    "history.religious.text": "L'Aïd el-Fitr et l'Aïd al-Adha sont des moments importants de l'année, célébrés avec des prières collectives et des repas partagés.",
    "history.migrations": "Histoire du Patrimoine Hassani",
    "history.migrations.text1": "Les Sahraouis sont un peuple d'origine nomade habitant les régions désertiques du Sahara occidental. Leur histoire est marquée par des migrations saisonnières, suivant les pluies et les pâturages pour leurs troupeaux.",
    "history.migrations.text2": "La culture sahraouie s'est développée à travers les siècles grâce aux échanges avec les différentes civilisations du Maghreb et de l'Afrique subsaharienne. Leurs traditions orales, leur poésie et leur musique témoignent de cette riche histoire.",
    "history.values": "Valeurs & Traditions",
    "history.values.text": "L'hospitalité est une valeur fondamentale de la culture sahraouie. Les étrangers sont toujours accueillis avec générosité, même dans les conditions difficiles du désert. Le respect des aînés et la solidarité tribale sont également des piliers de cette société.",

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
    "nav.festivals": "الأنشطة",
    "nav.art": "الفن والموسيقى",
    "nav.explore": "استكشاف",

    // Hero
    "hero.title": "الثقافة الحسانية",
    "hero.subtitle": "اكتشف التراث القديم لشعب الصحراء، ثقافة غنية بالتقاليد والضيافة والروابط العميقة مع الطبيعة.",
    "hero.button": "اكتشف",
    "hero.scroll": "مرر للأسفل",

    // Section titles
    "section.history": "التاريخ والتقاليد",
    "section.history.subtitle": "اكتشف أصول وعادات الشعب الصحراوي",
    "section.lifestyle": "الموروث المادي",
    "section.lifestyle.subtitle": "ملامح الأصالة: أسلوب الحياة التقليدي من المطبخ إلى الزي",
    "section.festivals": "حضور الثقافة الحسانية بالحياة المدرسية",
    "section.festivals.subtitle": "تعرف على دور الأنشطة والتظاهرات المدرسية في إبراز الثقافة الحسانية وترسيخها في البيئة التعليمية",
    "section.art": "الفن والموسيقى",
    "section.art.subtitle": "انغمس في التعبيرات الفنية الصحراوية",
    "section.explore": "استكشف الصحراء",
    "section.explore.subtitle": "نصائح ومعلومات للسفر في الصحراء المغربية",

    // Art section
    "art.expression": "التعبير الموسيقي",
    "art.description": "ترتبط الموسيقى الصحراوية ارتباطًا وثيقًا بالتقاليد الشفهية، وتنقل تاريخ وقيم ومشاعر أهل الصحراء. تستحضر الألحان الساحرة والإيقاعات المنومة المساحات الشاسعة للصحراء والحياة البدوية.",
    "art.poetry": "الشعر والقصص",
    "art.poetry.description": "الشعر هو في صميم الثقافة الصحراوية. تُلقى القصائد، المسماة \"طلب\" أو \"لغنا\", خلال التجمعات والاحتفالات. تتناول موضوعات مثل الحب والشرف والشجاعة وجمال الصحراء.",
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
    "art.myths.description":  "ويبقى الليل وقتا مناسبا لسرد الرواية إما لتسلية الأطفال حتى يناموا أو للتسامر بين الكبار بما تتطلبه الحكاية الحسانية من مهارة السرد والتمثل والتشخيص الصوتي والدقة في توصيل المغزى... ونجد الراوي إما شيخا (شيباني) أو عجوزاً (كهلة) لقدرتهما على السرد وحفظ متون الروايات معتمدين في ذلك على اللهجة الحسانية.",
    "art.myths.role": "دور الحكايات في المجتمع الحساني",
    "art.games": "الألعاب الشعبية",
    "art.games.description": "الألعاب الحسانية التقليدية هي أكثر من مجرد تسلية؛ فهي تعزز التماسك الاجتماعي وتنمي المهارات وتنقل القيم الثقافية للأجيال الشابة.",
    "art.beliefs": "المعتقدات",
    "art.beliefs.description": "المعتقدات الحسانية هي مزيج فريد من التقاليد الإسلامية والممارسات الثقافية ما قبل الإسلام. تؤثر على جميع جوانب الحياة اليومية, من طقوس الولادة إلى مراسم الجنازة.",
    "art.beliefs.spiritual": "الممارسة الروحية",
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
    "lifestyle.housing.description": "الخيمة التقليدية، المسماة \"خيمة\", هي في قلب الحياة البدوية الصحراوية. مصنوعة من شعر الماعز أو صوف الجمال، تحمي من الظروف الصحراوية القاسية مع إمكانية نقلها بسهولة.",
    "lifestyle.cuisine": "المطبخ الصحراوي",
    "lifestyle.cuisine.description": "المطبخ الصحراوي مكيف مع نمط الحياة البدوي، يجمع بين مكونات بسيطة لإنشاء أطباق مغذية. الكسكس وأرز اللحم والتمر هي عناصر أساسية. الشاي، الذي يقدم في ثلاثة أكواب، يمثل الضيافة ويشارك في كل لقاء.",
    "lifestyle.cuisine.description2": "البلغمان أو اللبسيس: هي وجبة مصنوعة من دقيق الشعير، حيث يوضع بعض الدقيق ونضعه في إناء ثم نسكب عليه الماء الساخن وبعض السكر وزيت الزيتون أو الزبدة وأحيانًا الغنم والعسل، والفرق بين البلغمان واللبسيس أن الأول يُسكب عليه الكثير من الماء حتى يصبح على شكل عجينة",
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
    "lifestyle.tea.title1": "طقوس الشاي الصحراوي: أتاي",
    "lifestyle.tea.p1":
      "يتميز المجتمع الصحراوي، بما فيه قبائل بني حسان في الأقاليم الجنوبية، بعادات وتقاليد فريدة تعكس هويته الثقافية. ومن أبرز هذه العادات صناعة الشاي أو 'أتاي'. يعتبر الشاي لدى الإنسان الصحراوي رمزاً للكرم وحسن الضيافة، ويُقدم وفق طقوس خاصة، حيث يُعد مناسبة لتقوية الروابط العائلية وتبادل الأخبار ومناقشة شؤون الحياة."
    ,
    "lifestyle.tea.title2": "فوائد وأنواع الشاي الصحراوي",
    "lifestyle.tea.p2":
      "من فوائد الشاي الصحية تسهيل عملية الهضم، لذا يُحرص على تناوله بعد الوجبات الدسمة. لا يُعتبر الشاي مجرد مشروب تقليدي، بل هو علامة على الكرم وحسن الاستقبال، حيث يُدعى الضيوف للشاي أكثر من الطعام. يُطلق على الشاي عالي الجودة 'هذا أتاي يكلع ادواخ'، أي أنه يزيل آلام الرأس، خاصة 'أتاي الدحميس' الذي يُحضّر عصراً. هناك نوعان من الشاي: 'الشعرة' (حبات طويلة ولونها أحمر فاتح) و'المكركب' (أغمق لوناً)."
    // Festivals section
    , "festivals.title": "المهرجانات والاحتفالات",
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
    "explore.subtitle": "نصائح ومعلومات للسفر في الصحراء المغربية",
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
    "history.language": "الهوية اللغوية بين الفصحى والحسانية",
    "history.language.origins": "الأصول والتأثير",
    "history.language.origins.text1": "اللهجة الحسانية، التي يتحدث بها الصحراويون، هي نوع من اللغة العربية التي تطورت في المناطق الصحراوية من خلال الاتصال باللغات البربرية والأفريقية. وهي تأخذ اسمها من قبيلة بني حسان التي استقرت في المنطقة في القرن الثالث عشر.",
    "history.language.origins.text2": "على الرغم من أنها عربية أساسًا في بنيتها، تتميز الحسانية بمفردات محددة تتعلق بالبيئة الصحراوية، والرعي البدوي، والتقاليد المحلية. كما أن نطقها مميز أيضًا، مع أصوات أكثر نعومة من اللغة العربية الكلاسيكية.",
    "history.language.transmission": "النقل والحفاظ",
    "history.language.transmission.text1": "تم نقل اللهجة الحسانية تقليديًا شفهيًا من خلال الشعر والقصص والأغاني، وهي وسيلة أساسية للثقافة الصحراوية. تحتل القصائد الحسانية (تيدينيت) مكانًا مهمًا في التجمعات والاحتفالات.",
    "history.language.transmission.text2": "اليوم، في حين تُستخدم اللغة العربية القياسية الحديثة في التعليم الرسمي ووسائل الإعلام، تظل اللهجة الحسانية لغة الحياة اليومية والتعبير الثقافي الأصيل. يتم بذل جهود لتوثيق والحفاظ على هذا التراث اللغوي الفريد، شاهد على التاريخ البدوي للشعب الصحراوي.",
    "history.ceremonies": "الاحتفالات والطقوس",
    "history.marriages": "الزواجات",
    "history.marriages.text": "تستمر احتفالات الزفاف عدة أيام وتتضمن العديد من التقاليد، بما في ذلك الموسيقى والرقص والولائم المتقنة.",
    "history.births": "المواليد",
    "history.births.text": "يتم الاحتفال بولادة طفل من قبل المجتمع بأكمله، مع طقوس محددة لحماية المولود الجديد من أرواح الصحراء.",
    "history.religious": "الاحتفالات الدينية",
    "history.religious.text": "عيد الفطر وعيد الأضحى هما أوقات مهمة من العام، ويتم الاحتفال بهما بصلوات جماعية ووجبات مشتركة.",
    "history.migrations": "تاريخ التراث الحساني",
    "history.migrations.text1": "الصحراويون هم شعب من أصل بدوي يسكنون مناطق الصحراء المغربية. يتميز تاريخهم بالهجرات الموسمية، متتبعين الأمطار والمراعي لقطعانهم.",
    "history.migrations.text2": "تطورت الثقافة الصحراوية على مر القرون من خلال التبادلات مع مختلف الحضارات في المغرب وأفريقيا جنوب الصحراء. تشهد تقاليدهم الشفهية وشعرهم وموسيقاهم على هذا التاريخ الغني.",
    "history.values": "القيم والتقاليد",
    "history.values.text": "الضيافة هي قيمة أساسية في الثقافة الصحراوية. يتم الترحيب بالغرباء دائمًا بسخاء، حتى في الظروف الصعبة للصحراء. احترام كبار السن والتضامن القبلي هما أيضًا من ركائز هذا المجتمع.",

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
