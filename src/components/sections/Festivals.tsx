import { useEffect, useRef, useState, useMemo } from "react";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "@/contexts/LanguageContext";

const Festivals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  // Memoizing the events array to avoid unnecessary re-renders
  const events = useMemo(() => [
    {
      title: language === 'en' ? "Cultural Week Opening" : language === 'fr' ? "Ouverture de la Semaine Culturelle" : "افتتاح الأسبوع الثقافي",
      date: language === 'en' ? "March" : language === 'fr' ? "Mars" : "مارس",
      location: "M'hamid El Ghizlane",
      description: language === 'en'
        ? "The Cultural Week event, held during World Heritage Day, celebrates Hassani culture. With activities such as music, dance, and art, it preserves the local heritage for future generations. This initiative, organized by the Hassani Heritage Club and Media & Communication Club, highlights the importance of preserving traditions, fostering cultural awareness, and promoting unity. Special thanks to the Chamber of Industry, the Hassani Research Center, and the Parents' Association for supporting this remarkable cultural celebration."
        : language === 'fr'
          ? "La Semaine culturelle, organisée lors de la Journée mondiale du patrimoine, met à l’honneur la culture hassani. À travers des activités telles que la musique, la danse et l'art, l'événement vise à préserver ce patrimoine local pour les générations futures. Organisé par le Club du Patrimoine Hassani et le Club des Médias et Communication, cet événement souligne l'importance de la préservation des traditions, la sensibilisation culturelle et la promotion de l'unité. Merci à la Chambre d'Industrie, au Centre de Recherche Hassani et à l'Association des Parents."
          : "في إطار اليوم العالمي للتراث، يُنظم أسبوع ثقافي فني للتعريف بالتراث الحساني. يشمل المهرجان الموسيقى والرقص والفنون لتسليط الضوء على الحفاظ على التراث المحلي. يُعقد الحدث من قبل نادي التراث الحساني ونادي الإعلام والتواصل بهدف تعزيز الوعي الثقافي بين الأجيال القادمة، مع التركيز على أهمية الوحدة الثقافية. شكر خاص لغرفة الصناعة، مركز أبحاث التراث الحساني، وكذلك جمعية أولياء الأمور على دعمهم لهذا الاحتفال الثقافي المميز.",
      images: [
        "/images/events/1.jpg",
        "/images/events/2.jpg",
        "/images/events/3.jpg",
        "/images/events/4.jpg",
        "/images/events/5.jpg",
        "/images/events/6.jpg",
      ]
    },
    {
      title: language === 'en' ? "Hassani Heritage Activities" : language === 'fr' ? "Activités du Patrimoine Hassani" : "أنشطة التراث الحساني",
      date: language === 'en' ? "May" : language === 'fr' ? "Mai" : "مايو",
      location: "Tan-Tan",
      description: language === 'en'
        ? "As part of Hassani Heritage Week, students participated in educational and recreational activities that introduced them to Hassani traditions. These activities provided a unique opportunity to connect with their cultural roots, helping students appreciate the history, arts, and literature of the Sahrawi people. This event, guided by Mr. Baj Bakr, fostered creativity and knowledge while emphasizing the importance of preserving cultural heritage. The students’ involvement reflected the collective effort to pass on the Hassani legacy to future generations through interactive learning."
        : language === 'fr'
          ? "Dans le cadre de la semaine culturelle du patrimoine hassani, les élèves ont participé à des activités éducatives et récréatives qui les ont initiés aux traditions hassanies. Ces activités leur ont permis de renouer avec leurs racines culturelles, leur offrant une occasion unique d’apprécier l’histoire, les arts et la littérature des Sahraouis. Ce programme, supervisé par M. Baj Bakr, a encouragé la créativité et le savoir tout en soulignant l’importance de préserver l’héritage culturel. L'implication des élèves montre l’effort collectif pour transmettre ce patrimoine."
          : "في إطار أسبوع التراث الحساني، شارك الطلاب في أنشطة ترفيهية وتعليمية تعرفهم على التقاليد الحسانية. من خلال هذه الأنشطة، أتيحت لهم الفرصة للتواصل مع جذورهم الثقافية، مما يساعدهم على تقدير تاريخ وفنون وأدب الشعب الصحراوي. تحت إشراف الأستاذ باج بكر، حفز هذا الحدث الإبداع والمعرفة مع التأكيد على أهمية الحفاظ على التراث الثقافي. وقد عكست مشاركة الطلاب الجهود الجماعية لنقل هذا الإرث الثقافي إلى الأجيال القادمة من خلال التعلم التفاعلي.",
      images: [
        "/images/events/1.jpg",
        "/images/events/3.jpg",
        "/images/events/7.jpg",
      ]
    },
    {
      "title": language === 'en' ? "Hassani Proverbs and Advice" : language === 'fr' ? "Proverbes et Conseils Houssani" : "حكم ونصائح حسانية",
      "date": language === 'en' ? "April 22, 2025" : language === 'fr' ? "22 Avril 2025" : "الثلاثاء 22 أبريل 2025",
      "location": "M'hamid El Ghizlane",
      "description": language === 'en'
        ? "On the evening of Tuesday, April 22, 2025, Hassani proverbs and advice were presented, led by Mr. Baba Ma'a Al-Anin, a poet and member of the Hassani Research and Studies Center. This event, aligned with the objectives of the Cultural Week, aimed to introduce Hassani cultural heritage and promote cultural awareness."
        : language === 'fr'
          ? "Le mardi 22 avril 2025, des proverbes et conseils houssani ont été présentés par M. Baba Ma'a Al-Anin, poète et membre du Centre de Recherche et d'Études Houssani. Cet événement, en lien avec les objectifs de la Semaine Culturelle, visait à faire connaître le patrimoine culturel houssani et promouvoir la sensibilisation culturelle."
          : "مساء يوم الثلاثاء 22 أبريل 2025، تم تقديم حكم ونصائح حسانية من تأطير السيد بابا ماء العنين، شاعر وعضو في مركز الأبحاث والدراسات الحسانية. يأتي هذا الحدث تماشياً مع أهداف الأسبوع الثقافي للتعريف بالتراث الثقافي الحساني وتعزيز الوعي الثقافي.",
      "images": [
        "/images/events/8.jpg",
        "/images/events/9.jpg",
      ]
    }

  ], [language]); // Recompute only when 'language' changes

  // Create a state for each event's current image index
  const [imageIndexes, setImageIndexes] = useState(
    events.map(() => 0) // Initialize all to 0 (first image for each event)
  );

  // Function to go to the next image for a specific event
  const nextImage = (eventIndex: number, imagesLength: number) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[eventIndex] = (newIndexes[eventIndex] + 1) % imagesLength;
      return newIndexes;
    });
  };

  // Function to go to the previous image for a specific event
  const prevImage = (eventIndex: number, imagesLength: number) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[eventIndex] =
        newIndexes[eventIndex] === 0 ? imagesLength - 1 : newIndexes[eventIndex] - 1;
      return newIndexes;
    });
  };

  // Auto slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) =>
        prevIndexes.map((index, i) => (index + 1) % events[i].images.length)
      );
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [events]);

  return (
    <section id="festivals" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title="Festivals & Celebrations"
        translationKey="festivals"
        className="reveal-on-scroll"
      />

      <div className="mt-16 grid grid-cols-1 gap-8">
        {events.map((event, eventIndex) => (
          <div
            key={eventIndex}
            className="reveal-on-scroll group flex flex-col md:flex-row overflow-hidden rounded-lg shadow-md bg-white dark:bg-sahara-brown/10"
          >
            <div className="md:w-1/3 relative overflow-hidden">
              <div className="relative">
                <img
                  src={event.images[imageIndexes[eventIndex]]}
                  alt={event.title}
                  className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105" // Fixed height for images
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-b"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white md:hidden">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <div className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                    </svg>
                    <span>{event.date} {new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <button
                  onClick={() => prevImage(eventIndex, event.images.length)}
                  className="bg-sahara-sand/50 text-white p-2 rounded-full shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => nextImage(eventIndex, event.images.length)}
                  className="bg-sahara-sand/50 text-white p-2 rounded-full shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="text-2xl font-bold text-sahara-terracotta">{event.title}</h3>
              <p className="mt-4 text-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Festivals;
