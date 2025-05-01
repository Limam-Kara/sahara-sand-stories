
import { useState, useRef, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Book, MessageSquare, Users, Gamepad } from "lucide-react";

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
];

// Cultural elements nodes for the network visualization
const culturalElements = [
  {
    id: "poetry",
    name: "Poésie",
    icon: Book,
    color: "bg-sahara-orange",
    description: "La poésie hassanie est une expression artistique qui véhicule l'identité, l'histoire et les valeurs du peuple sahraoui. Les poèmes, souvent récités lors de rassemblements, abordent des thèmes comme l'amour, la bravoure, le désert et l'honneur.",
    connections: ["proverbs", "myths"]
  },
  {
    id: "proverbs",
    name: "Proverbes",
    icon: MessageSquare,
    color: "bg-sahara-brown",
    description: "Les proverbes hassanis sont des expressions de sagesse populaire transmises de génération en génération. Ils reflètent les valeurs morales, les normes sociales et l'expérience collective du peuple sahraoui dans son environnement désertique.",
    connections: ["poetry", "beliefs", "games"]
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
  const [selectedElement, setSelectedElement] = useState(culturalElements[0].id);
  const [activeProverb, setActiveProverb] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Get connections for visualization
  const getConnections = () => {
    const connections: { source: string; target: string }[] = [];
    culturalElements.forEach(element => {
      element.connections.forEach(targetId => {
        connections.push({
          source: element.id,
          target: targetId
        });
      });
    });
    return connections;
  };

  return (
    <section id="art" ref={sectionRef} className="section-container">
      <SectionTitle
        title="Patrimoine Culturel Immatériel"
        subtitle="Explorez les éléments culturels non matériels qui définissent l'identité hassanie"
        className="reveal-on-scroll"
      />

      {/* Network Visualization */}
      <div className="mt-12 bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6 shadow-md reveal-on-scroll">
        <h3 className="text-2xl font-bold text-center text-sahara-brown mb-6">
          Réseau des Éléments Culturels Hassanis
        </h3>
        <p className="text-lg text-center mb-8">
          Les éléments suivants constituent l'héritage culturel immatériel du peuple sahraoui et s'influencent mutuellement.
        </p>
        
        <div className="flex flex-wrap justify-center mb-6">
          {culturalElements.map((element) => (
            <button
              key={element.id}
              onClick={() => setSelectedElement(element.id)}
              className={cn(
                "flex items-center m-2 p-3 rounded-lg shadow-sm transition-all",
                selectedElement === element.id
                  ? `${element.color} text-white`
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <element.icon className="mr-2 h-5 w-5" />
              <span className="font-medium">{element.name}</span>
            </button>
          ))}
        </div>

        {/* Network Visualization - Simple Version */}
        <div className="relative w-full h-60 md:h-80 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Center Element */}
            {culturalElements.map((element) => (
              element.id === selectedElement && (
                <div 
                  key={`node-${element.id}`}
                  className={`${element.color} text-white p-4 rounded-full z-20 shadow-lg flex items-center justify-center w-24 h-24 md:w-32 md:h-32 transition-all duration-500`}
                >
                  <div className="text-center">
                    <element.icon className="mx-auto h-8 w-8 mb-1" />
                    <span className="font-bold">{element.name}</span>
                  </div>
                </div>
              )
            ))}
            
            {/* Connected Elements */}
            {culturalElements.find(e => e.id === selectedElement)?.connections.map((connectionId, idx) => {
              const connectedElement = culturalElements.find(e => e.id === connectionId);
              if (!connectedElement) return null;
              
              // Calculate position in a circle around the center
              const angle = (2 * Math.PI * idx) / culturalElements.find(e => e.id === selectedElement)!.connections.length;
              const radius = 100; // distance from center
              const xPos = Math.cos(angle) * radius;
              const yPos = Math.sin(angle) * radius;
              
              return (
                <div key={`connection-${connectionId}`}>
                  {/* Line connecting elements */}
                  <div 
                    className="absolute h-0.5 bg-gray-300 origin-left transform transition-all duration-500" 
                    style={{
                      width: `${radius}px`,
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}rad) translateY(-50%)`
                    }}
                  />
                  
                  {/* Connected element node */}
                  <div 
                    className={`${connectedElement.color} text-white absolute p-2 rounded-full shadow-md flex items-center justify-center w-16 h-16 transition-all duration-500`}
                    style={{
                      left: `calc(50% + ${xPos}px)`,
                      top: `calc(50% + ${yPos}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedElement(connectionId)}
                  >
                    <div className="text-center">
                      <connectedElement.icon className="mx-auto h-5 w-5" />
                      <span className="text-xs font-medium">{connectedElement.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Element Description */}
        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
          {culturalElements.map((element) => (
            element.id === selectedElement && (
              <div key={`desc-${element.id}`} className="reveal-on-scroll">
                <h4 className={`text-xl font-semibold ${element.id === 'poetry' ? 'text-sahara-orange' : 
                  element.id === 'proverbs' ? 'text-sahara-brown' : 
                  element.id === 'myths' ? 'text-sahara-terracotta' : 
                  element.id === 'games' ? 'text-blue-500' : 'text-green-600'}`}>
                  {element.name}
                </h4>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{element.description}</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Content Sections - Tabs for each cultural element */}
      <div className="mt-12 reveal-on-scroll">
        <Tabs defaultValue="proverbs" className="w-full">
          <TabsList className="w-full flex mb-6 bg-white/70 dark:bg-sahara-brown/10 overflow-x-auto">
            {culturalElements.map((element) => (
              <TabsTrigger 
                key={`tab-${element.id}`}
                value={element.id}
                className="flex-1 min-w-max"
              >
                <element.icon className="mr-2 h-5 w-5" />
                {element.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Proverbs Content */}
          <TabsContent value="proverbs" className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
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
                {proverbs.map((proverb, index) => (
                  <TableRow key={`proverb-${index}`}>
                    <TableCell className="font-medium">{proverb.original}</TableCell>
                    <TableCell>{proverb.translation}</TableCell>
                    <TableCell>{proverb.meaning}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Poetry Content */}
          <TabsContent value="poetry" className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
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
          </TabsContent>

          {/* Myths and Tales Content */}
          <TabsContent value="myths" className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
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
          </TabsContent>

          {/* Games Content */}
          <TabsContent value="games" className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-500 mb-4">Jeux Populaires</h3>
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
          </TabsContent>

          {/* Beliefs Content */}
          <TabsContent value="beliefs" className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Croyances</h3>
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Art;
