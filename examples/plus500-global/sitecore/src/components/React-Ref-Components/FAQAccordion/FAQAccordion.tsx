import React from "react";
import {
  Text,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import SafeRichText from '../../SafeRichText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FAQAccordionProps } from './faqaccordion.props';
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

export const Default: React.FC<FAQAccordionProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields
  const { fields } = props;
  const title = fields?.Heading?.value;
  const subtitle = fields?.SubTitle?.value;
  const allowMultipleOpen = fields?.AllowMultipleOpen?.value;
  const faqItems = fields?.Items || [];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {title && (
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              {isEditing ? (
                <Text
                  field={fields?.Heading}
                  tag="span"
                />
              ) : (
                title
              )}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              {isEditing ? (
                <Text
                  field={fields?.SubTitle}
                  tag="span"
                />
              ) : (
                subtitle
              )}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <Accordion
            type={allowMultipleOpen ? "multiple" : "single"}
            className="space-y-4"
          >
            {faqItems && Array.isArray(faqItems) && faqItems.map((faqItem, index) => {
              // Skip invalid items
              if (!faqItem || !faqItem.fields) {
                return null;
              }

              const question = faqItem?.fields?.Question?.value;
              const answer = faqItem?.fields?.Answer?.value;

              return (
                <motion.div
                  key={faqItem.id}
                  data-testid={`faq-item-${index}`}
                  variants={fadeInUp}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border rounded-lg px-6 hover-elevate"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                      {isEditing ? (
                        <Text
                          field={faqItem.fields?.Question}
                          tag="span"
                        />
                      ) : (
                        question || faqItem.displayName
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                      {isEditing ? (
                        <SafeRichText
                          field={faqItem.fields?.Answer}
                          className="prose prose-sm max-w-none"
                        />
                      ) : (
                        answer && (
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br>') }}
                          />
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
};