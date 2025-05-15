import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "@/contexts/LanguageContext";

const History = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  const images = [
    "https://www.culture.gov.mr/sites/default/files/2021-06/arton110.jpg",
    "https://machahid24.com/wp-content/uploads/2015/04/12806980193.jpg",
    "https://images.unsplash.com/photo-1696578720906-16de0cfb03dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Tm9tYWRlJTIwc2FocmFvdWl8ZW58MHx8MHx8fDA%3D",
    "https://www.arrabita.ma/wp-content/uploads/2023/05/%D8%A7%D9%84%D8%AD%D8%B1%D9%81-%D9%88%D8%A7%D9%84%D9%85%D9%87%D9%86-%D8%A7%D9%84%D8%AA%D9%82%D9%84%D9%8A%D8%AF%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B5%D8%AD%D8%B1%D8%A7%D8%A1-%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9L6XavLbWPCCHxOfRPpCm-fYr1gnr_eQHnw1_aaMViOqAQAp1PAO7tnGKYbJ2JmUBalU&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TU5tNOnc-_8Z1UFZ5B7G5wiYtruHW5lkhlwa6YTUplENshSrl-5G5LMjAOhjflaA6YA&usqp=CAU",
    "https://machahid24.com/wp-content/uploads/2014/12/music_sahraoui1.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
    <section id="histoire" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title={t("section.history")}
        subtitle={t("section.history.subtitle")}
        className="reveal-on-scroll"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.migrations")}</h3>
          <p className="text-lg mb-4">{t("history.migrations.text1")}</p>
          <p className="text-lg mb-6">{t("history.migrations.text2")}</p>
          <div className="w-16 h-1 bg-sahara-sand mb-6"></div>
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.values")}</h3>
          <p className="text-lg">{t("history.values.text")}</p>
        </div>

        {/* Custom Image Slider */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <img
                src={images[currentIndex]}
                alt="slider image"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Arrow Buttons for navigation */}
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              onClick={prevImage}
              className="bg-sahara-sand/50 text-white p-4 rounded-full shadow-lg hover:bg-sahara-brown focus:outline-none focus:ring-2 focus:ring-sahara-sand transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="bg-sahara-sand/50 text-white p-4 rounded-full shadow-lg hover:bg-sahara-brown focus:outline-none focus:ring-2 focus:ring-sahara-sand transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 p-8 bg-sahara-sand/20 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.ceremonies")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("history.marriages")}</h4>
            <p>{t("history.marriages.text")}</p>
          </div>
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("history.births")}</h4>
            <p>{t("history.births.text")}</p>
          </div>
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("history.religious")}</h4>
            <p>{t("history.religious.text")}</p>
          </div>
        </div>
      </div>

      {/* Section sur le dialecte hassani et sa relation avec l'arabe */}
      <div className="mt-16 p-8 bg-gradient-to-r from-sahara-terracotta/10 to-sahara-brown/10 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.language")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-sahara-terracotta text-xl mb-2">{t("history.language.origins")}</h4>
            <p className="text-base">{t("history.language.origins.text1")}</p>
            <p className="text-base">{t("history.language.origins.text2")}</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sahara-terracotta text-xl mb-2">{t("history.language.transmission")}</h4>
            <p className="text-base">{t("history.language.transmission.text1")}</p>
            <p className="text-base">{t("history.language.transmission.text2")}</p>
            <div className="flex items-center mt-4 text-sahara-orange bg-white/70 dark:bg-sahara-brown/20 p-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={language === 'ar' ? 'ml-2' : 'mr-2'}>
                <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
              </svg>
              <p className="text-sm italic">
                {language === 'en' ?
                  'The Hassani proverb says: "Words are like sand, they change shape but never disappear."' :
                  language === 'fr' ?
                    'Le proverbe hassani dit: "Les mots sont comme le sable, ils changent de forme mais ne disparaissent jamais."' :
                    'يقول المثل الحساني: "الكلمات مثل الرمال، تتغير أشكالها لكنها لا تختفي أبدًا."'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
