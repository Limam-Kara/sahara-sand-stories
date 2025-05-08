
import { useEffect, useRef } from "react";
import SectionTitle from "../ui/SectionTitle";
import { useLanguage } from "@/contexts/LanguageContext";

const Festivals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  const events = [
    {
      title: language === 'en' ? "Festival of the Nomads" : language === 'fr' ? "Festival des Nomades" : "مهرجان الرحل",
      date: language === 'en' ? "March" : language === 'fr' ? "Mars" : "مارس",
      location: "M'hamid El Ghizlane",
      description: language === 'en' 
        ? "The Festival des Nomades is an immersive celebration of the rich cultural heritage of the Sahrawi people. Held in the stunning desert landscape of M'hamid El Ghizlane, this festival showcases the nomadic traditions through vibrant music, dance, and artisan crafts. Visitors are invited to experience the rhythms of traditional Sahrawi music, the elegance of dances that reflect the nomadic way of life, and the intricate craftsmanship that has been passed down through generations. The festival is not only a cultural gathering but also a profound connection to the desert environment that has shaped the lives of the Sahrawi for centuries."
        : language === 'fr' 
        ? "Le Festival des Nomades est une célébration immersive du riche patrimoine culturel des Sahraouis. Organisé dans le magnifique paysage désertique de M'hamid El Ghizlane, ce festival met en avant les traditions nomades à travers une musique vibrante, des danses et des métiers artisanaux. Les visiteurs sont invités à vivre les rythmes de la musique traditionnelle sahraouie, l'élégance des danses qui reflètent le mode de vie nomade, ainsi que l'artisanat complexe transmis de génération en génération. Le festival est non seulement un rassemblement culturel, mais aussi une connexion profonde avec l'environnement désertique qui a façonné la vie des Sahraouis pendant des siècles."
        : "مهرجان الرحل هو احتفال غامر بالتراث الثقافي الغني لشعب الصحراء. يُعقد في المناظر الطبيعية الصحراوية الرائعة لمحميد الغزلان، ويعرض هذا المهرجان التقاليد البدوية من خلال الموسيقى والرقص والحرف اليدوية. يُدعى الزوار لتجربة إيقاعات الموسيقى الصحراوية التقليدية، ورشاقة الرقصات التي تعكس أسلوب الحياة البدوي، والحرف اليدوية المعقدة التي تم نقلها عبر الأجيال. المهرجان ليس مجرد تجمع ثقافي بل هو اتصال عميق مع البيئة الصحراوية التي شكلت حياة الصحراويين لقرون."
      ,
      imageUrl: "https://www.moroccoworldnews.com/wp-content/uploads/2025/04/20th-International-Nomad-Festival-Pauses-Music-to-Unite-Against-Plastic-Pollution-in-the-Sahara-.webp"
    },
    {
      title: language === 'en' ? "Moussem of Tan-Tan" : language === 'fr' ? "Moussem de Tan-Tan" : "موسم طانطان",
      date: language === 'en' ? "May" : language === 'fr' ? "Mai" : "مايو",
      location: "Tan-Tan",
      description: language === 'en'
        ? "The Moussem de Tan-Tan is one of the most important cultural and social events in southern Morocco, drawing nomadic tribes from across the region. This annual gathering, which has been recognized by UNESCO as an Intangible Cultural Heritage, is a vibrant celebration of Sahrawi and Berber traditions. The event features a grand parade of camels, horses, and colorful tents, where visitors can experience traditional music, dances, and local cuisine. It is an event that brings together the diverse tribes of the Sahara and is a powerful reminder of the enduring nomadic way of life that has shaped the history of the region."
        : language === 'fr'
        ? "Le Moussem de Tan-Tan est l'un des événements culturels et sociaux les plus importants du sud du Maroc, attirant les tribus nomades de toute la région. Ce rassemblement annuel, reconnu par l'UNESCO comme patrimoine culturel immatériel, est une célébration vivante des traditions sahraouies et berbères. L'événement comprend un grand défilé de chameaux, de chevaux et de tentes colorées, où les visiteurs peuvent découvrir la musique traditionnelle, les danses et la cuisine locale. C'est un événement qui réunit les différentes tribus du Sahara et rappelle puissamment le mode de vie nomade qui a façonné l'histoire de la région."
        : "موسم طانطان هو أحد أهم الأحداث الثقافية والاجتماعية في جنوب المغرب، حيث يجذب القبائل البدوية من جميع أنحاء المنطقة. هذا التجمع السنوي، المعترف به من قبل اليونسكو كتراث ثقافي غير مادي، هو احتفال حي بالتقاليد الصحراوية والأمازيغية. يشمل الحدث موكباً كبيراً من الجمال والخيول والخيام الملونة، حيث يمكن للزوار تجربة الموسيقى التقليدية والرقصات والمأكولات المحلية. إنه حدث يجمع بين قبائل الصحراء المختلفة ويعكس بقوة نمط الحياة البدوي الذي شكل تاريخ المنطقة."
      ,
      imageUrl: "https://www.fratmat.info/media/k2/items/cache/8ad6370932b706548b378d238e4ee244_XL.jpg"
    },
    {
      title: language === 'en' 
        ? "International Desert Music Festival" 
        : language === 'fr' 
        ? "Festival International des Musiques du Désert"
        : "مهرجان موسيقى الصحراء الدولي",
      date: language === 'en' ? "October" : language === 'fr' ? "Octobre" : "أكتوبر",
      location: "Merzouga",
      description: language === 'en' 
        ? "The International Desert Music Festival is a must-see event for music lovers and desert enthusiasts alike. Held in the stunning dunes of Merzouga, this festival brings together musicians from across the globe to perform under the open sky. With the vast desert as the backdrop, the performances span a wide range of genres, from traditional Sahrawi music to contemporary fusion styles. The festival creates a unique atmosphere where the sounds of the desert blend with global musical influences, making it a one-of-a-kind experience for attendees."
        : language === 'fr' 
        ? "Le Festival International des Musiques du Désert est un événement incontournable pour les amateurs de musique et les passionnés de désert. Organisé dans les dunes spectaculaires de Merzouga, ce festival réunit des musiciens du monde entier pour se produire sous le ciel ouvert. Avec le vaste désert en toile de fond, les performances couvrent une large gamme de genres, de la musique traditionnelle sahraouie aux styles contemporains fusion. Le festival crée une atmosphère unique où les sons du désert se mélangent avec les influences musicales mondiales, offrant ainsi une expérience inoubliable aux participants."
        : "مهرجان موسيقى الصحراء الدولي هو حدث لا بد من حضوره لمحبي الموسيقى وعشاق الصحراء على حد سواء. يُعقد في كثبان مرزوكة الرائعة، ويجمع هذا المهرجان موسيقيين من جميع أنحاء العالم لتقديم عروضهم تحت السماء المفتوحة. مع الصحراء الواسعة كخلفية، تمتد العروض لتشمل مجموعة متنوعة من الأنماط الموسيقية، من الموسيقى الصحراوية التقليدية إلى الأساليب المعاصرة المدمجة. يخلق المهرجان جوًا فريدًا حيث تختلط أصوات الصحراء مع التأثيرات الموسيقية العالمية، مما يجعله تجربة لا مثيل لها للمشاركين."
      ,
      imageUrl: "https://www.globalmoroccoexploration.com/photos/img-pages/page-182/big/377merzouga_music_festival.jpg"
    },
    {
      title: language === 'en' ? "Eid al-Adha" : language === 'fr' ? "Aïd el-Adha" : "عيد الأضحى",
      date: language === 'en' 
        ? "Variable (lunar calendar)" 
        : language === 'fr' 
        ? "Variable (calendrier lunaire)"
        : "متغير (التقويم القمري)",
      location: language === 'en' 
        ? "Throughout the territory" 
        : language === 'fr' 
        ? "Tout le territoire"
        : "في جميع أنحاء الأراضي",
      description: language === 'en' 
        ? "Aïd el-Adha is one of the most significant religious events in the Sahrawi culture, marked by prayers, feasts, and sacrifices. Celebrated by Sahrawi families, the event is deeply connected to the desert rituals that have been passed down through generations. On this day, families gather to share meals, perform sacrificial rites, and offer blessings. The Aïd is an expression of faith and unity, with desert-specific rituals that reinforce the cultural and spiritual ties of the Sahrawi people to their environment."
        : language === 'fr' 
        ? "L'Aïd el-Adha est l'un des événements religieux les plus importants dans la culture sahraouie, marqué par des prières, des festins et des sacrifices. Célébrée par les familles sahraouies, cette fête est profondément liée aux rituels désertiques transmis de génération en génération. En ce jour, les familles se réunissent pour partager des repas, accomplir des rites sacrificiels et offrir des bénédictions. L'Aïd est une expression de foi et d'unité, avec des rituels spécifiques au désert qui renforcent les liens culturels et spirituels des Sahraouis avec leur environnement."
        : "عيد الأضحى هو أحد أهم الأحداث الدينية في الثقافة الصحراوية، ويتميز بالصلاة والولائم والذبح. تحتفل به العائلات الصحراوية، ويرتبط هذا الحدث ارتباطًا وثيقًا بالطقوس الصحراوية التي تم نقلها عبر الأجيال. في هذا اليوم، تجتمع العائلات لمشاركة الوجبات، وأداء الطقوس التضحية، وتقديم البركات. عيد الأضحى هو تعبير عن الإيمان والوحدة، مع طقوس خاصة بالصحراء تعزز الروابط الثقافية والروحية للشعب الصحراوي مع بيئته."
      ,
      imageUrl: "https://images.unsplash.com/photo-1660239268642-e8c5c3aa04b2?q=80&w=2670&auto=format&fit=crop"
    }
  ];
  

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
    <section id="festivals" ref={sectionRef} className="section-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SectionTitle
        title="Festivals & Celebrations"
        translationKey="festivals"
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
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=3024&auto=format&fit=crop";
                }}
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

            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gradient-to-r from-sahara-orange/10 to-sahara-terracotta/10 rounded-lg border border-sahara-sand/30 reveal-on-scroll">
        <h3 className="text-2xl font-bold text-sahara-brown mb-4 text-center">{t("festivals.calendar")}</h3>
        <p className="text-center mb-8">
          {t("festivals.calendar.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.spring")}</h4>
            <ul>
              <li className="mb-2">Festival des Nomades ({language === 'en' ? "March" : language === 'fr' ? "Mars" : "مارس"})</li>
              <li>Moussem de Tan-Tan ({language === 'en' ? "May" : language === 'fr' ? "Mai" : "مايو"})</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.summer")}</h4>
            <ul>
              <li>{language === 'en' ? "Solstice Celebrations" : language === 'fr' ? "Célébrations du solstice" : "احتفالات الانقلاب الصيفي"} ({language === 'en' ? "June" : language === 'fr' ? "Juin" : "يونيو"})</li>
              <li className="mb-2">{language === 'en' ? "Dunes Festival" : language === 'fr' ? "Festival des Dunes" : "مهرجان الكثبان"} ({language === 'en' ? "July" : language === 'fr' ? "Juillet" : "يوليو"})</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.autumn")}</h4>
            <ul>
              <li className="mb-2">{language === 'en' ? "Desert Music Festival" : language === 'fr' ? "Festival des Musiques du Désert" : "مهرجان موسيقى الصحراء"} ({language === 'en' ? "October" : language === 'fr' ? "Octobre" : "أكتوبر"})</li>
              <li>{language === 'en' ? "Hassani Poetry Festival" : language === 'fr' ? "Festival de la Poésie Hassanie" : "مهرجان الشعر الحساني"} ({language === 'en' ? "November" : language === 'fr' ? "Novembre" : "نوفمبر"})</li>
            </ul>
          </div>
          <div className="p-4 bg-white/70 dark:bg-sahara-brown/10 rounded-md">
            <h4 className="font-bold text-sahara-terracotta mb-2">{t("festivals.seasons.winter")}</h4>
            <ul>
              <li className="mb-2">Moussem de Sidi Kaouki ({language === 'en' ? "January" : language === 'fr' ? "Janvier" : "يناير"})</li>
              <li>{language === 'en' ? "Camel Festival" : language === 'fr' ? "Festival du Dromadaire" : "مهرجان الإبل"} ({language === 'en' ? "February" : language === 'fr' ? "Février" : "فبراير"})</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festivals;
