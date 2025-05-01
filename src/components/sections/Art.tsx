
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

// Sample proverbs data (in a real application, this would come from an admin panel)
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

// Tale example
const mythicalTale = {
  title: "La Légende du Puits de Tiris",
  content: `Dans les vastes étendues du désert sahraoui, il existe un puits ancien connu sous le nom de Puits de Tiris. 
  Selon la légende, ce puits fut créé par un saint homme qui, voyant la souffrance de son peuple durant une longue sécheresse, 
  planta son bâton dans le sable et pria toute la nuit. À l'aube, l'eau jaillit de cet endroit, créant une source qui ne s'est jamais tarie.
  
  On dit que l'eau de ce puits possède des propriétés curatives et que quiconque boit avec un cœur pur verra ses souhaits exaucés. 
  Cependant, ceux qui s'approchent avec de mauvaises intentions verront l'eau se retirer dans les profondeurs du sable.
  
  Cette légende enseigne l'importance de la pureté d'intention, de la foi et du respect des ressources naturelles dans la culture sahraouie.`
};

const Art = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const proverbsPerPage = 5;
  const totalPages = Math.ceil(proverbs.length / proverbsPerPage);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("proverbs");

  // Calculate the proverbs to display on the current page
  const indexOfLastProverb = currentPage * proverbsPerPage;
  const indexOfFirstProverb = indexOfLastProverb - proverbsPerPage;
  const currentProverbs = proverbs.slice(indexOfFirstProverb, indexOfLastProverb);

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
    { id: "proverbs", name: "Proverbes", icon: MessageSquare },
    { id: "poetry", name: "Poésie", icon: Book },
    { id: "myths", name: "Mythes et Contes", icon: Book },
    { id: "games", name: "Jeux Populaires", icon: Gamepad },
    { id: "beliefs", name: "Croyances", icon: Users },
  ];

  return (
    <section id="art" ref={sectionRef} className="section-container">
      <SectionTitle
        title="Patrimoine Culturel Immatériel"
        subtitle="Explorez les éléments culturels non matériels qui définissent l'identité hassanie"
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

        {/* Proverbs Content */}
        {activeTab === "proverbs" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-brown mb-4">Proverbes Hassanis</h3>
            <p className="mb-6">
              Les proverbes hassanis reflètent la sagesse populaire et l'expérience collective du peuple sahraoui. 
              Ils sont utilisés dans la conversation quotidienne pour illustrer des idées, donner des conseils ou enseigner des valeurs.
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proverbe original</TableHead>
                  <TableHead>Traduction</TableHead>
                  <TableHead>Signification</TableHead>
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
            <h3 className="text-2xl font-bold text-sahara-orange mb-4">Poésie Hassanie</h3>
            <p className="mb-6">
              La poésie occupe une place centrale dans la culture hassanie. Les poèmes sont récités lors des rassemblements sociaux, 
              des cérémonies et des fêtes. Ils abordent des thèmes variés tels que l'amour, l'héroïsme, la nature désertique et l'identité culturelle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Types de poésie</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tebraa - poésie amoureuse</li>
                  <li>Fagru - poésie de louange</li>
                  <li>Lghna - poésie chantée</li>
                  <li>Thaydin - poésie de guerre</li>
                </ul>
              </div>
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Thèmes principaux</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>L'amour et la beauté</li>
                  <li>Le courage et l'honneur</li>
                  <li>La nature du désert</li>
                  <li>L'histoire et l'identité</li>
                  <li>La spiritualité</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Myths and Tales Content */}
        {activeTab === "myths" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-terracotta mb-4">Mythes et Contes</h3>
            <p className="mb-6">
              Les mythes et contes hassanis sont des récits oraux transmis de génération en génération. 
              Ils servent à expliquer les phénomènes naturels, transmettre des leçons morales et divertir.
            </p>
            
            <div className="border-l-4 border-sahara-terracotta pl-4 py-2 mb-6">
              <h4 className="text-xl font-medium mb-2">{mythicalTale.title}</h4>
              <p className="whitespace-pre-line">{mythicalTale.content}</p>
            </div>
            
            <div className="bg-sahara-sand/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Rôle des contes dans la société hassanie</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enseigner des valeurs morales</li>
                <li>Préserver l'histoire et l'identité culturelle</li>
                <li>Divertir et rassembler la communauté</li>
                <li>Expliquer les phénomènes naturels et sociaux</li>
              </ul>
            </div>
          </div>
        )}

        {/* Games Content */}
        {activeTab === "games" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-brown mb-4">Jeux Populaires</h3>
            <p className="mb-6">
              Les jeux traditionnels hassanis sont plus que de simples divertissements ; ils favorisent la cohésion sociale, 
              développent des compétences et transmettent des valeurs culturelles aux jeunes générations.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="siggan">
                <AccordionTrigger>Siggan (Jeu des cinq pierres)</AccordionTrigger>
                <AccordionContent>
                  Ce jeu d'adresse consiste à lancer et à attraper de petites pierres dans différentes configurations. 
                  Il développe la coordination œil-main et la concentration, tout en étant une activité sociale populaire parmi les enfants.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="damah">
                <AccordionTrigger>Damah (Jeu de plateau)</AccordionTrigger>
                <AccordionContent>
                  Similaire aux dames mais avec des règles spécifiques, ce jeu de stratégie est populaire parmi les hommes. 
                  Il développe la pensée stratégique et constitue un passe-temps social important.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="kharbga">
                <AccordionTrigger>Kharbga</AccordionTrigger>
                <AccordionContent>
                  Un jeu de plateau traditionnel joué avec des pions sur un tableau dessiné dans le sable. 
                  Ce jeu de stratégie développe la réflexion tactique et est souvent joué lors des rassemblements sociaux.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Beliefs Content */}
        {activeTab === "beliefs" && (
          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-sahara-brown mb-4">Croyances</h3>
            <p className="mb-6">
              Les croyances hassanies sont un mélange unique de traditions islamiques et de pratiques culturelles préislamiques. 
              Elles influencent tous les aspects de la vie quotidienne, des rituels de naissance aux cérémonies funéraires.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Pratiques spirituelles</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Rituels de protection contre le mauvais œil</li>
                  <li>Célébrations liées aux cycles lunaires</li>
                  <li>Traditions de guérison par les plantes</li>
                  <li>Interprétation des rêves</li>
                </ul>
              </div>
              <div className="bg-sahara-sand/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Moments de vie</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Rituels de naissance</li>
                  <li>Cérémonies de mariage</li>
                  <li>Rites de passage à l'âge adulte</li>
                  <li>Traditions funéraires</li>
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
