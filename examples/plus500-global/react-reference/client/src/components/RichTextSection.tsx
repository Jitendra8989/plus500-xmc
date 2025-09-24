import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RichTextSectionProps {
  title?: string;
  content: ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: "default" | "muted";
  maxWidth?: "default" | "wide" | "full";
}

export default function RichTextSection({
  title,
  content,
  image,
  imageAlt = "",
  imagePosition = "right",
  backgroundColor = "default",
  maxWidth = "default",
}: RichTextSectionProps) {
  const containerClasses = {
    default: "bg-background",
    muted: "bg-muted/20",
  };

  const widthClasses = {
    default: "max-w-6xl",
    wide: "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <section className={`py-16 ${containerClasses[backgroundColor]}`}>
      <div className={`container mx-auto px-6 ${widthClasses[maxWidth]}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${imagePosition === "left" ? "lg:order-2" : ""}`}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {title}
              </h2>
            )}
            <div className="prose prose-lg max-w-none">
              {content}
            </div>
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, x: imagePosition === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${imagePosition === "left" ? "lg:order-1" : ""}`}
            >
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto rounded-lg shadow-lg"
                data-testid="image-rich-text"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}