
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import DesertMap from "../maps/DesertMap";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Map } from "lucide-react";

const tips = [
  {
    title: "Préparer son voyage",
    items: [
      "Vêtements légers mais couvrants pour le jour",
      "Vêtements chauds pour les nuits froides du désert",
      "Chapeau, lunettes de soleil et crème solaire",
      "Chaussures confortables pour marcher dans le sable",
      "Médicaments de base et traitement pour l'eau"
    ]
  },
  {
    title: "Respect culturel",
    items: [
      "Renseignez-vous sur les coutumes locales",
      "Demandez la permission avant de photographier les personnes",
      "Habillez-vous modestement, surtout dans les villages",
      "Acceptez le thé offert, c'est un signe d'hospitalité",
      "Apprenez quelques mots d'arabe ou de tamazight"
    ]
  },
  {
    title: "Sécurité dans le désert",
    items: [
      "Ne partez jamais seul dans le désert",
      "Emportez plus d'eau que nécessaire",
      "Informez quelqu'un de votre itinéraire",
      "Vérifiez les conditions météorologiques",
      "Voyagez avec un guide local expérimenté"
    ]
  }
];

// Components for better organization
const TravelTips = ({ activeTab, setActiveTab }: { activeTab: number, setActiveTab: (index: number) => void }) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg shadow-md">
      <div className="flex border-b border-sahara-sand/30">
        {tips.map((tip, index) => (
          <button 
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors duration-300 ${
              activeTab === index 
                ? "text-sahara-terracotta border-b-2 border-sahara-orange" 
                : "text-foreground hover:text-sahara-terracotta"
            }`}
          >
            {tip.title}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <ul className="space-y-3">
          {tips[activeTab].items.map((item, index) => (
            <li key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-sahara-orange flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TravelInfo = () => {
  const { language } = useLanguage();
  
  return (
    <div className="p-6 bg-gradient-to-br from-sahara-orange/20 to-sahara-terracotta/20 rounded-lg shadow-md">
      <h4 className="font-semibold text-sahara-brown mb-4 flex items-center">
        <Info className="w-5 h-5 mr-2" />
        {language === 'en' ? 'Good to know' : 
         language === 'ar' ? 'جيد أن تعرف' : 
         'Bon à savoir'}
      </h4>
      <ul className="space-y-2 text-sm">
        <li>
          {language === 'en' ? 'The Sahara can be extremely hot during the day and cold at night' : 
           language === 'ar' ? 'يمكن أن تكون الصحراء شديدة الحرارة خلال النهار وباردة في الليل' : 
           'Le Sahara peut être extrêmement chaud le jour et froid la nuit'}
        </li>
        <li>
          {language === 'en' ? 'Sandstorms are more frequent between February and April' : 
           language === 'ar' ? 'العواصف الرملية أكثر شيوعًا بين فبراير وأبريل' : 
           'Les tempêtes de sable sont plus fréquentes entre février et avril'}
        </li>
        <li>
          {language === 'en' ? 'Phone network is often limited in the deep desert' : 
           language === 'ar' ? 'شبكة الهاتف محدودة غالبًا في الصحراء العميقة' : 
           'Le réseau téléphonique est souvent limité dans le désert profond'}
        </li>
        <li>
          {language === 'en' ? 'Plan for cash, credit cards are not accepted everywhere' : 
           language === 'ar' ? 'خطط للنقود، لا يتم قبول بطاقات الائتمان في كل مكان' : 
           'Prévoyez des espèces, les cartes bancaires ne sont pas acceptées partout'}
        </li>
      </ul>
    </div>
  );
};

const Explore = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentView, setCurrentView] = useState<'map' | 'tips'>('map');
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section id="explorer" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title="Explorer le Sahara"
        subtitle="Découvrez les régions sahraouies et leurs statistiques"
        className="reveal-on-scroll"
        translationKey="explore"
      />

      <div className="mt-10 reveal-on-scroll">
        <Tabs defaultValue="map" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="map" onClick={() => setCurrentView('map')} className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                {language === 'ar' ? 'خريطة المناطق' : 
                 language === 'fr' ? 'Carte des Régions' : 
                 'Region Map'}
              </TabsTrigger>
              <TabsTrigger value="tips" onClick={() => setCurrentView('tips')} className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                {language === 'ar' ? 'نصائح السفر' : 
                 language === 'fr' ? 'Conseils de Voyage' : 
                 'Travel Tips'}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="map" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-sahara-brown mb-4 text-center">
                {language === 'en' ? 'Sahrawi Regions of Morocco' : 
                 language === 'ar' ? 'مناطق الصحراء المغربية' : 
                 'Régions Sahraouies du Maroc'}
              </h3>
              <DesertMap />
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-sahara-brown mb-6">
                  {language === 'en' ? 'Travel Tips' : 
                   language === 'ar' ? 'نصائح السفر' : 
                   'Conseils de Voyage'}
                </h3>
                
                <TravelTips activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-sahara-brown mb-6">
                  {language === 'en' ? 'Important Information' : 
                   language === 'ar' ? 'معلومات مهمة' : 
                   'Informations Importantes'}
                </h3>
                
                <TravelInfo />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Explore;
