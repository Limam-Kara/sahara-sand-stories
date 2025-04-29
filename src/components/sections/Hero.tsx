
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        if (window.scrollY > 100) {
          scrollIndicatorRef.current.style.opacity = "0";
        } else {
          scrollIndicatorRef.current.style.opacity = "1";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const historySection = document.getElementById("histoire");
    if (historySection) {
      historySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=3024&auto=format&fit=crop"
          alt="Desert landscape"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Culture Sahraouie
        </h1>
        <p
          className={`text-xl md:text-2xl text-white/90 max-w-3xl mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Découvrez l'héritage ancestral du peuple du désert, une culture riche en traditions, hospitalité et liens profonds avec la nature.
        </p>
        <button
          onClick={scrollToContent}
          className={`bg-sahara-orange hover:bg-sahara-terracotta text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          Découvrir
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white transition-opacity duration-300"
        onClick={scrollToContent}
      >
        <span className="text-sm mb-2">Défiler</span>
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
