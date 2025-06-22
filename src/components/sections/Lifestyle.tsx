
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ImageCard from "../ui/ImageCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Lifestyle = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { t, language } = useLanguage();
  const images = [
    "https://dam.media.un.org/Assets/V2/ChFVTjdTNTAwMDAwMDAwMDAwMxIPVFIxX1dBVEVSTUFSS0VEGi1cVFIxX1dBVEVSTUFSS0VEXDA0XGRiXDhjXDM1XGMxXFVONzE4NjQ0MS5qcGciBAgBEA9AAWIJVU43MTg2NDQx~/2AM9LO6HLPRJ/a5fSYxfP916APODO/UN7186441.jpg",
    "https://dam.media.un.org/Assets/V2/ChFVTjdTNTAwMDAwMDAwMDAwMxIPVFIxX1dBVEVSTUFSS0VEGi1cVFIxX1dBVEVSTUFSS0VEXDZlXDdlXDM5XGYzXGExXFVONzE4NjQ0Mi5qcGciBAgBEA9AAWIJVU43MTg2NDQy~/2AM9LO6HLNY6/AN0su6ttmXIx82hU/UN7186442.jpg",
    "https://previews.123rf.com/images/123rfkasami/123rfkasami2005/123rfkasami200500011/147252876-saharawi-green-tea-in-western-sahara.jpg",
    "https://www.newarab.com/sites/default/files/styles/medium_16_9/public/media/images/D577CDCF-7A9A-494A-AF57-D7F26941EF42.jpg?h=d1cb525d&itok=Nz2LOnN9",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9L6XavLbWPCCHxOfRPpCm-fYr1gnr_eQHnw1_aaMViOqAQAp1PAO7tnGKYbJ2JmUBalU&usqp=CAU",
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

  const steps = [
    {
      title: t("lifestyle.tea.step1"),
      description: t("lifestyle.tea.step1.description")
    },
    {
      title: t("lifestyle.tea.step2"),
      description: t("lifestyle.tea.step2.description")
    },
    {
      title: t("lifestyle.tea.step3"),
      description: t("lifestyle.tea.step3.description")
    },
    {
      title: t("lifestyle.tea.step4"),
      description: t("lifestyle.tea.step4.description")
    }
  ];

  return (
    <section id="lifestyle" ref={sectionRef} className="section-container bg-desert-pattern bg-opacity-5" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title={t("section.lifestyle")}
        subtitle={t("section.lifestyle.subtitle")}
        className="reveal-on-scroll"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("lifestyle.clothing")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-lg shadow-sm">
              <h4 className="font-bold text-sahara-terracotta mb-2">{t("lifestyle.mlahfa")}</h4>
              <p>{t("lifestyle.mlahfa.description")}</p>
            </div>
            <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-lg shadow-sm">
              <h4 className="font-bold text-sahara-terracotta mb-2">{t("lifestyle.daraa")}</h4>
              <p>{t("lifestyle.daraa.description")}</p>
            </div>
          </div>


          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("lifestyle.cuisine")}</h3>
          <p className="text-lg">
            {t("lifestyle.cuisine.description")}
          </p>
                    <p className="text-lg">
            {t("lifestyle.cuisine.description2")}
          </p>
          <div className="w-16 h-1 bg-sahara-sand my-6"></div>
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("lifestyle.housing")}</h3>
          <p className="text-lg mb-6">
            {t("lifestyle.housing.description")}
          </p>


        </div>

        <div className="grid grid-cols-2 gap-5">
          <ImageCard
            src="https://saharazoom.com/imagesnews/1418684956.jpg"
            alt="Thé à la menthe"
            title={language === 'en' ? "Mlahfa" : language === 'fr' ? "Mlahfa" : "ملحفة"}
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://pbs.twimg.com/media/DZ2rodOWsAAIsWP.jpg"
            alt="Plat traditionnel"
            title={language === 'en' ? "Daraa" : language === 'fr' ? "Daraa" : "دراعة"}
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.squarespace-cdn.com/content/v1/56c0b561c6fc08567a776255/1739708651030-XZ516KLV9VPGLND738LL/Nomad-Tent-Sahara-Bivouac-Tuareg-Moroccan-Tents.jpg"
            alt="Tente traditionnelle dans le désert"
            title={language === 'en' ? "Khaima" : language === 'fr' ? "Khaïma" : "خيمة"}
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://almasdare.com/wp-content/uploads/2019/04/da0d14c2-ddd3-484a-a59d-9f9d853ece05.jpg"
            alt="Tente traditionnelle dans le désert"
            title={language === 'en' ? "Blghman" : language === 'fr' ? "Blghman" : "البلغمان"}
            className="reveal-on-scroll"
          />
        </div>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("lifestyle.tea.title1")}</h3>
          {/* <p className="text-lg mb-4">{t("lifestyle.tea.title1")}</p> */}
          <p className="text-lg mb-6">{t("lifestyle.tea.p1")}</p>
          <div className="w-16 h-1 bg-sahara-sand mb-6"></div>
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("lifestyle.tea.title2")}</h3>
          <p className="text-lg">{t("lifestyle.tea.p2")}</p>
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
    </section>
  );
};

export default Lifestyle;
