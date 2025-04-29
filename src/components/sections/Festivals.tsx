
import { useEffect, useRef } from "react";
import SectionTitle from "../ui/SectionTitle";

const events = [
  {
    title: "Festival des Nomades",
    date: "Mars",
    location: "M'hamid El Ghizlane",
    description: "Célébration des traditions nomades avec musique, danse et artisanat dans les dunes de M'hamid.",
    imageUrl: "https://images.unsplash.com/photo-1548374797-d1562ddf4412?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Moussem de Tan-Tan",
    date: "Mai",
    location: "Tan-Tan",
    description: "Grand rassemblement annuel des tribus nomades, reconnu par l'UNESCO comme patrimoine culturel immatériel.",
    imageUrl: "https://images.unsplash.com/photo-1496158551181-1019ac2ce535?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Festival International des Musiques du Désert",
    date: "Octobre",
    location: "Merzouga",
    description: "Rencontres musicales internationales aux pieds des dunes de l'Erg Chebbi.",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Aïd el-Adha",
    date: "Variable (calendrier lunaire)",
    location: "Tout le territoire",
    description: "Fête du sacrifice célébrée par les familles sahraouies avec des rituels spécifiques au désert.",
    imageUrl: "https://images.unsplash.com/photo-1660239268642-e8c5c3aa04b2?q=80&w=2670&auto=format&fit=crop"
  }
];

const Festivals = () => {
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

  const currentYear = new Date().getFullYear();

  return (
    <section id="festivals" ref={sectionRef} className="section-container">
      <SectionTitle
        title="Festivals & Célébrations"
        subtitle="Découvrez les événements qui animent la culture sahraouie tout au long de l'année"
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
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-r from-sahara-orange/10 to-sahara-terracotta/10 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4 text-center">Calendrier des Festivals</h3>
        <p className="text-center mb-8">
          Planifiez votre voyage pour vivre ces expériences culturelles uniques
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">Printemps</h4>
            <ul>
              <li className="mb-2">Festival des Nomades (Mars)</li>
              <li>Moussem de Tan-Tan (Mai)</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">Été</h4>
            <ul>
              <li>Célébrations du solstice (Juin)</li>
              <li className="mb-2">Festival des Dunes (Juillet)</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">Automne</h4>
            <ul>
              <li className="mb-2">Festival des Musiques du Désert (Octobre)</li>
              <li>Festival de la Poésie Hassanie (Novembre)</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">Hiver</h4>
            <ul>
              <li className="mb-2">Moussem de Sidi Kaouki (Janvier)</li>
              <li>Festival du Dromadaire (Février)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festivals;
