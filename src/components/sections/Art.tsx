
import { useState, useRef, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const culturalElements = [
  {
    name: "Poésie",
    nameEn: "Poetry",
    nameAr: "الشعر",
    description: "La poésie sahraouie, caractérisée par son rythme et sa mélodie, transmet l'identité et l'histoire du peuple. Elle aborde des thèmes comme l'amour, la bravoure et la nature.",
    descriptionEn: "Sahrawi poetry, characterized by its rhythm and melody, conveys the identity and history of the people. It addresses themes like love, bravery, and nature.",
    descriptionAr: "يتميز الشعر الصحراوي بإيقاعه ولحنه، وينقل هوية وتاريخ الشعب. يتناول مواضيع مثل الحب والشجاعة والطبيعة.",
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=2670&auto=format&fit=crop",
    connections: ["Proverbes", "Mythes et Contes"]
  },
  {
    name: "Proverbes",
    nameEn: "Proverbs",
    nameAr: "الأمثال",
    description: "Les proverbes hassanis reflètent la sagesse populaire, transmettant des leçons de vie et des valeurs morales à travers des expressions concises et imagées.",
    descriptionEn: "Hassani proverbs reflect popular wisdom, conveying life lessons and moral values through concise and vivid expressions.",
    descriptionAr: "تعكس الأمثال الحسانية الحكمة الشعبية، وتنقل دروس الحياة والقيم الأخلاقية من خلال تعبيرات موجزة وحية.",
    image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=2670&auto=format&fit=crop",
    connections: ["Poésie", "Croyances"]
  },
  {
    name: "Mythes et Contes",
    nameEn: "Myths and Tales",
    nameAr: "الأساطير والحكايات",
    description: "Les récits oraux transmis de génération en génération expliquent les phénomènes naturels, enseignent des valeurs et divertissent lors des rassemblements.",
    descriptionEn: "Oral stories passed down through generations explain natural phenomena, teach values, and entertain during gatherings.",
    descriptionAr: "القصص الشفوية المتناقلة عبر الأجيال تشرح الظواهر الطبيعية وتعلم القيم وتسلي خلال التجمعات.",
    image: "https://images.unsplash.com/photo-1598811629267-faffa0027fe3?q=80&w=2670&auto=format&fit=crop",
    connections: ["Poésie", "Jeux Populaires", "Croyances"]
  },
  {
    name: "Jeux Populaires",
    nameEn: "Popular Games",
    nameAr: "الألعاب الشعبية",
    description: "Les jeux traditionnels sahraouis, souvent pratiqués lors de fêtes et cérémonies, renforcent les liens sociaux et transmettent des compétences essentielles.",
    descriptionEn: "Traditional Sahrawi games, often played during festivals and ceremonies, strengthen social bonds and transmit essential skills.",
    descriptionAr: "الألعاب التقليدية الصحراوية، التي غالبًا ما تُمارس خلال الأعياد والمناسبات، تعزز الروابط الاجتماعية وتنقل المهارات الأساسية.",
    image: "https://images.unsplash.com/photo-1560913478-7d557a840c0e?q=80&w=2670&auto=format&fit=crop",
    connections: ["Mythes et Contes"]
  },
  {
    name: "Croyances",
    nameEn: "Beliefs",
    nameAr: "المعتقدات",
    description: "Les croyances sahraouies mêlent traditions islamiques et pratiques préislamiques, incluant des rituels liés aux événements de la vie et aux phénomènes naturels.",
    descriptionEn: "Sahrawi beliefs blend Islamic traditions and pre-Islamic practices, including rituals related to life events and natural phenomena.",
    descriptionAr: "تمزج المعتقدات الصحراوية بين التقاليد الإسلامية والممارسات ما قبل الإسلام، بما في ذلك الطقوس المتعلقة بأحداث الحياة والظواهر الطبيعية.",
    image: "https://images.unsplash.com/photo-1598110461315-db3a16dbc9bf?q=80&w=2670&auto=format&fit=crop",
    connections: ["Proverbes", "Mythes et Contes"]
  }
];

const proverbs = [
  {
    text: "La langue est un chameau : elle nous porte vers l'avant ou nous fait tomber.",
    translation: "The tongue is a camel: it carries us forward or makes us fall.",
    meaning: "Les paroles ont un pouvoir immense, elles peuvent nous aider ou nous nuire."
  },
  {
    text: "Le désert enseigne la patience à ceux qui l'écoutent.",
    translation: "The desert teaches patience to those who listen to it.",
    meaning: "Les épreuves nous apprennent la persévérance et la résilience."
  },
  {
    text: "La parole est d'argent, mais le silence du désert est d'or.",
    translation: "Speech is silver, but the silence of the desert is gold.",
    meaning: "Parfois, le silence est plus sage que la parole."
  }
];

const Art = () => {
  const [activeElement, setActiveElement] = useState(0);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const connectionsRef = useRef<SVGSVGElement>(null);
  const { language } = useLanguage();

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

  const getElementDescription = (index: number) => {
    const element = culturalElements[index];
    if (language === 'en') return element.descriptionEn;
    if (language === 'ar') return element.descriptionAr;
    return element.description;
  };

  const getElementName = (name: string) => {
    const element = culturalElements.find(el => el.name === name);
    if (!element) return name;
    if (language === 'en') return element.nameEn;
    if (language === 'ar') return element.nameAr;
    return element.name;
  };

  const getTranslatedTitle = () => {
    if (language === 'en') return "Intangible Cultural Heritage";
    if (language === 'ar') return "التراث الثقافي غير المادي";
    return "Patrimoine Culturel Immatériel";
  };

  const getTranslatedSubtitle = () => {
    if (language === 'en') return "Discover the rich oral and intangible traditions of the Hassani culture";
    if (language === 'ar') return "اكتشف التقاليد الشفوية وغير المادية الغنية للثقافة الحسانية";
    return "Découvrez les riches traditions orales et immatérielles de la culture hassanie";
  };

  return (
    <section id="art" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title={getTranslatedTitle()}
        subtitle={getTranslatedSubtitle()}
        className="reveal-on-scroll"
      />

      <div className="mt-16 grid grid-cols-1 gap-12">
        {/* Network Visualization */}
        <div className="reveal-on-scroll bg-white/70 dark:bg-sahara-brown/10 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-sahara-brown mb-6 text-center">
            {language === 'en' ? "Cultural Elements Network" : 
             language === 'ar' ? "شبكة العناصر الثقافية" : 
             "Réseau des Éléments Culturels"}
          </h3>
          
          <div className="relative h-[350px] mb-8">
            <svg ref={connectionsRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {culturalElements.map((element, index) => (
                element.connections.map((connection) => {
                  const targetIndex = culturalElements.findIndex(e => e.name === connection);
                  if (targetIndex !== -1) {
                    // Calculate coordinates based on element positions in the displayed grid
                    const sourceX = (index % 3) * 33.33 + 16.67;
                    const sourceY = Math.floor(index / 3) * 50 + 25;
                    const targetX = (targetIndex % 3) * 33.33 + 16.67;
                    const targetY = Math.floor(targetIndex / 3) * 50 + 25;
                    
                    const isHighlighted = 
                      activeElement === index || 
                      activeElement === targetIndex || 
                      hoveredConnection === connection || 
                      hoveredConnection === element.name;

                    return (
                      <line 
                        key={`${element.name}-${connection}`}
                        x1={`${sourceX}%`}
                        y1={`${sourceY}%`}
                        x2={`${targetX}%`}
                        y2={`${targetY}%`}
                        stroke={isHighlighted ? "#F97316" : "#E5E7EB"}
                        strokeWidth={isHighlighted ? "3" : "2"}
                        strokeDasharray={isHighlighted ? "none" : "5,5"}
                        className="transition-all duration-300"
                      />
                    );
                  }
                  return null;
                })
              ))}
            </svg>
            
            <div className="grid grid-cols-3 gap-6 relative" style={{ zIndex: 2 }}>
              {culturalElements.map((element, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-md transition-all duration-300 relative",
                    activeElement === index 
                      ? "bg-sahara-orange text-white shadow-lg transform scale-105" 
                      : "bg-sahara-sand/20 hover:bg-sahara-sand/30 text-foreground"
                  )}
                  onClick={() => setActiveElement(index)}
                  onMouseEnter={() => setHoveredConnection(element.name)}
                  onMouseLeave={() => setHoveredConnection(null)}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <img 
                      src={element.image} 
                      alt={element.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className={cn(
                    "text-lg font-semibold",
                    activeElement === index ? "text-white" : "text-sahara-terracotta"
                  )}>
                    {language === 'en' ? element.nameEn : 
                     language === 'ar' ? element.nameAr : 
                     element.name}
                  </h4>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-sahara-sand/10 to-sahara-orange/10 p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-sahara-terracotta mb-3">
              {language === 'en' ? culturalElements[activeElement].nameEn : 
               language === 'ar' ? culturalElements[activeElement].nameAr : 
               culturalElements[activeElement].name}
            </h4>
            <p className="mb-4">{getElementDescription(activeElement)}</p>
            
            {culturalElements[activeElement].connections.length > 0 && (
              <div>
                <h5 className="font-medium text-sahara-brown mb-2">
                  {language === 'en' ? "Connections:" : 
                   language === 'ar' ? "الروابط:" : 
                   "Connexions:"}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {culturalElements[activeElement].connections.map((conn, i) => (
                    <button
                      key={i}
                      className="px-3 py-1 bg-white/70 dark:bg-sahara-brown/20 rounded-full hover:bg-sahara-orange/20 transition-colors"
                      onClick={() => setActiveElement(culturalElements.findIndex(e => e.name === conn))}
                      onMouseEnter={() => setHoveredConnection(conn)}
                      onMouseLeave={() => setHoveredConnection(null)}
                    >
                      {getElementName(conn)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Proverbs Section */}
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-6">
            {language === 'en' ? "Hassani Proverbs" : 
             language === 'ar' ? "الأمثال الحسانية" : 
             "Proverbes Hassanis"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {proverbs.map((proverb, index) => (
              <div 
                key={index} 
                className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6 shadow-sm border-l-4 border-sahara-orange"
              >
                <p className="italic mb-2 text-lg">"{proverb.text}"</p>
                <p className="text-sm text-muted-foreground mb-4">{proverb.translation}</p>
                <div className="flex items-center text-sahara-terracotta">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  <p className="text-sm">{proverb.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Myths and Tales Example */}
        <div className="reveal-on-scroll bg-gradient-to-r from-sahara-terracotta/10 to-sahara-brown/10 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">
            {language === 'en' ? "Mythical Tale: The Origin of the Desert Rose" : 
             language === 'ar' ? "حكاية أسطورية: أصل وردة الصحراء" : 
             "Conte Mythique : L'origine de la Rose des Sables"}
          </h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <p className="mb-3">
                {language === 'en' 
                  ? "According to an ancient Hassani tale, the desert rose was born from the tears of a nomad princess who lost her way in a sandstorm." 
                  : language === 'ar'
                  ? "وفقًا لقصة حسانية قديمة، ولدت وردة الصحراء من دموع أميرة بدوية ضاعت طريقها في عاصفة رملية."
                  : "Selon un ancien conte hassani, la rose des sables est née des larmes d'une princesse nomade qui s'est perdue dans une tempête de sable."}
              </p>
              <p>
                {language === 'en'
                  ? "As her tears fell on the sand, they crystallized into beautiful formations. The desert spirits, moved by her courage, guided her back to her people, while leaving these 'roses' as markers of her journey."
                  : language === 'ar'
                  ? "عندما سقطت دموعها على الرمال، تبلورت إلى تكوينات جميلة. قامت أرواح الصحراء، متأثرة بشجاعتها، بإرشادها إلى شعبها، تاركة هذه 'الورود' كعلامات على رحلتها."
                  : "Lorsque ses larmes sont tombées sur le sable, elles se sont cristallisées en de magnifiques formations. Les esprits du désert, émus par son courage, l'ont guidée vers son peuple, tout en laissant ces 'roses' comme traces de son voyage."}
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="aspect-square rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1608041172901-cb98e7e33df8?q=80&w=2574&auto=format&fit=crop"
                  alt="Rose des sables"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Art;
