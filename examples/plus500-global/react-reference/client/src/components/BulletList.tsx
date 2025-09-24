import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface BulletItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BulletListProps {
  items: BulletItem[];
  title?: string;
  columns?: 1 | 2 | 3 | 4;
}

export default function BulletList({
  items,
  title,
  columns = 3,
}: BulletListProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

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
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {title}
          </motion.h2>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${columnClasses[columns]} gap-8`}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
              data-testid={`bullet-item-${index}`}
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}