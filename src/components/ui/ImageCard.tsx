
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
}

const ImageCard = ({
  src,
  alt,
  title,
  description,
  className,
  imageClassName,
}: ImageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 hover:scale-105",
            imageClassName
          )}
        />
      </div>
      {(title || description) && (
        <div className="p-4 bg-white dark:bg-sahara-brown/20">
          {title && <h3 className="text-lg font-semibold text-sahara-terracotta">{title}</h3>}
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
