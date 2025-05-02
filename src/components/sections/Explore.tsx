
import { useEffect, useRef } from "react";
import SectionTitle from "../ui/SectionTitle";
import DesertMap from "../maps/DesertMap";
import { useLanguage } from "@/contexts/LanguageContext";

const Explore = () => {
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
        title={language === 'ar' ? 'استكشف الصحراء المغربية' : language === 'fr' ? 'Explorer le Sahara Marocain' : 'Explore the Moroccan Sahara'}
        subtitle={language === 'ar' ? 'اكتشف جمال وتنوع الصحراء المغربية' : language === 'fr' ? 'Découvrez la beauté et la diversité du Sahara Marocain' : 'Discover the beauty and diversity of the Moroccan Sahara'}
        className="reveal-on-scroll"
        translationKey="explore"
      />

      <div className="mt-10 reveal-on-scroll">
        <div className="w-full">
          <DesertMap />
        </div>
      </div>
    </section>
  );
};

export default Explore;
