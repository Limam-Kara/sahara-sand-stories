import { useState, useRef, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Book, MessageSquare, Users, Gamepad } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "../ui/pagination";
import { useLanguage } from "@/contexts/LanguageContext"; 

// Les proverbes sont délibérément conservés en français/arabe comme demandé par l'utilisateur
const proverbs = [
  {
    original: "لي بغا العسل يصبر لقريص النحل",
    translation: "Celui qui veut du miel doit supporter les piqûres d'abeilles",
    meaning: "Il faut endurer des difficultés pour atteindre ses objectifs"
  },
  {
    original: "الكلام لي ما ينفع، سكوت منو أنفع",
    translation: "Si les mots ne sont pas utiles, le silence est plus bénéfique",
    meaning: "Parfois il vaut mieux se taire que parler sans but"
  },
  {
    original: "الجمل ما كاشوف عوجت رقبتو",
    translation: "Le chameau ne voit pas la courbure de son cou",
    meaning: "On remarque souvent les défauts des autres mais pas les siens"
  },
  {
    original: "الصبر مفتاح الفرج",
    translation: "La patience est la clé du soulagement",
    meaning: "La patience mène à la résolution des problèmes"
  },
  {
    original: "لي خدم يوم الجمعة، سبعة أيام جمعة",
    translation: "Celui qui travaille le vendredi travaillera sept vendredis",
    meaning: "Respecter les jours sacrés apporte la bénédiction"
  },
  {
    original: "شوف بعينيك لا تسمع بودنيك",
    translation: "Regarde avec tes yeux plutôt que d'écouter avec tes oreilles",
    meaning: "Il vaut mieux vérifier par soi-même que de croire les rumeurs"
  },
  {
    original: "المكتوب ما منو مهروب",
    translation: "Ce qui est écrit ne peut être évité",
    meaning: "Le destin est inévitable"
  },
  {
    original: "الكذاب خبزو ف وسط الدار",
    translation: "Le menteur a son pain au milieu de la maison",
    meaning: "Les mensonges sont facilement découverts"
  },
];

// Cultural elements nodes for the network visualization
const culturalElements = [
  {
    id: "proverbs",
    name: "Proverbes",
    icon: MessageSquare,
    color: "bg-sahara-brown",
    description: "Les proverbes hassanis sont des expressions de sagesse populaire transmises de génération en génération. Ils reflètent les valeurs morales, les normes sociales et l'expérience collective du peuple sahraoui dans son environnement désertique.",
    connections: ["poetry", "beliefs", "games"]
  },
  {
    id: "poetry",
    name: "Poésie",
    icon: Book,
    color: "bg-sahara-orange",
    description: "La poésie hassanie est une expression artistique qui véhicule l'identité, l'histoire et les valeurs du peuple sahraoui. Les poèmes, souvent récités lors de rassemblements, abordent des thèmes comme l'amour, la bravoure, le désert et l'honneur.",
    connections: ["proverbs", "myths"]
  },
  {
    id: "myths",
    name: "Mythes et Contes",
    icon: Book,
    color: "bg-sahara-terracotta",
    description: "Les mythes et contes hassanis sont des récits traditionnels qui expliquent les phénomènes naturels, transmettent les valeurs culturelles et divertissent. Ils jouent un rôle crucial dans la préservation de l'identité culturelle sahraouie.",
    connections: ["poetry", "beliefs"]
  },
  {
    id: "games",
    name: "Jeux Populaires",
    icon: Gamepad,
    color: "bg-blue-500",
    description: "Les jeux populaires hassanis sont des activités ludiques traditionnelles qui renforcent les liens communautaires, développent des compétences et divertissent. Ces jeux reflètent souvent l'environnement désertique et les ressources disponibles.",
    connections: ["proverbs"]
  },
  {
    id: "beliefs",
    name: "Croyances",
    icon: Users,
    color: "bg-green-600",
    description: "Les croyances sahraouies sont un mélange de pratiques islamiques et de traditions préislamiques. Elles incluent des rituels, des superstitions et des cérémonies qui guident la vie quotidienne et les moments importants de l'existence.",
    connections: ["proverbs", "myths"]
  }
];

