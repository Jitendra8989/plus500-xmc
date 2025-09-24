import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp } from "lucide-react";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

export default function HeroBanner({
  title,
  subtitle,
  backgroundImage,
  ctaText = "Start Trading",
  secondaryCtaText = "Try Demo",
  onCtaClick,
  onSecondaryCtaClick,
}: HeroBannerProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl font-bold text-white md:text-7xl"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-xl text-white/90 md:text-2xl"
            >
              {subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={onCtaClick}
                data-testid="button-hero-cta"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                {ctaText}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg backdrop-blur-sm"
                onClick={onSecondaryCtaClick}
                data-testid="button-hero-secondary"
              >
                <Play className="mr-2 h-5 w-5" />
                {secondaryCtaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-12 w-6 rounded-full border-2 border-white/50 p-1"
        >
          <div className="h-2 w-2 rounded-full bg-white/50 mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}