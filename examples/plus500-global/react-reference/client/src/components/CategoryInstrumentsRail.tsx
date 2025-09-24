import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface InstrumentData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface CategoryInstrumentsRailProps {
  title: string;
  instruments: InstrumentData[];
}

function CountUpNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setDisplayValue(value * progress);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{displayValue.toFixed(2)}</span>;
}

export default function CategoryInstrumentsRail({
  title,
  instruments,
}: CategoryInstrumentsRailProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {instruments.map((instrument, index) => (
            <motion.div
              key={instrument.symbol}
              variants={itemVariants}
              className="bg-card p-6 rounded-lg border hover-elevate cursor-pointer group"
              data-testid={`instrument-card-${instrument.symbol}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{instrument.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{instrument.name}</p>
                </div>
                <div className={`p-2 rounded-full ${
                  instrument.change >= 0 
                    ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                    : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                  {instrument.change >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  $<CountUpNumber value={instrument.price} />
                </div>
                
                <div className={`flex items-center space-x-2 text-sm ${
                  instrument.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  <span>
                    {instrument.change >= 0 ? "+" : ""}
                    <CountUpNumber value={instrument.change} />
                  </span>
                  <span>
                    ({instrument.changePercent >= 0 ? "+" : ""}
                    <CountUpNumber value={instrument.changePercent} />%)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}