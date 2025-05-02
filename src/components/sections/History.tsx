
import { useEffect, useRef } from "react";
import SectionTitle from "../ui/SectionTitle";
import ImageCard from "../ui/ImageCard";
import { useLanguage } from "@/contexts/LanguageContext";

const History = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
          <p className="text-lg mb-4">
            Les Sahraouis sont un peuple d'origine nomade habitant les régions désertiques du Sahara occidental. Leur histoire est marquée par des migrations saisonnières, suivant les pluies et les pâturages pour leurs troupeaux.
          </p>
          <p className="text-lg mb-6">
            La culture sahraouie s'est développée à travers les siècles grâce aux échanges avec les différentes civilisations du Maghreb et de l'Afrique subsaharienne. Leurs traditions orales, leur poésie et leur musique témoignent de cette riche histoire.
          </p>
          <div className="w-16 h-1 bg-sahara-sand mb-6"></div>
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.values")}</h3>
          <p className="text-lg">
            L'hospitalité est une valeur fondamentale de la culture sahraouie. Les étrangers sont toujours accueillis avec générosité, même dans les conditions difficiles du désert. Le respect des aînés et la solidarité tribale sont également des piliers de cette société.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ImageCard
            src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=3500&auto=format&fit=crop"
            alt="Caravanes de chameaux dans le désert"
            title={t("history.nomadic")}
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1591494628768-77a697303ae7?q=80&w=2670&auto=format&fit=crop"
            alt="Femme portant la tenue traditionnelle sahraouie"
            title={t("lifestyle.clothing")}
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1630852722264-9495a92d5609?q=80&w=2670&auto=format&fit=crop"
            alt="Artisanat sahraoui"
            title={t("art.crafts")}
            className="reveal-on-scroll col-span-2"
          />
        </div>
      </div>

      <div className="mt-16 p-8 bg-sahara-sand/20 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.ceremonies")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("history.marriages")}</h4>
            <p>Les cérémonies de mariage durent plusieurs jours et impliquent de nombreuses traditions, dont la musique, la danse et des festins élaborés.</p>
          </div>
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("history.births")}</h4>
            <p>La naissance d'un enfant est célébrée par toute la communauté, avec des rituels spécifiques pour protéger le nouveau-né des esprits du désert.</p>
          </div>
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("history.religious")}</h4>
            <p>L'Aïd el-Fitr et l'Aïd al-Adha sont des moments importants de l'année, célébrés avec des prières collectives et des repas partagés.</p>
          </div>
        </div>
      </div>

      {/* Section sur le dialecte hassani et sa relation avec l'arabe - ne pas traduire le proverbe */}
      <div className="mt-16 p-8 bg-gradient-to-r from-sahara-terracotta/10 to-sahara-brown/10 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4">{t("history.language")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-sahara-terracotta text-xl mb-2">{t("history.language.origins")}</h4>
            <p className="text-base">
              Le dialecte hassani, parlé par les Sahraouis, est une variante de l'arabe qui s'est développée dans les régions sahariennes au contact des langues berbères et africaines. Il tire son nom de la tribu des Beni Hassan qui s'est installée dans la région au XIIIe siècle.
            </p>
            <p className="text-base">
              Bien que fondamentalement arabe dans sa structure, le hassani se distingue par un vocabulaire spécifique lié à l'environnement désertique, à l'élevage nomade et aux traditions locales. Sa prononciation est également caractéristique, avec des sonorités plus douces que l'arabe classique.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sahara-terracotta text-xl mb-2">{t("history.language.transmission")}</h4>
            <p className="text-base">
              Traditionnellement transmis oralement à travers la poésie, les contes et les chants, le hassani est un vecteur essentiel de la culture sahraouie. Les poèmes hassanis (tidinit) occupent une place importante dans les rassemblements et célébrations.
            </p>
            <p className="text-base">
              Aujourd'hui, alors que l'arabe standard moderne est utilisé dans l'éducation formelle et les médias, le dialecte hassani demeure la langue du quotidien et de l'expression culturelle authentique. Des efforts sont déployés pour documenter et préserver ce patrimoine linguistique unique, témoin de l'histoire nomade du peuple sahraoui.
            </p>
            <div className="flex items-center mt-4 text-sahara-sand bg-white/70 dark:bg-sahara-brown/20 p-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={language === 'ar' ? 'ml-2' : 'mr-2'}>
                <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
              </svg>
              <p className="text-sm italic">Le proverbe hassani dit: "Les mots sont comme le sable, ils changent de forme mais ne disparaissent jamais."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
