
import { useEffect, useRef } from "react";
import SectionTitle from "../ui/SectionTitle";
import ImageCard from "../ui/ImageCard";

const History = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="histoire" ref={sectionRef} className="section-container">
      <SectionTitle
        title="Histoire & Traditions"
        subtitle="Découvrez l'héritage culturel et les traditions ancestrales du peuple sahraoui"
        className="reveal-on-scroll"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Origines & Migrations</h3>
          <p className="text-lg mb-4">
            Les Sahraouis sont un peuple d'origine nomade habitant les régions désertiques du Sahara occidental. Leur histoire est marquée par des migrations saisonnières, suivant les pluies et les pâturages pour leurs troupeaux.
          </p>
          <p className="text-lg mb-6">
            La culture sahraouie s'est développée à travers les siècles grâce aux échanges avec les différentes civilisations du Maghreb et de l'Afrique subsaharienne. Leurs traditions orales, leur poésie et leur musique témoignent de cette riche histoire.
          </p>
          <div className="w-16 h-1 bg-sahara-sand mb-6"></div>
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Valeurs & Traditions</h3>
          <p className="text-lg">
            L'hospitalité est une valeur fondamentale de la culture sahraouie. Les étrangers sont toujours accueillis avec générosité, même dans les conditions difficiles du désert. Le respect des aînés et la solidarité tribale sont également des piliers de cette société.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ImageCard
            src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=3500&auto=format&fit=crop"
            alt="Caravanes de chameaux dans le désert"
            title="Caravanes"
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1591494628768-77a697303ae7?q=80&w=2670&auto=format&fit=crop"
            alt="Femme portant la tenue traditionnelle sahraouie"
            title="Vêtements traditionnels"
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1630852722264-9495a92d5609?q=80&w=2670&auto=format&fit=crop"
            alt="Artisanat sahraoui"
            title="Artisanat"
            className="reveal-on-scroll col-span-2"
          />
        </div>
      </div>

      <div className="mt-16 p-8 bg-sahara-sand/20 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4">Cérémonies & Rituels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">Mariages</h4>
            <p>Les cérémonies de mariage durent plusieurs jours et impliquent de nombreuses traditions, dont la musique, la danse et des festins élaborés.</p>
          </div>
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">Naissances</h4>
            <p>La naissance d'un enfant est célébrée par toute la communauté, avec des rituels spécifiques pour protéger le nouveau-né des esprits du désert.</p>
          </div>
          <div className="p-4 rounded-md bg-white/50 dark:bg-sahara-brown/10">
            <h4 className="font-bold text-sahara-terracotta mb-2">Fêtes religieuses</h4>
            <p>L'Aïd el-Fitr et l'Aïd al-Adha sont des moments importants de l'année, célébrés avec des prières collectives et des repas partagés.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
