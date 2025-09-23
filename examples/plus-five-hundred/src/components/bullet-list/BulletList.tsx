import React, { JSX } from 'react';
import {
  Text as ContentSdkText,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { motion } from 'framer-motion';
import styles from './BulletList.module.css';

interface BulletListItem {
  id: string;
  fields: {
    Text: Field<string>;
    Icon: Field<{
      value: {
        src: string;
        alt: string;
      };
    }>;
    Subtext: Field<string>;
    Badge?: Field<string>; // Added for additional info like "2024"
  };
}

interface Fields {
  Heading: Field<string>;
  Items: BulletListItem[];
}

type BulletListProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: BulletListProps): JSX.Element => {
  if (props.fields || props.params) {
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
      <section className={`component ${styles.bulletList} ${styles['bulletList--default']}`} data-testid="bullet-list">
        <div className="component-content">
          <div className={styles.bulletContainer}>
            {/* Heading */}
            {props.fields?.Heading?.value && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.bulletHeading}
              >
                <ContentSdkText
                  field={props.fields.Heading}
                  tag="h2"
                  className={styles.headingText}
                />
              </motion.div>
            )}

            {/* Items List */}
            {props.fields?.Items && props.fields.Items.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={styles.bulletItems}
              >
                <ul className={styles.itemsContent}>
                  {props.fields.Items.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className={styles.bulletItem}
                    >
                      {item.fields?.Icon?.value?.src && (
                        <div className={styles.bulletIcon}>
                          <img
                            src={item.fields.Icon.value.src}
                            alt={item.fields.Icon.value.alt || ''}
                            className={styles.iconImage}
                          />
                        </div>
                      )}
                      <div className={styles.bulletContent}>
                        {item.fields?.Text?.value && (
                          <ContentSdkText
                            field={item.fields.Text}
                            tag="h3"
                            className={styles.bulletText}
                          />
                        )}
                        {item.fields?.Subtext?.value && (
                          <ContentSdkText
                            field={item.fields.Subtext}
                            tag="p"
                            className={styles.bulletSubtext}
                          />
                        )}
                        {item.fields?.Badge?.value && (
                          <ContentSdkText
                            field={item.fields.Badge}
                            tag="span"
                            className={styles.bulletBadge}
                          />
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback content when no fields are available
  return (
    <section className={`component ${styles.bulletList} ${styles['bulletList--default']}`} data-testid="bullet-list">
      <div className="component-content">
        <div className={styles.bulletContainer}>
          <div className={styles.bulletHeading}>
            <h2 className={styles.headingText}>
              Key Features
            </h2>
          </div>

          <div className={styles.bulletItems}>
            <div className={styles.itemsContent}>
              <ul>
                <li>🛡️ <strong>Regulated & Secure</strong> - FCA, CySEC, ASIC regulated with client funds protection</li>
                <li>🕒 <strong>24/7 Trading</strong> - Trade major markets around the clock with advanced platform</li>
                <li>🌍 <strong>Global Markets</strong> - Access thousands of instruments across multiple asset classes</li>
                <li>📈 <strong>Competitive Spreads</strong> - Enjoy tight spreads and transparent pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Cards = (props: BulletListProps): JSX.Element => {
  if (props.fields || props.params) {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
        },
      },
    };

    const cardVariants = {
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 15
        }
      },
    };

    return (
      <section className={`component ${styles.bulletList} ${styles['bulletList--cards']}`} data-testid="bullet-list-cards">
        <div className="component-content">
          <div className={styles.bulletContainer}>
            {/* Heading */}
            {props.fields?.Heading?.value && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={styles.bulletHeading}
              >
                <ContentSdkText
                  field={props.fields.Heading}
                  tag="h2"
                  className={styles.headingText}
                />
              </motion.div>
            )}

            {/* Cards Grid */}
            {props.fields?.Items && props.fields.Items.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={styles.cardsGrid}
              >
                {props.fields.Items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className={styles.card}
                  >
                    {/* Icon */}
                    {item.fields?.Icon?.value?.src && (
                      <div className={styles.cardIcon}>
                        <img
                          src={item.fields.Icon.value.src}
                          alt={item.fields.Icon.value.alt || ''}
                          className={styles.cardIconImage}
                        />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className={styles.cardContent}>
                      {item.fields?.Text?.value && (
                        <ContentSdkText
                          field={item.fields.Text}
                          tag="h3"
                          className={styles.cardTitle}
                        />
                      )}
                      {item.fields?.Subtext?.value && (
                        <ContentSdkText
                          field={item.fields.Subtext}
                          tag="p"
                          className={styles.cardDescription}
                        />
                      )}
                      {item.fields?.Badge?.value && (
                        <ContentSdkText
                          field={item.fields.Badge}
                          tag="span"
                          className={styles.cardBadge}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback cards content when no fields are available
  return (
    <section className={`component ${styles.bulletList} ${styles['bulletList--cards']}`} data-testid="bullet-list-cards">
      <div className="component-content">
        <div className={styles.bulletContainer}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.bulletHeading}
          >
            <h2 className={styles.headingText}>Awards & Recognition</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className={styles.cardsGrid}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={styles.card}
            >
              <div className={styles.cardIcon}>
                <div className={styles.cardIconPlaceholder}>🏆</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Best Trading Platform</h3>
                <p className={styles.cardDescription}>
                  Awarded for excellence in trading platform innovation and user experience
                </p>
                <span className={styles.cardBadge}>2024</span>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={styles.card}
            >
              <div className={styles.cardIcon}>
                <div className={styles.cardIconPlaceholder}>⭐</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>5-Star Rating</h3>
                <p className={styles.cardDescription}>
                  Consistently rated 5 stars by traders for reliability and performance
                </p>
                <span className={styles.cardBadge}>2024</span>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={styles.card}
            >
              <div className={styles.cardIcon}>
                <div className={styles.cardIconPlaceholder}>🛡️</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Regulated & Licensed</h3>
                <p className={styles.cardDescription}>
                  Fully regulated by FCA, CySEC, and ASIC for maximum security
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={styles.card}
            >
              <div className={styles.cardIcon}>
                <div className={styles.cardIconPlaceholder}>✓</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Trusted by Millions</h3>
                <p className={styles.cardDescription}>
                  Over 25 million registered users worldwide trust our platform
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Compact = (props: BulletListProps): JSX.Element => {
  const component = Default(props);

  return React.cloneElement(component, {
    className: component.props.className.replace('bulletList--default', 'bulletList--compact')
  });
};

export const Grid = (props: BulletListProps): JSX.Element => {
  const component = Default(props);

  return React.cloneElement(component, {
    className: component.props.className.replace('bulletList--default', 'bulletList--grid')
  });
};

export const Minimal = (props: BulletListProps): JSX.Element => {
  const component = Default(props);

  return React.cloneElement(component, {
    className: component.props.className.replace('bulletList--default', 'bulletList--minimal')
  });
};

export const Numbered = (props: BulletListProps): JSX.Element => {
  const component = Default(props);

  return React.cloneElement(component, {
    className: component.props.className.replace('bulletList--default', 'bulletList--numbered')
  });
};

// Default export for Sitecore SDK compatibility
export default Default;