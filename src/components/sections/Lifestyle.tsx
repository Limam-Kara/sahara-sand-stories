
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ImageCard from "../ui/ImageCard";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Faire bouillir l'eau",
    description: "Portez de l'eau à ébullition dans une théière traditionnelle."
  },
  {
    title: "Première infusion",
    description: "Ajoutez le thé vert et laissez infuser 2-3 minutes. Cette première infusion est versée puis reversée plusieurs fois dans la théière pour mélanger."
  },
  {
    title: "Sucre et menthe",
    description: "Ajoutez généreusement du sucre et des feuilles de menthe fraîche."
  },
  {
    title: "Service",
    description: "Versez le thé de haut pour créer une mousse caractéristique. Servez trois verres successifs, de plus en plus sucrés."
  }
];

const Lifestyle = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
    <section id="lifestyle" ref={sectionRef} className="section-container bg-desert-pattern bg-opacity-5">
      <SectionTitle
        title="Mode de Vie & Cuisine"
        subtitle="Découvrez les vêtements traditionnels, la gastronomie du désert et les coutumes quotidiennes"
        className="reveal-on-scroll"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Vêtements Traditionnels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-lg shadow-sm">
              <h4 className="font-bold text-sahara-terracotta mb-2">Mlahfa</h4>
              <p>Vêtement traditionnel des femmes sahraouies, la Mlahfa est une pièce de tissu colorée de 4 mètres enroulée autour du corps.</p>
            </div>
            <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-lg shadow-sm">
              <h4 className="font-bold text-sahara-terracotta mb-2">Daraa</h4>
              <p>La Daraa est la tenue traditionnelle des hommes, une longue robe ample souvent de couleur bleue indigo avec des broderies.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Habitat Nomade</h3>
          <p className="text-lg mb-6">
            La tente traditionnelle, appelée "khaïma", est au cœur de la vie nomade sahraouie. Fabriquée en poils de chèvre ou en laine de chameau, elle protège des conditions extrêmes du désert tout en étant facilement transportable.
          </p>

          <div className="w-16 h-1 bg-sahara-sand mb-6"></div>
          
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Cuisine Sahraouie</h3>
          <p className="text-lg">
            La cuisine sahraouie est adaptée au mode de vie nomade, combinant des ingrédients simples pour créer des plats nourrissants. Le couscous, les ragoûts de viande et les dattes sont des éléments essentiels. Le thé à la menthe, servi en trois verres, représente l'hospitalité et est partagé lors de chaque rencontre.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ImageCard
            src="https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2930&auto=format&fit=crop"
            alt="Thé à la menthe"
            title="Thé Sahraoui"
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1567982625992-87207c6915c8?q=80&w=2670&auto=format&fit=crop"
            alt="Plat traditionnel"
            title="Couscous"
            className="reveal-on-scroll"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=2670&auto=format&fit=crop"
            alt="Tente traditionnelle dans le désert"
            title="Khaïma"
            className="reveal-on-scroll col-span-2"
          />
        </div>
      </div>

      <div className="mt-16 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-6 text-center">La Préparation du Thé Sahraoui</h3>
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
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2",
                    activeStep === index ? "bg-white text-sahara-orange" : "bg-sahara-orange text-white"
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
              "Le premier verre est amer comme la vie, le second est doux comme l'amour, et le troisième est suave comme la mort."
            </p>
            <p className="mt-2 italic">— Proverbe sahraoui sur les trois verres de thé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