// Tale example with translations
const getMythicalTale = (language) => {
  if (language === 'en') {
    return {
      title: "The Legend of the Tiris Well",
      content: `In the vast expanses of the Sahrawi desert, there is an ancient well known as the Tiris Well. 
      According to legend, this well was created by a holy man who, seeing the suffering of his people during a long drought, 
      planted his staff in the sand and prayed all night. At dawn, water gushed from this spot, creating a spring that has never dried up.
      
      It is said that the water from this well has healing properties and that anyone who drinks with a pure heart will see their wishes granted. 
      However, those who approach with bad intentions will see the water recede into the depths of the sand.
      
      This legend teaches the importance of purity of intention, faith, and respect for natural resources in Sahrawi culture.`
    };
  } else if (language === 'ar') {
    return {
      title: "أسطورة بئر تيريس",
      content: `في المساحات الشاسعة للصحراء الصحراوية، هناك بئر قديمة تعرف باسم بئر تيريس. 
      وفقًا للأسطورة، تم إنشاء هذه البئر من قبل رجل مقدس رأى معاناة شعبه خلال فترة جفاف طويلة، 
      فغرس عصاه في الرمال وصلى طوال الليل. عند الفجر، تدفقت المياه من هذا المكان، مكونة ينبوعًا لم يجف أبدًا.
      
      يقال إن ماء هذه البئر له خصائص شفائية وأن أي شخص يشرب بقلب نقي سيرى أمنياته تتحقق. 
      ومع ذلك، فإن أولئك الذين يقتربون بنوايا سيئة سيرون الماء يتراجع إلى أعماق الرمال.
      
      تعلم هذه الأسطورة أهمية نقاء النية والإيمان واحترام الموارد الطبيعية في الثقافة الصحراوية.`
    };
  } else {
    return {
      title: "La Légende du Puits de Tiris",
      content: `Dans les vastes étendues du désert sahraoui, il existe un puits ancien connu sous le nom de Puits de Tiris. 
      Selon la légende, ce puits fut créé par un saint homme qui, voyant la souffrance de son peuple durant une longue sécheresse, 
      planta son bâton dans le sable et pria toute la nuit. À l'aube, l'eau jaillit de cet endroit, créant une source qui ne s'est jamais tarie.
      
      On dit que l'eau de ce puits possède des propriétés curatives et que quiconque boit avec un cœur pur verra ses souhaits exaucés. 
      Cependant, ceux qui s'approchent avec de mauvaises intentions verront l'eau se retirer dans les profondeurs du sable.
      
      Cette légende enseigne l'importance de la pureté d'intention, de la foi et du respect des ressources naturelles dans la culture sahraouie.`
    };
  }
};

