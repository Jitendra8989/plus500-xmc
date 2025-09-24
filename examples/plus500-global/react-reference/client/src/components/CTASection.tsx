import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundVariant?: "gradient" | "solid" | "image";
  backgroundImage?: string;
}

export default function CTASection({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  backgroundVariant = "gradient",
  backgroundImage,
}: CTASectionProps) {
  const backgroundClasses = {
    gradient: "bg-gradient-to-r from-primary via-primary/90 to-blue-600",
    solid: "bg-primary",
    image: "bg-cover bg-center bg-no-repeat",
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div 
        className={`absolute inset-0 ${backgroundClasses[backgroundVariant]}`}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      />
      
      {/* Gradient overlay for image backgrounds */}
      {backgroundVariant === "image" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90" />
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
                onClick={onPrimaryClick}
                data-testid="button-cta-primary"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {secondaryButtonText && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg backdrop-blur-sm"
                  onClick={onSecondaryClick}
                  data-testid="button-cta-secondary"
                >
                  {secondaryButtonText}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}