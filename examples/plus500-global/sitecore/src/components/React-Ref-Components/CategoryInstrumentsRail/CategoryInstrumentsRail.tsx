import React from "react";
import {
  Text,
  NextImage as ContentSdkImage,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryInstrumentsRailProps } from './categoryinstrumentsrail.props';
import { fadeInUp, staggerContainer, viewportSettings } from '../../../utils/animations';

// Helper function to parse percentage and determine if positive/negative
const parsePercentageChange = (percentageString: string) => {
  if (!percentageString) return { isPositive: null, value: '', cleanValue: '' };

  // Remove whitespace and check for + or - at the beginning
  const cleanString = percentageString.trim();
  const isPositive = cleanString.startsWith('+');
  const isNegative = cleanString.startsWith('-');

  return {
    isPositive: isPositive ? true : isNegative ? false : null,
    value: cleanString,
    cleanValue: cleanString.replace(/^[+-]/, '') // Remove leading +/- for display
  };
};

export const Default: React.FC<CategoryInstrumentsRailProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields
  const { fields } = props;
  const heading = fields?.Heading?.value;
  const items = fields?.Items || [];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          {isEditing ? (
            <Text
              field={fields?.Heading || { value: '' }}
              tag="h2"
              className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left"
            />
          ) : (
            heading && <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={viewportSettings}
              className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left"
            >
              {heading}
            </motion.h2>
          )}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          dir="ltr"
        >
          {isEditing && (!items || items.length === 0) ? (
            <div className="min-h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50 col-span-full">
              {/* Empty div for selecting component in page editor */}
            </div>
          ) : (
            items && Array.isArray(items) && items.map((item, index) => {
              // In editing mode, always show items
              // In production, skip invalid items
              if (!isEditing && (!item || !item.fields)) {
                return null;
              }

              // In editing mode, ensure item has at least an id for key
              if (isEditing && !item) {
                return null;
              }

              const symbol = item?.fields?.Text?.value;
              const name = item?.fields?.Subtext?.value;
              const price = item?.fields?.Money?.value;
              const percentageString = item?.fields?.Percentage?.value;

              // Create fallback fields even if item.fields is undefined
              const textField = (item?.fields?.Text) || { value: '' };
              const subtextField = (item?.fields?.Subtext) || { value: '' };
              const moneyField = (item?.fields?.Money) || { value: '' };
              const percentageField = (item?.fields?.Percentage) || { value: '' };

            // Parse percentage to determine trend
            const { isPositive, value: percentageValue } = parsePercentageChange(percentageString);

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="bg-card p-6 rounded-lg border hover-elevate cursor-pointer group"
                data-testid={`instrument-card-${symbol}`}
              >
                {/* Header with Symbol/Name and Trend Icon */}
                <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
                  <div>
                    <h3 className="font-bold text-lg rtl:text-right ltr:text-left">
                      {isEditing ? (
                        <Text
                          field={textField}
                          tag="span"
                          className="min-h-6 block w-full bg-gray-50 border border-dashed border-gray-300 px-2 py-1 rounded"
                        />
                      ) : (
                        symbol && symbol
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground rtl:text-right ltr:text-left">
                      {isEditing ? (
                        <Text
                          field={subtextField}
                          tag="span"
                          className="min-h-5 block w-full bg-gray-50 border border-dashed border-gray-300 px-2 py-1 rounded text-sm"
                        />
                      ) : (
                        name && name
                      )}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    isPositive === true
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : isPositive === false
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isPositive === true && (
                      <TrendingUp className="h-4 w-4" />
                    )}
                    {isPositive === false && (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {isPositive === null && (
                      <div className="h-4 w-4" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Price */}
                  <div className="text-2xl font-bold rtl:text-right ltr:text-left">
                    {isEditing ? (
                      <Text
                        field={moneyField}
                        tag="span"
                        className="min-h-8 block w-full bg-gray-50 border border-dashed border-gray-300 px-2 py-1 rounded text-2xl font-bold"
                      />
                    ) : (
                      price && price
                    )}
                  </div>

                  {/* Percentage Change */}
                  <div className={`flex items-center space-x-2 text-sm ${
                    isPositive === true
                      ? 'text-green-600 dark:text-green-400'
                      : isPositive === false
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-muted-foreground'
                  }`}>
                    <span>
                      {isEditing ? (
                        <Text
                          field={percentageField}
                          tag="span"
                          className="min-h-5 inline-block min-w-12 bg-gray-50 border border-dashed border-gray-300 px-2 py-1 rounded text-sm"
                        />
                      ) : (
                        percentageValue
                      )}
                      </span>
                    </div>
                </div>
              </motion.div>
            );
            }))}
        </motion.div>
      </div>
    </section>
  );
};