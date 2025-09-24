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
        {heading && (
          <div className="text-center mb-12">
            {isEditing ? (
              <Text
                field={fields?.Heading}
                tag="h2"
                className="text-3xl md:text-4xl font-bold"
              />
            ) : (
              <motion.h2
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={viewportSettings}
                className="text-3xl md:text-4xl font-bold"
              >
                {heading}
              </motion.h2>
            )}
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items && Array.isArray(items) && items.map((item, index) => {
            // Skip invalid items
            if (!item || !item.fields) {
              return null;
            }

            const symbol = item?.fields?.Text?.value;
            const name = item?.fields?.Subtext?.value;
            const price = item?.fields?.Money?.value;
            const percentageString = item?.fields?.Percentage?.value;

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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {symbol && (
                      <h3 className="font-bold text-lg">
                        {isEditing ? (
                          <Text
                            field={item.fields?.Text}
                            tag="span"
                          />
                        ) : (
                          symbol
                        )}
                      </h3>
                    )}
                    {name && (
                      <p className="text-sm text-muted-foreground">
                        {isEditing ? (
                          <Text
                            field={item.fields?.Subtext}
                            tag="span"
                          />
                        ) : (
                          name
                        )}
                      </p>
                    )}
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
                  {price && (
                    <div className="text-2xl font-bold">
                      {isEditing ? (
                        <Text
                          field={item.fields?.Money}
                          tag="span"
                        />
                      ) : (
                        price
                      )}
                    </div>
                  )}

                  {/* Percentage Change */}
                  {percentageString && (
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
                            field={item.fields?.Percentage}
                            tag="span"
                          />
                        ) : (
                          percentageValue
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};