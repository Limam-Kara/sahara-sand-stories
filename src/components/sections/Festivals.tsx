
import { useEffect, useRef } from "react";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "@/contexts/LanguageContext";

const Festivals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  const events = [
    {
      title: "Festival des Nomades",
      date: language === 'en' ? "March" : language === 'fr' ? "Mars" : "مارس",
      location: "M'hamid El Ghizlane",
      description: language === 'en' 
        ? "Celebration of nomadic traditions with music, dance and crafts in the dunes of M'hamid."
        : language === 'fr' 
        ? "Célébration des traditions nomades avec musique, danse et artisanat dans les dunes de M'hamid."
        : "الاحتفال بالتقاليد البدوية مع الموسيقى والرقص والحرف اليدوية في كثبان امحاميد.",
      imageUrl: "https://images.unsplash.com/photo-1548374797-d1562ddf4412?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Moussem de Tan-Tan",
      date: language === 'en' ? "May" : language === 'fr' ? "Mai" : "مايو",
      location: "Tan-Tan",
      description: language === 'en'
        ? "Annual gathering of nomadic tribes, recognized by UNESCO as intangible cultural heritage."
        : language === 'fr'
        ? "Grand rassemblement annuel des tribus nomades, reconnu par l'UNESCO comme patrimoine culturel immatériel."
        : "التجمع السنوي الكبير للقبائل البدوية، معترف به من قبل اليونسكو كتراث ثقافي غير مادي.",
      imageUrl: "https://images.unsplash.com/photo-1496158551181-1019ac2ce535?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: language === 'en' 
        ? "International Desert Music Festival" 
        : language === 'fr' 
        ? "Festival International des Musiques du Désert"
        : "مهرجان موسيقى الصحراء الدولي",
      date: language === 'en' ? "October" : language === 'fr' ? "Octobre" : "أكتوبر",
      location: "Merzouga",
      description: language === 'en' 
        ? "International music gatherings at the foot of the Erg Chebbi dunes." 
        : language === 'fr' 
        ? "Rencontres musicales internationales aux pieds des dunes de l'Erg Chebbi."
        : "لقاءات موسيقية دولية عند سفح كثبان عرق الشبي.",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Aïd el-Adha",
      date: language === 'en' 
        ? "Variable (lunar calendar)" 
        : language === 'fr' 
        ? "Variable (calendrier lunaire)"
        : "متغير (التقويم القمري)",
      location: language === 'en' 
        ? "Throughout the territory" 
        : language === 'fr' 
        ? "Tout le territoire"
        : "في جميع أنحاء الأراضي",
      description: language === 'en' 
        ? "Feast of sacrifice celebrated by Sahrawi families with specific desert rituals." 
        : language === 'fr' 
        ? "Fête du sacrifice célébrée par les familles sahraouies avec des rituels spécifiques au désert."
        : "عيد الأضحى الذي تحتفل به العائلات الصحراوية بطقوس صحراوية خاصة.",
      imageUrl: "https://images.unsplash.com/photo-1660239268642-e8c5c3aa04b2?q=80&w=2670&auto=format&fit=crop"
    }
  ];

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

  const currentYear = new Date().getFullYear();

  return (
    <section id="festivals" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title="Festivals & Celebrations"
        translationKey="festivals"
        className="reveal-on-scroll"
      />

      <div className="mt-16 grid grid-cols-1 gap-8">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="reveal-on-scroll group flex flex-col md:flex-row overflow-hidden rounded-lg shadow-md bg-white dark:bg-sahara-brown/10"
          >
            <div className="md:w-1/3 relative overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: "200px" }}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=3024&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-b"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white md:hidden">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <div className="flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                  <span>{event.date} {currentYear}</span>
                </div>
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <div className="hidden md:block">
                <h3 className="text-2xl font-bold text-sahara-terracotta">{event.title}</h3>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                  <span className="mr-4">{event.date} {currentYear}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <p className="mt-4 text-foreground">{event.description}</p>
              <div className="mt-6 md:mt-4 flex items-center">
                <div className="hidden md:flex items-center text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="md:hidden">{event.location}</span>
                </div>
                <button className="ml-auto bg-sahara-sand hover:bg-sahara-orange hover:text-white transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium">
                  {t("festivals.more")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-r from-sahara-orange/10 to-sahara-terracotta/10 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4 text-center">{t("festivals.calendar")}</h3>
        <p className="text-center mb-8">
          {t("festivals.calendar.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.spring")}</h4>
            <ul>
              <li className="mb-2">Festival des Nomades ({language === 'en' ? "March" : language === 'fr' ? "Mars" : "مارس"})</li>
              <li>Moussem de Tan-Tan ({language === 'en' ? "May" : language === 'fr' ? "Mai" : "مايو"})</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.summer")}</h4>
            <ul>
              <li>{language === 'en' ? "Solstice Celebrations" : language === 'fr' ? "Célébrations du solstice" : "احتفالات الانقلاب الصيفي"} ({language === 'en' ? "June" : language === 'fr' ? "Juin" : "يونيو"})</li>
              <li className="mb-2">{language === 'en' ? "Dunes Festival" : language === 'fr' ? "Festival des Dunes" : "مهرجان الكثبان"} ({language === 'en' ? "July" : language === 'fr' ? "Juillet" : "يوليو"})</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.autumn")}</h4>
            <ul>
              <li className="mb-2">{language === 'en' ? "Desert Music Festival" : language === 'fr' ? "Festival des Musiques du Désert" : "مهرجان موسيقى الصحراء"} ({language === 'en' ? "October" : language === 'fr' ? "Octobre" : "أكتوبر"})</li>
              <li>{language === 'en' ? "Hassani Poetry Festival" : language === 'fr' ? "Festival de la Poésie Hassanie" : "مهرجان الشعر الحساني"} ({language === 'en' ? "November" : language === 'fr' ? "Novembre" : "نوفمبر"})</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.winter")}</h4>
            <ul>
              <li className="mb-2">Moussem de Sidi Kaouki ({language === 'en' ? "January" : language === 'fr' ? "Janvier" : "يناير"})</li>
              <li>{language === 'en' ? "Camel Festival" : language === 'fr' ? "Festival du Dromadaire" : "مهرجان الإبل"} ({language === 'en' ? "February" : language === 'fr' ? "Février" : "فبراير"})</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festivals;
