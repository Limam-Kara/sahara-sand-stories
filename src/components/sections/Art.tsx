
import { useState, useRef, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

// Define the cultural elements
const culturalElements = [
  {
    id: "poetry",
    name: "Poésie",
    nameEn: "Poetry",
    nameAr: "الشعر",
    description: "Tradition orale transmettant l'histoire et les valeurs du peuple sahraoui à travers des poèmes rythmés.",
    descriptionEn: "Oral tradition transmitting the history and values of the Sahrawi people through rhythmic poems.",
    descriptionAr: "تقليد شفهي ينقل تاريخ وقيم الشعب الصحراوي من خلال القصائد الإيقاعية.",
    connections: ["proverbs", "myths", "beliefs"],
    size: 80,
    color: "#e9b872"
  },
  {
    id: "proverbs",
    name: "Proverbes",
    nameEn: "Proverbs",
    nameAr: "الأمثال",
    description: "Expressions de sagesse populaire reflétant l'expérience et le savoir du désert.",
    descriptionEn: "Expressions of popular wisdom reflecting desert experience and knowledge.",
    descriptionAr: "تعبيرات الحكمة الشعبية التي تعكس تجربة ومعرفة الصحراء.",
    connections: ["poetry", "beliefs"],
    size: 70,
    color: "#c17a41"
  },
  {
    id: "myths",
    name: "Mythes et Contes",
    nameEn: "Myths and Tales",
    nameAr: "الأساطير والحكايات",
    description: "Récits fantastiques expliquant les phénomènes naturels et transmettant des leçons morales.",
    descriptionEn: "Fantastic stories explaining natural phenomena and conveying moral lessons.",
    descriptionAr: "قصص خيالية تشرح الظواهر الطبيعية وتنقل الدروس الأخلاقية.",
    connections: ["poetry", "beliefs", "games"],
    size: 75,
    color: "#8c614b"
  },
  {
    id: "games",
    name: "Jeux Populaires",
    nameEn: "Popular Games",
    nameAr: "الألعاب الشعبية",
    description: "Divertissements traditionnels renforçant les liens sociaux et développant des compétences utiles.",
    descriptionEn: "Traditional entertainment strengthening social bonds and developing useful skills.",
    descriptionAr: "الترفيه التقليدي الذي يعزز الروابط الاجتماعية وينمي المهارات المفيدة.",
    connections: ["myths"],
    size: 65,
    color: "#d8a478"
  },
  {
    id: "beliefs",
    name: "Croyances",
    nameEn: "Beliefs",
    nameAr: "المعتقدات",
    description: "Systèmes de valeurs et pratiques spirituelles façonnant la vision du monde sahraouie.",
    descriptionEn: "Value systems and spiritual practices shaping the Sahrawi worldview.",
    descriptionAr: "أنظمة القيم والممارسات الروحية التي تشكل النظرة الصحراوية للعالم.",
    connections: ["poetry", "proverbs", "myths"],
    size: 85,
    color: "#9f6b44"
  }
];

// Data for the distribution chart
const distributionData = [
  { name: "Poésie", value: 30 },
  { name: "Proverbes", value: 20 },
  { name: "Mythes et Contes", value: 25 },
  { name: "Jeux Populaires", value: 10 },
  { name: "Croyances", value: 15 }
];

const COLORS = ["#e9b872", "#c17a41", "#8c614b", "#d8a478", "#9f6b44"];

// Transmission timeline data
const transmissionData = [
  { year: 1800, oral: 90, written: 10 },
  { year: 1900, oral: 80, written: 20 },
  { year: 1950, oral: 65, written: 35 },
  { year: 2000, oral: 40, written: 60 },
  { year: 2025, oral: 30, written: 70 }
];

const Art = () => {
  const [activeElement, setActiveElement] = useState(culturalElements[0]);
  const [networkPositions, setNetworkPositions] = useState<{[key: string]: {x: number, y: number}}>({});
  const networkRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  
  // Get translations based on current language
  const getElementProp = (element: typeof culturalElements[0], prop: 'name' | 'description') => {
    if (language === 'en') return element[`${prop}En`];
    if (language === 'ar') return element[`${prop}Ar`];
    return element[prop]; // Default to French
  };

  // Calculate network positions once the component mounts
  useEffect(() => {
    if (networkRef.current) {
      const width = networkRef.current.offsetWidth;
      const height = networkRef.current.offsetHeight;
      const center = { x: width / 2, y: height / 2 };
      const radius = Math.min(width, height) * 0.35;
      
      // Position elements in a circle
      const positions: {[key: string]: {x: number, y: number}} = {};
      culturalElements.forEach((element, index) => {
        const angle = (index / culturalElements.length) * 2 * Math.PI;
        positions[element.id] = {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        };
      });
      
      setNetworkPositions(positions);
    }
  }, [networkRef.current?.offsetWidth]);

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

  return (
    <section id="art" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title="Patrimoine Culturel Immatériel"
        subtitle="Exploration des éléments culturels non matériels de la culture hassanie"
        className="reveal-on-scroll"
      />

      <div className="mt-12 reveal-on-scroll">
        <div className="bg-white dark:bg-sahara-brown/5 rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-2xl font-bold text-sahara-brown mb-6 text-center">
            {language === 'en' ? 'Network of Hassani Cultural Elements' : 
             language === 'ar' ? 'شبكة العناصر الثقافية الحسانية' : 
             'Réseau des Éléments Culturels Hassani'}
          </h3>
          
          {/* Network Visualization */}
          <div 
            ref={networkRef}
            className="relative h-[500px] w-full border border-sahara-sand/20 rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-sahara-sand/5 to-sahara-terracotta/5"
          >
            {/* Draw connection lines first (so they appear behind nodes) */}
            {Object.keys(networkPositions).length > 0 && culturalElements.map(element => (
              element.connections.map((connectionId, idx) => (
                <svg 
                  key={`${element.id}-${connectionId}-${idx}`} 
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <line 
                    x1={networkPositions[element.id]?.x || 0}
                    y1={networkPositions[element.id]?.y || 0}
                    x2={networkPositions[connectionId]?.x || 0}
                    y2={networkPositions[connectionId]?.y || 0}
                    stroke={element.color}
                    strokeOpacity="0.6"
                    strokeWidth={element.id === activeElement.id || connectionId === activeElement.id ? 3 : 1.5}
                    strokeDasharray={element.id === activeElement.id || connectionId === activeElement.id ? "" : "5,5"}
                  />
                </svg>
              ))
            ))}
            
            {/* Draw nodes */}
            {Object.keys(networkPositions).length > 0 && culturalElements.map(element => (
              <div 
                key={element.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
                  element.id === activeElement.id ? "ring-4 ring-opacity-70" : "hover:scale-110"
                )}
                style={{
                  width: element.size,
                  height: element.size,
                  left: networkPositions[element.id]?.x,
                  top: networkPositions[element.id]?.y,
                  backgroundColor: element.color,
                  ring: element.color
                }}
                onClick={() => setActiveElement(element)}
              >
                <p className="text-white font-semibold text-center text-sm px-2">
                  {getElementProp(element, 'name')}
                </p>
              </div>
            ))}
          </div>
          
          {/* Element Details */}
          <div className="bg-sahara-sand/10 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div 
                className="w-4 h-4 rounded-full mr-3" 
                style={{ backgroundColor: activeElement.color }}
              ></div>
              <h4 className="text-xl font-semibold text-sahara-brown">
                {getElementProp(activeElement, 'name')}
              </h4>
            </div>
            <p className="text-muted-foreground">
              {getElementProp(activeElement, 'description')}
            </p>
            <div className="mt-3 text-sm text-sahara-terracotta">
              <span className="font-medium">
                {language === 'en' ? 'Connections: ' : 
                 language === 'ar' ? 'الروابط: ' : 
                 'Connexions: '}
              </span>
              {activeElement.connections.map(connId => {
                const connElement = culturalElements.find(e => e.id === connId);
                return connElement ? getElementProp(connElement, 'name') + ', ' : '';
              }).join('').slice(0, -2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Distribution Chart */}
          <div className="bg-white dark:bg-sahara-brown/5 rounded-lg p-6 shadow-sm reveal-on-scroll">
            <h3 className="text-xl font-bold text-sahara-brown mb-4">
              {language === 'en' ? 'Distribution of Cultural Elements' : 
               language === 'ar' ? 'توزيع العناصر الثقافية' : 
               'Distribution des Éléments Culturels'}
            </h3>
            <div className="h-[300px]">
              <ChartContainer 
                config={{
                  poetry: { color: "#e9b872" },
                  proverbs: { color: "#c17a41" },
                  myths: { color: "#8c614b" },
                  games: { color: "#d8a478" },
                  beliefs: { color: "#9f6b44" }
                }}
              >
                <PieChart>
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {distributionData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transmission Timeline */}
          <div className="bg-white dark:bg-sahara-brown/5 rounded-lg p-6 shadow-sm reveal-on-scroll">
            <h3 className="text-xl font-bold text-sahara-brown mb-4">
              {language === 'en' ? 'Evolution of Transmission Methods' : 
               language === 'ar' ? 'تطور طرق النقل الثقافي' : 
               'Évolution des Modes de Transmission'}
            </h3>
            <div className="h-[300px]">
              <ChartContainer 
                config={{
                  oral: { 
                    color: "#e9b872",
                    label: language === 'en' ? 'Oral' : language === 'ar' ? 'شفهي' : 'Oral'
                  },
                  written: { 
                    color: "#8c614b",
                    label: language === 'en' ? 'Written' : language === 'ar' ? 'مكتوب' : 'Écrit'
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={transmissionData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="oral" 
                      stroke="#e9b872" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="written" 
                      stroke="#8c614b" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="text-sm text-muted-foreground mt-4 text-center italic">
              {language === 'en' ? 'Percentage of cultural transmission by method over time' : 
               language === 'ar' ? 'النسبة المئوية لنقل الثقافة حسب الطريقة بمرور الوقت' : 
               'Pourcentage de transmission culturelle par méthode au fil du temps'}
            </div>
          </div>
        </div>

        {/* Quote about intangible heritage */}
        <div className="mt-12 p-6 bg-gradient-to-r from-sahara-terracotta/10 to-sahara-brown/10 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-sahara-terracotta opacity-80 mr-3 mt-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <blockquote className="italic text-muted-foreground">
              {language === 'en' 
                ? "The intangible cultural heritage of the Hassani people is not simply preserved in museums or books, but lives in daily practices, expressions, and knowledge passed from generation to generation."
                : language === 'ar'
                ? "التراث الثقافي غير المادي للشعب الحساني لا يحفظ فقط في المتاحف أو الكتب، بل يعيش في الممارسات اليومية والتعبيرات والمعرفة المنقولة من جيل إلى جيل."
                : "Le patrimoine culturel immatériel du peuple hassani n'est pas simplement conservé dans des musées ou des livres, mais vit dans les pratiques quotidiennes, les expressions et les connaissances transmises de génération en génération."
              }
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Art;
