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
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 rtl:text-right ltr:text-left"
            variants={fadeInUp}
          >
            {isEditing ? (
              <Text
                field={fields?.Heading || { value: '' }}
                tag="span"
              />
            ) : (
              title && title
            )}
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto rtl:text-right ltr:text-left"
            variants={fadeInUp}
          >
            {isEditing ? (
              <Text
                field={fields?.SubTitle || { value: '' }}
                tag="span"
              />
            ) : (
              subtitle && subtitle
            )}
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {isEditing && (!faqItems || faqItems.length === 0) ? (
            <div className="min-h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50">
              {/* Empty div for selecting component in page editor */}
            </div>
          ) : (
            <Accordion
              type={allowMultipleOpen ? "multiple" : "single"}
              className="space-y-4"
            >
              {((isEditing && faqItems) || (faqItems && Array.isArray(faqItems))) && faqItems.map((faqItem, index) => {
                // In editing mode, show all items even if fields are empty
                // In production, skip invalid items
                if (!isEditing && (!faqItem || !faqItem.fields)) {
                  return null;
                }

                const question = faqItem?.fields?.Question?.value;
                const answer = faqItem?.fields?.Answer?.value;
                const questionField = faqItem?.fields?.Question || { value: '' };
                const answerField = faqItem?.fields?.Answer || { value: '' };

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
                    <AccordionTrigger className="text-left rtl:text-right text-lg font-semibold hover:no-underline">
                      {isEditing ? (
                        <Text
                          field={questionField}
                          tag="span"
                          className="min-h-6 inline-block w-full"
                        />
                      ) : (
                        question || faqItem.displayName
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2 rtl:text-right ltr:text-left">
                      {isEditing ? (
                        <p className="text-sm italic text-gray-500">Answer field is displayed below for editing</p>
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
          )}
        </motion.div>

        {/* Answer Fields Section - Only visible in editing mode */}
        {isEditing && faqItems && Array.isArray(faqItems) && (
          <motion.div
            className="max-w-4xl mx-auto mt-12 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
          >
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">FAQ Answer Fields (Edit Mode Only)</h3>
            {faqItems.map((faqItem, index) => {
              if (!faqItem) return null;

              const question = faqItem?.fields?.Question?.value;
              const answerField = faqItem?.fields?.Answer || { value: '' };

              return (
                <motion.div
                  key={`answer-${faqItem.id}`}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4"
                  variants={fadeInUp}
                >
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-600">
                      Question {index + 1}: {question || `FAQ Item ${index + 1}`}
                    </label>
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-700">Answer:</label>
                  </div>
                  <div className="min-h-24 w-full bg-white border border-gray-300 rounded p-3">
                    <Text
                      field={answerField}
                      tag="div"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
};