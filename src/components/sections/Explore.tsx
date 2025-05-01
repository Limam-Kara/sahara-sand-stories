
import { useEffect, useRef, useState } from "react";
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
        title="Explorer le Sahara"
        subtitle="Découvrez les régions sahraouies et leurs caractéristiques"
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