const Art = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const proverbsPerPage = 5;
  const totalPages = Math.ceil(proverbs.length / proverbsPerPage);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("proverbs");
  const { t, language } = useLanguage();

  // Calculate the proverbs to display on the current page
  const indexOfLastProverb = currentPage * proverbsPerPage;
  const indexOfFirstProverb = indexOfLastProverb - proverbsPerPage;
  const currentProverbs = proverbs.slice(indexOfFirstProverb, indexOfLastProverb);
  
  // Get the appropriate tale for the current language
  const mythicalTale = getMythicalTale(language);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          onClick={() => handlePageChange(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= totalPages - 1) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink 
              onClick={() => handlePageChange(i)} 
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 4) {
      pages.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".reveal-on-scroll");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("revealed");
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tabItems = [
    { 
      id: "proverbs", 
      name: language === 'en' ? "Proverbs" : language === 'fr' ? "Proverbes" : "الأمثال", 
      icon: MessageSquare 
    },
    { 
      id: "poetry", 
      name: language === 'en' ? "Poetry" : language === 'fr' ? "Poésie" : "الشعر", 
      icon: Book 
    },
    { 
      id: "myths", 
      name: language === 'en' ? "Myths and Tales" : language === 'fr' ? "Mythes et Contes" : "الأساطير والحكايات", 
      icon: Book 
    },
    { 
      id: "games", 
      name: language === 'en' ? "Popular Games" : language === 'fr' ? "Jeux Populaires" : "الألعاب الشعبية", 
      icon: Gamepad 
    },
    { 
      id: "beliefs", 
      name: language === 'en' ? "Beliefs" : language === 'fr' ? "Croyances" : "المعتقدات", 
      icon: Users 
    },
  ];

  // Get translated table headers
  const getTableHeaders = () => {
    if (language === 'en') {
      return {
        original: "Original Proverb",
        translation: "Translation",
        meaning: "Meaning"
      };
    } else if (language === 'ar') {
      return {
        original: "المثل الأصلي",
        translation: "الترجمة",
        meaning: "المعنى"
      };
    } else {
      return {
        original: "Proverbe original",
        translation: "Traduction",
        meaning: "Signification"
      };
    }
  };

  const tableHeaders = getTableHeaders();

  return (
    <section id="art" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title={t("art.culture.title")}
        subtitle={t("art.culture.subtitle")}
        className="reveal-on-scroll"
      />

      {/* Custom Tab Navigation styled like Explore's Saharan Destinations */}
      <div className="mt-12 reveal-on-scroll">
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 px-4 text-center rounded-md transition-all duration-300 flex flex-col items-center justify-center ${
                  activeTab === tab.id
                    ? "bg-sahara-orange text-white shadow-md"
                    : "bg-sahara-sand/20 hover:bg-sahara-sand/40"
                }`}
              >
                <tab.icon className="h-5 w-5 mb-1" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Proverbs Content - Cette section n'est pas traduite comme demandé */}
        {activeTab === "proverbs" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("art.proverbs")}</h3>
            <p className="mb-6">
              {t("art.proverbs.description")}
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{tableHeaders.original}</TableHead>
                  <TableHead>{tableHeaders.translation}</TableHead>
                  <TableHead>{tableHeaders.meaning}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProverbs.map((proverb, index) => (
                  <TableRow key={`proverb-${indexOfFirstProverb + index}`}>
                    <TableCell className="font-medium">{proverb.original}</TableCell>
                    <TableCell>{proverb.translation}</TableCell>
                    <TableCell>{proverb.meaning}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            {proverbs.length > proverbsPerPage && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}

        {/* Poetry Content */}
        {activeTab === "poetry" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-orange mb-4">{t("art.poetry.title")}</h3>
            <p className="mb-6">
              {t("art.poetry.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t("art.poetry.types")}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tebraa - {language === 'en' ? "love poetry" : language === 'fr' ? "poésie amoureuse" : "شعر الحب"}</li>
                  <li>Fagru - {language === 'en' ? "praise poetry" : language === 'fr' ? "poésie de louange" : "شعر المديح"}</li>
                  <li>Lghna - {language === 'en' ? "sung poetry" : language === 'fr' ? "poésie chantée" : "الشعر المغنى"}</li>
                  <li>Thaydin - {language === 'en' ? "war poetry" : language === 'fr' ? "poésie de guerre" : "شعر الحرب"}</li>
                </ul>
              </div>
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t("art.poetry.themes")}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{language === 'en' ? "Love and beauty" : language === 'fr' ? "L'amour et la beauté" : "الحب والجمال"}</li>
                  <li>{language === 'en' ? "Courage and honor" : language === 'fr' ? "Le courage et l'honneur" : "الشجاعة والشرف"}</li>
                  <li>{language === 'en' ? "Desert nature" : language === 'fr' ? "La nature du désert" : "طبيعة الصحراء"}</li>
                  <li>{language === 'en' ? "History and identity" : language === 'fr' ? "L'histoire et l'identité" : "التاريخ والهوية"}</li>
                  <li>{language === 'en' ? "Spirituality" : language === 'fr' ? "La spiritualité" : "الروحانية"}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Myths and Tales Content */}
        {activeTab === "myths" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-terracotta mb-4">{t("art.myths")}</h3>
            <p className="mb-6">
              {t("art.myths.description")}
            </p>
            
            <div className="border-l-4 border-sahara-terracotta pl-4 py-2 mb-6">
              <h4 className="text-xl font-medium mb-2">{mythicalTale.title}</h4>
              <p className="whitespace-pre-line">{mythicalTale.content}</p>
            </div>
            
            <div className="bg-sahara-sand/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{t("art.myths.role")}</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>{language === 'en' ? "Teach moral values" : language === 'fr' ? "Enseigner des valeurs morales" : "تعليم القيم الأخلاقية"}</li>
                <li>{language === 'en' ? "Preserve history and cultural identity" : language === 'fr' ? "Préserver l'histoire et l'identité culturelle" : "الحفاظ على التاريخ والهوية الثقافية"}</li>
                <li>{language === 'en' ? "Entertain and bring the community together" : language === 'fr' ? "Divertir et rassembler la communauté" : "الترفيه وجمع المجتمع"}</li>
                <li>{language === 'en' ? "Explain natural and social phenomena" : language === 'fr' ? "Expliquer les phénomènes naturels et sociaux" : "شرح الظواهر الطبيعية والاجتماعية"}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Games Content */}
        {activeTab === "games" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("art.games")}</h3>
            <p className="mb-6">
              {t("art.games.description")}
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="siggan">
                <AccordionTrigger>Siggan ({language === 'en' ? "Five stone game" : language === 'fr' ? "Jeu des cinq pierres" : "لعبة الحجارة الخمسة"})</AccordionTrigger>
                <AccordionContent>
                  {language === 'en' 
                    ? "This game of skill involves throwing and catching small stones in different configurations. It develops eye-hand coordination and concentration, while being a popular social activity among children."
                    : language === 'fr'
                    ? "Ce jeu d'adresse consiste à lancer et à attrapper de petites pierres dans différentes configurations. Il développe la coordination œil-main et la concentration, tout en étant une activité sociale populaire parmi les enfants."
                    : "تتضمن هذه اللعبة المهارية رمي والتقاط حجارة صغيرة بأشكال مختلفة. تطور التنسيق بين العين واليد والتركيز، وهي نشاط اجتماعي شعبي بين الأطفال."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="damah">
                <AccordionTrigger>Damah ({language === 'en' ? "Board game" : language === 'fr' ? "Jeu de plateau" : "لعبة اللوح"})</AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Similar to checkers but with specific rules, this strategy game is popular among men. It develops strategic thinking and is an important social pastime."
                    : language === 'fr'
                    ? "Similaire aux dames mais avec des règles spécifiques, ce jeu de stratégie est populaire parmi les hommes. Il développe la pensée stratégique et constitue un passe-temps social important."
                    : "مشابهة للداما ولكن بقواعد محددة، هذه اللعبة الاستراتيجية شائعة بين الرجال. تطور التفكير الاستراتيجي وهي هواية اجتماعية مهمة."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="kharbga">
                <AccordionTrigger>Kharbga</AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "A traditional board game played with pieces on a board drawn in the sand. This strategy game develops tactical thinking and is often played during social gatherings."
                    : language === 'fr'
                    ? "Un jeu de plateau traditionnel joué avec des pions sur un tableau dessiné dans le sable. Ce jeu de stratégie développe la réflexion tactique et est souvent joué lors des rassemblements sociaux."
                    : "لعبة لوح تقليدية تلعب بقطع على لوحة مرسومة في الرمال. هذه اللعبة الاستراتيجية تطور التفكير التكتيكي وغالبًا ما يتم لعبها خلال التجمعات الاجتماعية."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Beliefs Content */}
        {activeTab === "beliefs" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("art.beliefs")}</h3>
            <p className="mb-6">
              {t("art.beliefs.description")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t("art.beliefs.spiritual")}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{language === 'en' ? "Protection rituals against the evil eye" : language === 'fr' ? "Rituels de protection contre le mauvais œil" : "طقوس الحماية من العين الشريرة"}</li>
                  <li>{language === 'en' ? "Celebrations linked to lunar cycles" : language === 'fr' ? "Célébrations liées aux cycles lunaires" : "احتفالات مرتبطة بدورات القمر"}</li>
                  <li>{language === 'en' ? "Healing traditions with plants" : language === 'fr' ? "Traditions de guérison par les plantes" : "تقاليد الشفاء بالنباتات"}</li>
                  <li>{language === 'en' ? "Dream interpretation" : language === 'fr' ? "Interprétation des rêves" : "تفسير الأحلام"}</li>
                </ul>
              </div>
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t("art.beliefs.life")}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{language === 'en' ? "Birth rituals" : language === 'fr' ? "Rituels de naissance" : "طقوس الولادة"}</li>
                  <li>{language === 'en' ? "Wedding ceremonies" : language === 'fr' ? "Cérémonies de mariage" : "حفلات الزفاف"}</li>
                  <li>{language === 'en' ? "Coming of age rites" : language === 'fr' ? "Rites de passage à l'âge adulte" : "طقوس البلوغ"}</li>
                  <li>{language === 'en' ? "Funeral traditions" : language === 'fr' ? "Traditions funéraires" : "تقاليد الجنازة"}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Art;
