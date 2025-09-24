import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  completed?: boolean;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  showProgress?: boolean;
}

export default function Timeline({
  items,
  title,
  showProgress = true,
}: TimelineProps) {
  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = (completedCount / items.length) * 100;

  return (
    <section className="py-16 bg-background">
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

        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12 text-center"
          >
            <div className="mb-4">
              <span className="text-2xl font-bold text-primary">
                {completedCount}/{items.length}
              </span>
              <span className="text-muted-foreground ml-2">Steps Completed</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-primary h-2 rounded-full"
              />
            </div>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            
            {/* Animated Progress Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(completedCount / items.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-8 top-0 w-0.5 bg-primary"
            />

            <div className="space-y-8">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start"
                  data-testid={`timeline-item-${index}`}
                >
                  {/* Icon/Dot */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary mr-6">
                    {item.icon ? (
                      <div className="text-primary">
                        {item.icon}
                      </div>
                    ) : item.completed ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-card p-6 rounded-lg border hover-elevate">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        {item.date && (
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {item.date}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}