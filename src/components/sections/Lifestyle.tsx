
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ImageCard from "../ui/ImageCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Lifestyle = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { t, language } = useLanguage();

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

      <div className="mt-16 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-6 text-center">{t("lifestyle.tea")}</h3>
        <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-md cursor-pointer transition-all",
                  activeStep === index
                    ? "bg-sahara-orange text-white shadow-md"
                    : "bg-sahara-sand/30 hover:bg-sahara-sand/50"
                )}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center mb-2">
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm",
                    activeStep === index ? "bg-white text-sahara-orange" : "bg-sahara-orange text-white",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>
                    {index + 1}
                  </span>
                  <h4 className="font-bold">{step.title}</h4>
                </div>
                <p className="text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-muted-foreground">
            <p>
              "{t("lifestyle.tea.proverb")}"
            </p>
            <p className="mt-2 italic">{t("lifestyle.tea.proverb.attribution")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
