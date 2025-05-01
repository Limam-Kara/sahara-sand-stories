import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import DesertMap from "../maps/DesertMap";
import { useLanguage } from "@/contexts/LanguageContext";

const locations = [
  {
    name: "Merzouga",
    description: "Admirez les immenses dunes de sable de l'Erg Chebbi et expérimentez une nuit sous les étoiles dans un camp nomade.",
    period: "Octobre à Avril",
    highlight: "Dunes de sable orange spectaculaires"
  },
  {
    name: "M'hamid El Ghizlane",
    description: "Dernière oasis avant le grand Sahara, point de départ pour les expéditions dans le désert et bivouacs authentiques.",
    period: "Octobre à Mars",
    highlight: "Rencontres avec les nomades locaux"
  },
  {
    name: "Vallée du Draa",
    description: "Découvrez la plus grande palmeraie du Maroc et les kasbahs historiques qui bordent cette vallée fertile.",
    period: "Toute l'année",
    highlight: "Architecture traditionnelle en terre"
  },
  {
    name: "Tamegroute",
    description: "Visitez la célèbre bibliothèque coranique et les ateliers de poterie verte caractéristique de cette région.",
    period: "Septembre à Mai",
    highlight: "Poterie vernissée aux couleurs uniques"
  }
];

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

const Explore = () => {
  const [activeLocation, setActiveLocation] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
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
        subtitle="Conseils et informations pour voyager dans le désert sahraoui"
        className="reveal-on-scroll"
        translationKey="explore"
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-6">
            {language === 'en' ? 'Saharan Destinations' : 
             language === 'ar' ? 'وجهات صحراوية' : 
             'Destinations Sahariennes'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {locations.map((location, index) => (
              <button 
                key={index}
                onClick={() => setActiveLocation(index)}
                className={`py-2 px-4 text-center rounded-md transition-all duration-300 ${
                  activeLocation === index 
                    ? "bg-sahara-orange text-white shadow-md" 
                    : "bg-sahara-sand/20 hover:bg-sahara-sand/40"
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>

          <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-sahara-terracotta">{locations[activeLocation].name}</h4>
              <span className="text-sm px-3 py-1 bg-sahara-sand/30 rounded-full">
                {language === 'en' ? 'Best period: ' : 
                 language === 'ar' ? 'أفضل فترة: ' : 
                 'Meilleure période: '}{locations[activeLocation].period}
              </span>
            </div>
            <p className="mb-4">{locations[activeLocation].description}</p>
            <div className="flex items-center text-sahara-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="font-medium">{locations[activeLocation].highlight}</span>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-sahara-brown mb-6">
              {language === 'en' ? 'Interactive Map of Saharan Regions' : 
               language === 'ar' ? 'خريطة تفاعلية للمناطق الصحراوية' : 
               'Carte Interactive des Régions Sahariennes'}
            </h3>
            <DesertMap />
          </div>
        </div>

        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-6">
            {language === 'en' ? 'Travel Tips' : 
             language === 'ar' ? 'نصائح السفر' : 
             'Conseils de Voyage'}
          </h3>
          
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

          <div className="mt-8 p-6 bg-gradient-to-br from-sahara-orange/20 to-sahara-terracotta/20 rounded-lg shadow-md">
            <h4 className="font-semibold text-sahara-brown mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
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
        </div>
      </div>
    </section>
  );
};

export default Explore;
