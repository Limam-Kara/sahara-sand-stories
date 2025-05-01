
import { useState, useRef, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import { cn } from "@/lib/utils";

const instruments = [
  {
    name: "Ghaita",
    description: "Instrument à vent traditionnel au son puissant, utilisé lors des cérémonies et fêtes.",
    image: "https://images.unsplash.com/photo-1609920645737-9296d1c04708?q=80&w=2670&auto=format&fit=crop"
  },
  {
    name: "Bendir",
    description: "Tambour sur cadre avec des cordes vibrantes, créant un son distinctif lors des performances.",
    image: "https://images.unsplash.com/photo-1619597361832-a568b1e0555f?q=80&w=2670&auto=format&fit=crop"
  },
  {
    name: "Rbab",
    description: "Instrument à cordes frottées, souvent utilisé pour accompagner les récits et poèmes.",
    image: "https://images.unsplash.com/photo-1560913478-7d557a840c0e?q=80&w=2670&auto=format&fit=crop"
  }
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1464219789935-c2d9d9eb75eb?q=80&w=2670&auto=format&fit=crop",
    alt: "Motifs géométriques sahraouis",
    caption: "Motifs géométriques"
  },
  {
    src: "https://images.unsplash.com/photo-1595503240812-7286dafaddc1?q=80&w=2670&auto=format&fit=crop",
    alt: "Tapis traditionnel sahraoui",
    caption: "Tapis traditionnel"
  },
  {
    src: "https://images.unsplash.com/photo-1623196152364-8d92f09c56ba?q=80&w=2670&auto=format&fit=crop",
    alt: "Bijoux sahraouis en argent",
    caption: "Bijoux en argent"
  },
  {
    src: "https://images.unsplash.com/photo-1598811629267-faffa0027fe3?q=80&w=2670&auto=format&fit=crop",
    alt: "Poterie traditionnelle",
    caption: "Poterie"
  },
  {
    src: "https://images.unsplash.com/photo-1494183703727-74e0657fa0fa?q=80&w=2670&auto=format&fit=crop",
    alt: "Artisanat en cuir sahraoui",
    caption: "Artisanat en cuir"
  }
];

const Art = () => {
  const [activeInstrument, setActiveInstrument] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
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

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="art" ref={sectionRef} className="section-container">
      <SectionTitle
        title="Art & Musique"
        subtitle="Découvrez les expressions artistiques et musicales de la culture sahraouie"
        className="reveal-on-scroll"
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Expression Musicale</h3>
          <p className="text-lg mb-6">
            La musique sahraouie est profondément liée à la tradition orale, transmettant l'histoire, les valeurs et les émotions du peuple du désert. Les mélodies envoûtantes et les rythmes hypnotiques évoquent les vastes étendues du Sahara et la vie nomade.
          </p>

          <div className="w-16 h-1 bg-sahara-sand mb-6"></div>

          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Poésie & Récits</h3>
          <p className="text-lg mb-6">
            La poésie est au cœur de la culture sahraouie. Les poèmes, appelés "talab" ou "lghna", sont récités lors des rassemblements et célébrations. Ils abordent des thèmes comme l'amour, l'honneur, la bravoure et la beauté du désert.
          </p>

          <div className="mt-8">
            <h4 className="text-xl font-semibold text-sahara-terracotta mb-4">Instruments Traditionnels</h4>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {instruments.map((instrument, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveInstrument(index)}
                  className={cn(
                    "py-2 px-4 text-center rounded-md transition-all duration-300",
                    activeInstrument === index 
                      ? "bg-sahara-orange text-white shadow-md" 
                      : "bg-sahara-sand/20 hover:bg-sahara-sand/40"
                  )}
                >
                  {instrument.name}
                </button>
              ))}
            </div>
            <div className="bg-white/70 dark:bg-sahara-brown/10 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-1/2 h-48 rounded-md overflow-hidden">
                <img 
                  src={instruments[activeInstrument].image} 
                  alt={instruments[activeInstrument].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h5 className="text-lg font-semibold text-sahara-terracotta">{instruments[activeInstrument].name}</h5>
                <p className="mt-2">{instruments[activeInstrument].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-sahara-brown mb-4">Artisanat Sahraoui</h3>
          <p className="text-lg mb-6">
            L'artisanat sahraoui est caractérisé par des motifs géométriques aux couleurs vives, reflétant l'environnement désertique et transmettant des symboles culturels importants. Chaque pièce raconte une histoire et préserve les techniques ancestrales.
          </p>

          <div className="mt-8 relative rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-80 bg-sahara-brown/10">
              <img
                src={galleryImages[currentImage].src}
                alt={galleryImages[currentImage].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button 
                onClick={prevImage}
                className="bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                onClick={nextImage}
                className="bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-3">
              <p className="text-center">{galleryImages[currentImage].caption}</p>
            </div>
            <div className="absolute bottom-14 inset-x-0 flex justify-center space-x-2 p-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImage ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square rounded-md overflow-hidden ${
                  index === currentImage ? "ring-2 ring-sahara-orange" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Art;
