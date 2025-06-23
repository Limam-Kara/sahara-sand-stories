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
  const tales = [
    {
      title: {
        en: "The Legend of the Tiris Well",
        fr: "La Légende du Puits de Tiris",
        ar: "أسطورة بئر تيريس"
      },
      content: {
        en: `In the vast expanses of the Sahrawi desert, there is an ancient well known as the Tiris Well. 
        According to legend, this well was created by a holy man who, seeing the suffering of his people during a long drought, 
        planted his staff in the sand and prayed all night. At dawn, water gushed from this spot, creating a spring that has never dried up.
        
        It is said that the water from this well has healing properties and that anyone who drinks with a pure heart will see their wishes granted. 
        However, those who approach with bad intentions will see the water recede into the depths of the sand.
        
        This legend teaches the importance of purity of intention, faith, and respect for natural resources in Sahrawi culture.`,
        fr: `Dans les vastes étendues du désert sahraoui, il existe un puits ancien connu sous le nom de Puits de Tiris. 
        Selon la légende, ce puits fut créé par un saint homme qui, voyant la souffrance de son peuple durant une longue sécheresse, 
        planta son bâton dans le sable et pria toute la nuit. À l'aube, l'eau jaillit de cet endroit, créant une source qui ne s'est jamais tarie.
        
        On dit que l'eau de ce puits possède des propriétés curatives et que quiconque boit avec un cœur pur verra ses souhaits exaucés. 
        Cependant, ceux qui s'approchent avec de mauvaises intentions verront l'eau se retirer dans les profondeurs du sable.
        
        Cette légende enseigne l'importance de la pureté d'intention, de la foi et du respect des ressources naturelles dans la culture sahraouie.`,
        ar: `في المساحات الشاسعة للصحراء الصحراوية، هناك بئر قديمة تعرف باسم بئر تيريس. 
        وفقًا للأسطورة، تم إنشاء هذه البئر من قبل رجل مقدس رأى معاناة شعبه خلال فترة جفاف طويلة، 
        فغرس عصاه في الرمال وصلى طوال الليل. عند الفجر، تدفقت المياه من هذا المكان، مكونة ينبوعًا لم يجف أبدًا.
        
        يقال إن ماء هذه البئر له خصائص شفائية وأن أي شخص يشرب بقلب نقي سيرى أمنياته تتحقق. 
        ومع ذلك، فإن أولئك الذين يقتربون بنوايا سيئة سيرون الماء يتراجع إلى أعماق الرمال.
        
        تعلم هذه الأسطورة أهمية نقاء النية والإيمان واحترام الموارد الطبيعية في الثقافة الصحراوية.`
      }
    },
    {
      title: {
        en: "The Tale of Bent El Ban",
        fr: "Le Conte de Bent El Ban",
        ar: "حكاية بنت البان"
      },
      content: {
        en: `One of the most famous stories in Hassani literature is the tale of "Bent El Ban", which tells of an exceptionally beautiful girl named Bent El Ban who lives with her tribe in the desert, known for her gentleness and noble character. Many suitors come to ask for her hand, but her father sets a condition that anyone who wishes to marry her must pass difficult and harsh tests to prove his courage and endurance. Storytellers speak of a young man who overcame all obstacles and challenges to win Bent El Ban's heart, making the tale a symbol of courage, sacrifice, and patience in Sahrawi culture.`,
        fr: `L'une des histoires les plus célèbres de la littérature hassanie est le conte de "Bent El Ban", qui raconte l'histoire d'une jeune fille d'une beauté exceptionnelle nommée Bent El Ban, vivant avec sa tribu dans le désert, connue pour sa douceur et son caractère noble. De nombreux prétendants viennent demander sa main, mais son père impose comme condition que quiconque souhaite l'épouser doit réussir des épreuves difficiles et rudes prouvant son courage et son endurance. Les conteurs parlent d'un jeune homme qui surmonta tous les obstacles et défis pour gagner le cœur de Bent El Ban, faisant de ce conte un symbole de courage, de sacrifice et de patience dans la culture sahraouie.`,
        ar: `من أشهر القصص في الأدب الحساني قصة "بنت البان"، وهي قصة تدور حول فتاة فائقة الجمال تدعى "بنت البان"، تعيش مع قبيلتها في الصحراء، وتتميز برقتها وأخلاقها العالية. يتقدم العديد من الشبان لخطبتها، إلا أن والدها يشترط على من يريد الزواج بها أن يجتاز اختبارات شاقة وقاسية تثبت شجاعته وقوة تحمله. يتحدث الرواة عن شاب تحدى الصعاب وتغلب على العقبات للفوز بقلب "بنت البان"، لتصبح الحكاية رمزًا للشجاعة والتضحية والصبر في الثقافة الصحراوية.`
      }
    }
  ];

  // Return a random tale or implement logic to alternate between them
  const randomTale = tales[Math.floor(Math.random() * tales.length)];

  return {
    title: randomTale.title[language] || randomTale.title.en,
    content: randomTale.content[language] || randomTale.content.en
  };
};

