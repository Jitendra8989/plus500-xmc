import { motion } from "framer-motion";
import { Check, X, Star } from "lucide-react";

interface TableRow {
  feature: string;
  plus500: boolean | string;
  competitor1: boolean | string;
  competitor2: boolean | string;
  highlighted?: boolean;
}

interface ComparisonTableProps {
  title: string;
  subtitle?: string;
  headers: {
    plus500: string;
    competitor1: string;
    competitor2: string;
  };
  rows: TableRow[];
}

export default function ComparisonTable({
  title,
  subtitle,
  headers,
  rows,
}: ComparisonTableProps) {
  const renderCell = (value: boolean | string, isPlus500: boolean = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className={`h-5 w-5 mx-auto ${isPlus500 ? "text-primary" : "text-green-500"}`} />
      ) : (
        <X className="h-5 w-5 mx-auto text-red-500" />
      );
    }
    return (
      <span className={`font-medium ${isPlus500 ? "text-primary" : ""}`}>
        {value}
      </span>
    );
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-card rounded-lg border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-muted/50">
              <div className="p-4 font-semibold">Features</div>
              <div className="p-4 text-center relative">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">{headers.plus500}</span>
                </div>
              </div>
              <div className="p-4 text-center font-semibold">{headers.competitor1}</div>
              <div className="p-4 text-center font-semibold">{headers.competitor2}</div>
            </div>

            {/* Rows */}
            {rows.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-4 border-t hover:bg-muted/20 transition-colors ${
                  row.highlighted ? "bg-primary/5" : ""
                }`}
                data-testid={`comparison-row-${index}`}
              >
                <div className="p-4 font-medium">{row.feature}</div>
                <div className="p-4 text-center">
                  {renderCell(row.plus500, true)}
                </div>
                <div className="p-4 text-center">
                  {renderCell(row.competitor1)}
                </div>
                <div className="p-4 text-center">
                  {renderCell(row.competitor2)}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground">
              * Comparison based on publicly available information as of 2024
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}