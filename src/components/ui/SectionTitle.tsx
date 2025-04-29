
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) => {
  const { language } = useLanguage();
  
  return (
    <div className={cn("mb-12 text-center", className)} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-sahara-terracotta", titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto", subtitleClassName)}>
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-sahara-orange mx-auto mt-6"></div>
    </div>
  );
};

export default SectionTitle;