const Art = () => {
  const { t, language } = useLanguage();
  // Les proverbes sont délibérément conservés en français/arabe comme demandé par l'utilisateur

  const proverbs = [

    {
      original: "اللِّي يصبر، يَلْحَگُو الظلّ",
      translation: language === 'en' ? "He who is patient will reach the shade"
        : language === 'fr' ? "Celui qui est patient atteindra l'ombre"
          : "من يصبر، يدرك الظل",
      meaning: language === 'en' ? "This proverb expresses the value of patience and its effect in achieving goals. It suggests that patience is the key to relief, and that whoever perseveres patiently in their pursuit will ultimately reach comfort or their objective (with 'shade' symbolizing rest and protection from exhaustion and hardship)."
        : language === 'fr' ? "Ce proverbe exprime la valeur de la patience et son effet dans l'atteinte des objectifs. Il suggère que la patience est la clé du soulagement, et que celui qui persévère patiemment dans sa poursuite finira par atteindre le confort ou son objectif (avec 'l'ombre' symbolisant le repos et la protection contre l'épuisement et les difficultés)."
          : "المثل يعبّر عن قيمة الصبر وأثره في نيل المقصود، ويُشير إلى أن الصبر مفتاح الفرج، وأن من يصبر ويثابر في سعيه، فإنه سيصل في النهاية إلى الراحة أو الهدف (والظل هنا رمز للراحة والحماية من التعب والحرّ)."
    },
    // 1️⃣ Patience and overlooking
    {
      original: "الصبر وتعاما، أطوال اللامة",
      translation: language === 'en' ? "Patience and overlooking (pretending not to see harm) prolongs the life of the community"
        : language === 'fr' ? "La patience et le fait d'ignorer (faire semblant de ne pas voir le mal) prolongent la vie de la communauté"
          : "الصبر والتغاضي (التظاهر بعدم رؤية الأذى)، يطيل عمر الجماعة (أو العِشرة)",
      meaning: language === 'en' ? "This proverb emphasizes that patience, controlling anger, and overlooking small mistakes are the foundation of lasting social relationships and community cohesion. 'Overlooking' means deliberately ignoring minor offenses. It encourages tolerance and patience to ensure stable relationships and communal living."
        : language === 'fr' ? "Ce proverbe souligne que la patience, le contrôle de la colère et le fait d'ignorer les petites erreurs sont la base de relations sociales durables et de la cohésion communautaire. 'Ignorer' signifie délibérément passer outre les offenses mineures. Il encourage la tolérance et la patience pour assurer des relations stables et une vie communautaire harmonieuse."
          : "الصبر، وكظم الغيظ، وغضّ الطرف عن الأخطاء الصغيرة، هو أساس استمرار العلاقات الاجتماعية ودوام الجماعة. 'تعاما' تعني أن تتغافل أو تتجاهل عن عمد. المثل يُشجع على التسامح والصبر لضمان استقرار العلاقات والعيش المشترك."
    },

    // 2️⃣ The hand that doesn't work
    {
      original: "اليد لماهي مدسّما، ما تغراها التراب",
      translation: language === 'en' ? "The hand that doesn't work (or isn't calloused from labor) doesn't get dirty with soil"
        : language === 'fr' ? "La main qui ne travaille pas (ou qui n'est pas calleuse) ne se salit pas de terre"
          : "اليد التي لا تعمل (أو ليست مشققة من العمل)، لا يوسّخها التراب",
      meaning: language === 'en' ? "This proverb criticizes laziness or avoiding real work. A hand that doesn't exert effort remains superficially clean but empty of achievement. 'Calloused' means rough or cracked from much work. The soil here symbolizes the mark of hard work and genuine effort."
        : language === 'fr' ? "Ce proverbe critique la paresse ou l'évitement du vrai travail. Une main qui ne fait pas d'effort reste superficiellement propre mais vide d'accomplissement. 'Calleuse' signifie rugueuse ou crevassée par le travail. La terre symbolise ici la marque du travail dur et de l'effort authentique."
          : "اليد التي لا تبذل جهدًا أو لا تقوم بالعمل الحقيقي، تبقى نظيفة شكليًا لكنها فارغة من الإنجاز. المثل ينتقد الكسل أو التهرب من العمل. 'مدسّما' معناها: خَشِنة أو متشققة من كثرة الشغل. التراب هنا يرمز إلى أثر العمل الجاد."
    },

    // 3️⃣ Listen to those who make you cry
    {
      original: "اسمع أراي لمبكّيينك، ولا تسمع أراي لمضحّكيينك",
      translation: language === 'en' ? "Listen to the advice of those who make you cry (with honest criticism), not those who make you laugh (with deceptive sweet talk)"
        : language === 'fr' ? "Écoute les conseils de ceux qui te font pleurer (par des critiques honnêtes), pas ceux qui te font rire (par des paroles douces trompeuses)"
          : "استمع لنصيحة من يبكيك (بنقده الصادق)، ولا تستمع لمن يُضحكك (بكلامه الجميل المخادع)",
      meaning: language === 'en' ? "This proverb encourages honest, even painful, criticism over deceptive flattery. 'Those who make you cry' refers to people who give sincere criticism for your benefit, even if it makes you emotional. 'Those who make you laugh' refers to those who flatter you with pleasant but ultimately useless words."
        : language === 'fr' ? "Ce proverbe encourage les critiques honnêtes, même douloureuses, plutôt que la flatterie trompeuse. 'Ceux qui te font pleurer' désignent les personnes qui critiquent sincèrement pour ton bien, même si cela t'émeut. 'Ceux qui te font rire' désignent ceux qui te flattent avec des paroles agréables mais finalement inutiles."
          : "يُشجع هذا المثل على الصدق والمصارحة ولو كانت مؤلمة، ويدعو إلى تجنب المجاملة الزائفة. 'مبكيينك': من ينتقدك بصدق لصلحك، حتى لو جعلك تبكي. 'مضحكيينك': من يجاملك ويخدعك بكلام جميل، لكنه لا ينفعك."
    },

    // 4️⃣ One hand doesn't clap
    {
      original: "اليد وحدة ما تصفّگ",
      translation: language === 'en' ? "One hand doesn't clap"
        : language === 'fr' ? "Une seule main ne peut pas applaudir"
          : "اليد الواحدة لا تُصفّق",
      meaning: language === 'en' ? "This proverb emphasizes the importance of cooperation and teamwork. An individual cannot accomplish much alone - success requires collaboration and mutual support. It promotes the values of collective work and team spirit."
        : language === 'fr' ? "Ce proverbe souligne l'importance de la coopération et du travail d'équipe. Un individu ne peut pas accomplir grand-chose seul - le succès nécessite collaboration et soutien mutuel. Il promeut les valeurs du travail collectif et de l'esprit d'équipe."
          : "لا يمكن للفرد أن يُنجز شيئًا وحده، لا بد من التعاون والتكافل لتحقيق النجاح. المثل يشجع على العمل الجماعي وروح الفريق."
    },
    {
      original: "الغايب ماهو شيخ اهلو",
      translation: language === 'en' ? "The absent is not the head of his family."
        : language === 'fr' ? "L'absent n'est pas le chef de sa famille."
          : "الغائب ليس شيخ أهله.",
      meaning: language === 'en' ? "A person who is absent from their community cannot make decisions for it, as they do not understand its circumstances or daily realities."
        : language === 'fr' ? "Une personne qui est absente de sa communauté ne peut pas prendre de décisions pour elle, car elle ne comprend pas ses circonstances ou ses réalités quotidiennes."
          : "الشخص الغائب عن مجتمعه لا يمكنه اتخاذ قرارات نيابة عنهم لأنه لا يفهم ظروفهم أو واقعهم اليومي."
    },
    {
      original: "البل تبرك على كبارها",
      translation: language === 'en' ? "The village blesses its elders."
        : language === 'fr' ? "Le village bénit ses anciens."
          : "البلد تبارك على كبارها.",
      meaning: language === 'en' ? "This proverb calls for adherence to Islam and the commitment to its duties while avoiding its prohibitions."
        : language === 'fr' ? "Ce proverbe appelle à l'adhésion à l'Islam et à l'engagement envers ses devoirs tout en évitant ses interdictions."
          : "هذا المثل يدعو إلى الالتزام بالدين الإسلامي والتمسك بواجباته وتجنب نواهيه."
    },
    {
      original: "أل وصاك على أمك حكرك",
      translation: language === 'en' ? "Whoever advises you about your mother, disrespects you."
        : language === 'fr' ? "Celui qui te conseille sur ta mère, te manque de respect."
          : "من أوصاك على أمك احتقرك.",
      meaning: language === 'en' ? "This emphasizes the importance of honoring one's parents, particularly the mother, which is an unquestionable act of kindness."
        : language === 'fr' ? "Cela souligne l'importance d'honorer ses parents, en particulier la mère, ce qui est un acte de bonté incontestable."
          : "هذا يشدد على أهمية احترام الوالدين، وخاصة الأم، وهو فعل من أفعال الإحسان التي لا نقاش فيها."
    },
    {
      original: "أل ما عدل شي ما خاف شي",
      translation: language === 'en' ? "Those who have done nothing wrong fear nothing."
        : language === 'fr' ? "Celui qui n'a rien fait de mal, n'a rien à craindre."
          : "من لم يرتكب ذنبًا لا يخاف شيئًا.",
      meaning: language === 'en' ? "There is no reason to fear if one has committed no wrongdoings."
        : language === 'fr' ? "Il n'y a aucune raison de craindre si l'on n'a commis aucune faute."
          : "لا يوجد سبب للخوف إذا لم يرتكب الشخص أي خطأ."
    },
    {
      original: "اللِّي كَثّر لصحاب، يِبْكِي بْلا صَاحِب",
      translation: language === 'en' ? "He who gathers many companions may weep without a true friend"
        : language === 'fr' ? "Celui qui accumule beaucoup de compagnons peut pleurer sans vrai ami" : "من يُكثِر الأصحاب، قد يبكي في النهاية دون أن يجد صاحبًا"
      ,
      meaning: language === 'en' ? "This proverb reflects social wisdom about relationships and friendships, warning against expanding connections without discernment. Not everyone called a 'friend' can be relied upon in times of hardship. Quality matters more than quantity in true companionship."
        : language === 'fr' ? "Ce proverbe reflète une sagesse sociale sur les relations et les amitiés, mettant en garde contre l'expansion des liens sans discernement. Tous ceux qu'on appelle 'amis' ne sont pas fiables dans les moments difficiles. La qualité compte plus que la quantité dans les vraies relations."
          : "هذا المثل يعكس حكمة اجتماعية حول العلاقات والصداقات، ويُحذر من التوسّع في العلاقات دون وعي. فليس كل من يُسمّى 'صاحبًا' يُمكن الاعتماد عليه وقت الشدة. الجودة أهم من الكمية في الصداقة الحقيقية."

    },

    {
      original: "المسلة ألا محبوكة ولا متروكة",
      translation: language === 'en' ? "The task should neither be too complicated nor abandoned."
        : language === 'fr' ? "La tâche ne doit être ni trop compliquée ni abandonnée."
          : "المسألة لا تكون محبوكة ولا متروكة.",
      meaning: language === 'en' ? "Similar to the saying: 'May God bless those who do good deeds and perfect them.'"
        : language === 'fr' ? "Cela ressemble à la citation : 'Que Dieu bénisse ceux qui font des bonnes actions et les perfectionnent.'"
          : "يشبه المثل القائل: 'رحم الله من عمل عملاً صالحًا وأتقنه.'"
    },
    {
      original: "أيد وحدة ما تصفك",
      translation: language === 'en' ? "One hand cannot clap."
        : language === 'fr' ? "Une main ne peut pas applaudir."
          : "يد واحدة لا تصفق.",
      meaning: language === 'en' ? "This is a call for teamwork and constant collaboration, similar to the Arabic saying: 'One hand cannot clap.'"
        : language === 'fr' ? "Cela appelle à la collaboration en équipe et au travail constant, similaire au proverbe arabe : 'Une main ne peut pas applaudir.'"
          : "هذا دعوة للعمل الجماعي والتعاون المستمر، مشابه للمثل العربي: 'يد واحدة لا تصفق.'"
    },
    {
      original: "أشري الجار سابك الدار",
      translation: language === 'en' ? "Choose the neighbor before the house."
        : language === 'fr' ? "Choisis le voisin avant la maison."
          : "اختار الجار قبل الدار.",
      meaning: language === 'en' ? "This stresses the importance of choosing good neighbors before considering the house itself, and is similar to the saying: 'The neighbor before the house.'"
        : language === 'fr' ? "Cela souligne l'importance de choisir de bons voisins avant de considérer la maison elle-même, et ressemble au proverbe : 'Le voisin avant la maison.'"
          : "هذا يشدد على أهمية اختيار الجيران الطيبين قبل النظر في البيت نفسه، وهو مشابه للمثل القائل: 'الجيران قبل الدار.'"
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const proverbsPerPage = 5;
  const totalPages = Math.ceil(proverbs.length / proverbsPerPage);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("proverbs");



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
                className={`py-2 px-4 text-center rounded-md transition-all duration-300 flex flex-col items-center justify-center ${activeTab === tab.id
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
                  <li className="poem-item">
                    <h5 className="font-medium">{language === 'en' ? "Ode to the Chosen One" : language === 'fr' ? "Ode à l'Élu" : "يــا حَــبّْ طــه المُـصْـطَـفَـى"}</h5>
                    <p className="text-sm italic">
                      {language === 'en' ?
                        "O love of Taha the Chosen, Not ordinary love without meaning, In him is light and healing, His name beautiful on the tongue. Send blessings upon him, For my heart finds peace in his remembrance."
                        : language === 'fr' ?
                          "Ô amour de Taha l'Élu, Ce n'est pas un amour ordinaire sans sens, En lui se trouve la lumière et la guérison, Son nom est beau sur la langue. Envoyez des bénédictions sur lui, Car mon cœur trouve la paix dans son souvenir."
                          : "يــا حَــبّْ طــه المُـصْـطَـفَـى، مَـاهُ حُـبّْ مِـنْ غَـيْـرْ مِـعْـنَـى، الــنّــورْ فِــيــهْ وَإِشْــفَـفَـى، وَاسْـمُـهْ بَـاهِـي فِـي لَـسْـانـهْ، صَــلُّــوا عَلِــيــهْ وَانــصَــفَــى، قَــلْـبِـي بْـذِكْــرُهْ مَـا تْـحَـنّـى"}
                    </p>
                  </li>

                  <li className="poem-item">
                    <h5 className="font-medium">{language === 'en' ? "Pride of the Desert" : language === 'fr' ? "Fierté du désert" : "قصيدة فخر بالصحراء"}</h5>
                    <p className="text-sm italic">
                      {language === 'en' ?
                        "I am son of the ancient desert, Generosity began with us, Patience, status and compassion, We never humiliate the transgressor, Nor degrade him in pursuit of his goals."
                        : language === 'fr' ?
                          "Je suis fils du désert ancien, La générosité a commencé avec nous, Patience, statut et compassion, Nous n'humilions jamais le transgresseur, Ni ne le dégradons dans sa quête."
                          : "أنــا بـنْ أگـديـمْ الـنـعْـمــانْ، والــكـــرمْ مِــنّـــا بَــدايَــتُــهْ، والــصَّــبــرْ والــجــاهْ والــشــانْ، والــعــطــفْ مِــنّــا نِــهـايَــتُــهْ، مـا نْـهـيـنْ مِـنْ زادْ عـنّـانْ، ولا نْـذلّـهْ فـي وِجْهْ غـايتُهْ"}
                    </p>
                  </li>

                  <li className="poem-item">
                    <h5 className="font-medium">{language === 'en' ? "Poem of Wisdom" : language === 'fr' ? "Poème de sagesse" : "قصيدة حكمة"}</h5>
                    <p className="text-sm italic">
                      {language === 'en' ?
                        "Without reason present, One is not fully human, He who cannot endure, Will depart broken, And when time matures, It reveals what you didn't know within."
                        : language === 'fr' ?
                          "Sans la présence de la raison, On n'est pas pleinement humain, Celui qui ne peut endurer, Partira brisé, Et quand le temps mûrit, Il révèle ce que tu ignorais en toi."
                          : "الــعـقــلْ إلَ ما حَــضْـرْ، مـاهُ بـشَـرْ مِـنْ فـوقْ، والـلـي ما عـادْ يـصْبَـرْ، يِـوَلّي مِـنّـهْ مـنـفـوقْ، والـزّمـانْ إلَ تَـكْـبَـرْ، يـجـيـبْ مِـنْكْ مَـا يـشـوقْ"}
                    </p>
                  </li>

                  <li className="poem-item">
                    <h5 className="font-medium">{language === 'en' ? "Women's Poetry (Love & Reproach)" : language === 'fr' ? "Poésie féminine (Amour & Reproche)" : "تبراع (شعر نسائي – حب وعتاب)"}</h5>
                    <p className="text-sm italic">
                      {language === 'en' ?
                        "Enough! My heart rusts with longing, No one knows what ails it, I cried without calling to him, And today you smile at him as if nothing!"
                        : language === 'fr' ?
                          "Assez! Mon cœur rouille de désir, Personne ne sait ce qui le tourmente, J'ai pleuré sans l'appeler, Et aujourd'hui tu lui souris comme si de rien n'était!"
                          : "كِــفْ كِــفْ مَــنْ گــلْبِــي يِــصْــدَّى، يَـــگْـــدِرْ مَـــا بَـــهْ وَيْـــنْ إِبْـــلَـــهْ، بْـــگِـــيــتْ وَانـــي بَــعْــدْ مَـــا نْـــدَّا، وَانـــتَ الــيَــومْ تْــبَــسَّــمْ لَــهْ"}
                    </p>
                  </li>
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

            {/* First Myth - Tiris Well */}
            <div className="border-l-4 border-sahara-terracotta pl-4 py-2 mb-6">
              <h4 className="text-xl font-medium mb-2">
                {language === 'en' ? "The Legend of the Tiris Well" :
                  language === 'fr' ? "La Légende du Puits de Tiris" :
                    "أسطورة بئر تيريس"}
              </h4>
              <p className="whitespace-pre-line">
                {language === 'en' ?
                  `In the vast expanses of the Sahrawi desert, there is an ancient well known as the Tiris Well. 
          According to legend, this well was created by a holy man who, seeing the suffering of his people during a long drought, 
          planted his staff in the sand and prayed all night. At dawn, water gushed from this spot, creating a spring that has never dried up.
          
          It is said that the water from this well has healing properties and that anyone who drinks with a pure heart will see their wishes granted. 
          However, those who approach with bad intentions will see the water recede into the depths of the sand.
          
          This legend teaches the importance of purity of intention, faith, and respect for natural resources in Sahrawi culture.`
                  : language === 'fr' ?
                    `Dans les vastes étendues du désert sahraoui, il existe un puits ancien connu sous le nom de Puits de Tiris. 
          Selon la légende, ce puits fut créé par un saint homme qui, voyant la souffrance de son peuple durant une longue sécheresse, 
          planta son bâton dans le sable et pria toute la nuit. À l'aube, l'eau jaillit de cet endroit, créant une source qui ne s'est jamais tarie.
          
          On dit que l'eau de ce puits possède des propriétés curatives et que quiconque boit avec un cœur pur verra ses souhaits exaucés. 
          Cependant, ceux qui s'approchent avec de mauvaises intentions verront l'eau se retirer dans les profondeurs du sable.
          
          Cette légende enseigne l'importance de la pureté d'intention, de la foi et du respect des ressources naturelles dans la culture sahraouie.`
                    :
                    `في المساحات الشاسعة للصحراء الصحراوية، هناك بئر قديمة تعرف باسم بئر تيريس. 
          وفقًا للأسطورة، تم إنشاء هذه البئر من قبل رجل مقدس رأى معاناة شعبه خلال فترة جفاف طويلة، 
          فغرس عصاه في الرمال وصلى طوال الليل. عند الفجر، تدفقت المياه من هذا المكان، مكونة ينبوعًا لم يجف أبدًا.
          
          يقال إن ماء هذه البئر له خصائص شفائية وأن أي شخص يشرب بقلب نقي سيرى أمنياته تتحقق. 
          ومع ذلك، فإن أولئك الذين يقتربون بنوايا سيئة سيرون الماء يتراجع إلى أعماق الرمال.
          
          تعلم هذه الأسطورة أهمية نقاء النية والإيمان واحترام الموارد الطبيعية في الثقافة الصحراوية.`}
              </p>
            </div>

            {/* Second Myth - Bent El Ban */}
            <div className="border-l-4 border-sahara-terracotta pl-4 py-2 mb-6">
              <h4 className="text-xl font-medium mb-2">
                {language === 'en' ? "The Tale of Bent El Ban" :
                  language === 'fr' ? "Le Conte de Bent El Ban" :
                    "حكاية بنت البان"}
              </h4>
              <p className="whitespace-pre-line">
                {language === 'en' ?
                  `One of the most famous stories in Hassani literature is the tale of "Bent El Ban", which tells of an exceptionally beautiful girl named Bent El Ban who lives with her tribe in the desert, known for her gentleness and noble character. Many suitors come to ask for her hand, but her father sets a condition that anyone who wishes to marry her must pass difficult and harsh tests to prove his courage and endurance. Storytellers speak of a young man who overcame all obstacles and challenges to win Bent El Ban's heart, making the tale a symbol of courage, sacrifice, and patience in Sahrawi culture.`
                  : language === 'fr' ?
                    `L'une des histoires les plus célèbres de la littérature hassanie est le conte de "Bent El Ban", qui raconte l'histoire d'une jeune fille d'une beauté exceptionnelle nommée Bent El Ban, vivant avec sa tribu dans le désert, connue pour sa douceur et son caractère noble. De nombreux prétendants viennent demander sa main, mais son père impose comme condition que quiconque souhaite l'épouser doit réussir des épreuves difficiles et rudes prouvant son courage et son endurance. Les conteurs parlent d'un jeune homme qui surmonta tous les obstacles et défis pour gagner le cœur de Bent El Ban, faisant de ce conte un symbole de courage, de sacrifice et de patience dans la culture sahraouie.`
                    :
                    `من أشهر القصص في الأدب الحساني قصة "بنت البان"، وهي قصة تدور حول فتاة فائقة الجمال تدعى "بنت البان"، تعيش مع قبيلتها في الصحراء، وتتميز برقتها وأخلاقها العالية. يتقدم العديد من الشبان لخطبتها، إلا أن والدها يشترط على من يريد الزواج بها أن يجتاز اختبارات شاقة وقاسية تثبت شجاعته وقوة تحمله. يتحدث الرواة عن شاب تحدى الصعاب وتغلب على العقبات للفوز بقلب "بنت البان"، لتصبح الحكاية رمزًا للشجاعة والتضحية والصبر في الثقافة الصحراوية.`}
              </p>
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
              {/* آغيمور (Agimor) */}
              <AccordionItem value="agimor">
                <AccordionTrigger>
                  آغيمور ({language === 'en' ? "Agimor" : language === 'fr' ? "Agimor" : "آغيمور"})
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Agimor is a popular traditional game practiced in the Sahrawi culture using sticks. The game begins by digging a small hole in the sand, and two players defend it with their sticks while two others attempt to throw a ball over their heads and into the hole. The defenders must use their sticks either to strike the ball and send it flying away from the hole or block the hole with their sticks to prevent the ball from falling into it. The opposing team attempts to take advantage of the defenders' momentary distraction to get the ball into the hole. If successful, the defending player is replaced, and the game continues. The game requires both agility and teamwork and is often enjoyed during social gatherings."
                    : language === 'fr'
                      ? "Le jeu Agimor est un jeu traditionnel populaire pratiqué dans la culture sahraouie avec des bâtons. Le jeu commence par la création d'un petit trou dans le sable, et deux joueurs en défendent l'accès avec leurs bâtons tandis que deux autres tentent de lancer une balle par-dessus leurs têtes et de la faire tomber dans le trou. Les défenseurs doivent utiliser leurs bâtons pour soit frapper la balle et l'éloigner du trou, soit bloquer le trou avec leurs bâtons pour éviter que la balle y tombe. L'équipe adverse tente de profiter de la distraction des défenseurs pour envoyer la balle dans le trou. Si un joueur réussit, il prend la place de celui qui a échoué, et le jeu continue. Ce jeu requiert de l'agilité et un bon esprit d'équipe, et il est souvent pratiqué lors des rassemblements sociaux."
                      : "آغيمور هو لعبة تقليدية شعبية تمارس في الثقافة الصحراوية باستخدام العصي. يبدأ اللعب بحفر حفرة صغيرة في الرمال، ويتولى لاعبان الدفاع عنها بعصويهما بينما يحاول آخران رمي كرة فوق رؤوسهم وإسقاطها في الحفرة. يجب على المدافعين استخدام عصيهم إما لضرب الكرة وإبعادها عن الحفرة أو لسد الحفرة بالعصويين لمنع الكرة من السقوط فيها. يحاول الفريق المنافس الاستفادة من لحظة غفلة المدافعين لإدخال الكرة في الحفرة. إذا نجح أحدهم في ذلك، يحل مكان المدافع، ويستمر اللعب. يتطلب هذا اللعبة المهارة والعمل الجماعي وغالبًا ما تُمارس خلال التجمعات الاجتماعية."}
                </AccordionContent>
              </AccordionItem>

              {/* كْبِيبَة (Kbeeba) */}
              <AccordionItem value="kbeeba">
                <AccordionTrigger>
                  كْبِيبَة ({language === 'en' ? "Kbeeba" : language === 'fr' ? "Kbeeba" : "كْبِيبَة"})
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Kbeeba is a traditional youth game often played in groups of more than twenty players per team. Before starting, a lottery is held to decide which team will carry the other team's players on their backs. Once the teams are chosen, the players who are selected must carry the others and exchange the ball (called 'kabe') while maintaining a specific distance. The opposing team must avoid moving them intentionally. When the ball (kabe) falls, the carriers must get off and start running, while the opposing team tries to catch them. If the ball touches any of the players, they are replaced, and the game continues. Kbeeba is often practiced by the youth and children to develop their skills in riding horses and camels, and it involves a lot of concentration and repeated chases."
                    : language === 'fr'
                      ? "Kbeeba est un jeu traditionnel pour les jeunes, souvent joué par des groupes de plus de vingt joueurs par équipe. Avant de commencer, un tirage au sort est effectué pour décider quelle équipe portera les joueurs de l'autre équipe sur leurs dos. Une fois les équipes formées, les joueurs choisis doivent porter les autres et échanger la balle (appelée 'kabe') tout en maintenant une certaine distance. L'équipe adverse doit éviter de les déplacer intentionnellement. Lorsque la balle (kabe) tombe, les porteurs doivent descendre et commencer à courir, tandis que l'équipe adverse essaie de les attraper. Si la balle touche l'un des joueurs, il est remplacé et le jeu continue. Kbeeba est souvent pratiqué par les jeunes et les enfants pour développer leurs compétences en équitation et en conduite de chameaux, et il nécessite beaucoup de concentration et de courses répétées."
                      : "كْبِيبَة هي لعبة تقليدية للشباب غالبًا ما تُلعب في مجموعات تضم أكثر من عشرين لاعبًا لكل فريق. قبل البدء، يتم إجراء قرعة لتحديد الفريق الذي سيحمل لاعبي الفريق الآخر على ظهورهم. بعد تشكيل الفرق، يجب على اللاعبين الذين تم اختيارهم حمل الآخرين وتبادل الكرة (المعروفة بـ 'الكبّة') مع الحفاظ على مسافة معينة. يجب على الفريق المنافس تجنب تحريكهم عمدًا. عندما تسقط الكرة (الكبّة)، يجب على الحاملين النزول وبدء الجري، بينما يحاول الفريق المنافس مطاردتهم. إذا لمست الكرة أي لاعب، يتم استبداله ويستمر اللعب. تمارس لعبة كبيبة غالبًا من قبل الشباب والأطفال لتطوير مهاراتهم في ركوب الخيل والإبل، وتتطلب الكثير من التركيز والمطاردات المتكررة."}
                </AccordionContent>
              </AccordionItem>

              {/* السِّيك (Sik) */}
              <AccordionItem value="sik">
                <AccordionTrigger>
                  السِّيك ({language === 'en' ? "Sik" : language === 'fr' ? "Sik" : "السِّيك"})
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Sik is a traditional game widely practiced by the Sahrawis after breaking their fast. The game uses eight specially crafted wooden sticks. Two competing teams use sticks and dung to move them on a marked playing field. The game begins with one of the teams, consisting of one to six players, trying to throw seven sticks onto a designated area. The player cannot use the full set of sticks until he completes a successful throw that reveals all sticks in a single position, allowing him to move between pits on the field and score points. The game relies on tactical thinking and is often a fun post-meal activity."
                    : language === 'fr'
                      ? "Le Sik est un jeu traditionnel largement pratiqué par les Sahraouis après le repas de rupture du jeûne. Le jeu utilise huit bâtons spécialement fabriqués. Deux équipes concurrentes utilisent des bâtons et du fumier pour les déplacer sur un terrain de jeu marqué. Le jeu commence avec l'une des équipes, composée de un à six joueurs, qui tente de lancer sept bâtons sur une zone désignée. Le joueur ne peut pas utiliser l'ensemble complet des bâtons avant d'avoir effectué un lancer réussi qui montre tous les bâtons dans une seule position, lui permettant de se déplacer entre les fosses sur le terrain et de marquer des points. Le jeu repose sur une réflexion tactique et est souvent une activité amusante après le repas."
                      : "السِّيك هو لعبة تقليدية تُمارس على نطاق واسع من قبل الصحراويين بعد الإفطار. يستخدم اللعبة ثمانية عصي خشبية مصنوعة خصيصًا. يتنافس فريقان باستخدام العصي والبعير لتحريكهم في ميدان محدد. يبدأ اللعب بأحد الفريقين، المكون من لاعب واحد إلى ستة لاعبين، الذي يحاول رمي سبعة أعواد على منطقة معينة. لا يمكن للاعب استخدام كامل الأعواد إلا بعد أن ينفذ رمية ناجحة يظهر فيها كل الأعواد في وضع واحد، مما يسمح له بالتحرك بين الحفر على الأرض وتسجيل النقاط. تعتمد اللعبة على التفكير التكتيكي وغالبًا ما تكون نشاطًا ممتعًا بعد الطعام."}
                </AccordionContent>
              </AccordionItem>

              {/* أَردُوخْ (Ardukh) */}
              <AccordionItem value="ardoukh">
                <AccordionTrigger>
                  أَردُوخْ ({language === 'en' ? "Ardukh" : language === 'fr' ? "Ardukh" : "أَردُوخْ"})
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Ardukh is a physical wrestling-like game where two players engage in a contest of strength and skill. The game starts with one player challenging the other by saying 'I’ll enter you, or you enter me.' The players then engage in a struggle involving hands, arms, and pushing, aiming to bring the opponent to the ground. The winner is the one who successfully knocks the other down. This game can last for a long time or be short, depending on the competition and the physical strength of the players."
                    : language === 'fr'
                      ? "Ardukh est un jeu physique similaire à la lutte où deux joueurs s'affrontent dans un concours de force et de compétences. Le jeu commence par un joueur défiant l'autre en disant 'Je t'entre ou tu m'entres.' Les joueurs s'engagent ensuite dans une lutte impliquant les mains, les bras et les poussées, visant à amener l'adversaire au sol. Le gagnant est celui qui réussit à renverser l'autre. Ce jeu peut durer longtemps ou être court, selon la compétition et la force physique des joueurs."
                      : "أَردُوخْ هو لعبة عضلية مشابهة للمصارعة حيث يتنافس لاعبان في مسابقة قوة ومهارات. يبدأ اللعب بتحدي أحد اللاعبين للآخر قائلاً 'أدخلني أو أدخلك.' ثم يبدأ اللاعبان في التنافس باستخدام اليدين والأذرع والدفع، بهدف إسقاط الخصم إلى الأرض. الفائز هو الذي ينجح في إسقاط الآخر. قد يستمر هذا اللعب لفترة طويلة أو قصيرة حسب مستوى التنافس والقوة البدنية للمتنافسين."}
                </AccordionContent>
              </AccordionItem>

              {/* أَراحْ (Arah) */}
              <AccordionItem value="arah">
                <AccordionTrigger>
                  أَراحْ ({language === 'en' ? "Arah" : language === 'fr' ? "Arah" : "أَراحْ"})
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Arah is a men's game that involves strength and endurance. One player defends a target in the center of a circle, and attackers try to hit the target. If successful, the attacker takes the defender's place. This game emphasizes the physical abilities of the participants, focusing on endurance and strategy."
                    : language === 'fr'
                      ? "Arah est un jeu masculin qui implique la force et l'endurance. Un joueur défend un objectif au centre d'un cercle, et les attaquants essaient de toucher l'objectif. Si réussi, l'attaquant prend la place du défenseur. Ce jeu met l'accent sur les capacités physiques des participants, en se concentrant sur l'endurance et la stratégie."
                      : "أَراحْ هو لعبة رجالية تشمل القوة والقدرة على التحمل. يتولى أحد اللاعبين الدفاع عن الهدف في وسط الدائرة، ويحاول المهاجمون ضرب الهدف. إذا نجحوا، يحل المهاجم محل المدافع. هذا اللعبة تركز على القدرات البدنية للمشاركين، مع التركيز على التحمل والاستراتيجية."}
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
