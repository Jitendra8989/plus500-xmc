import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  ImageField,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { motion } from 'framer-motion';
import styles from './ImageWithCaption.module.css';

interface Fields {
  Image: ImageField;
  Alt: Field<string>;
  Caption: Field<string>;
  Alignment: Field<string>;
  ImageWidth?: Field<string>;
  ImageHeight?: Field<string>;
}

type ImageWithCaptionProps = ComponentProps & {
  fields: Fields;
};

// Base component with shared logic
const ImageWithCaptionBase = (
  props: ImageWithCaptionProps, 
  variant: 'default' | 'left' | 'right' | 'center' | 'minimal' | 'card',
  customStyles?: string
): JSX.Element => {
  const containerClass = `${styles.imageWithCaption} ${styles[`imageWithCaption--${variant}`]} ${customStyles || ''}`;

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const captionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    },
  };

  if (props.fields || props.params) {
    return (
      <motion.div
        className={`component ${containerClass} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="component-content">
          <figure className={styles.imageWithCaptionFigure}>
            {props.fields?.Image?.value && (
              <motion.div 
                className={styles.imageContainer}
                variants={imageAnimation}
              >
                <ContentSdkImage
                  field={props.fields.Image}
                  className={styles.image}
                  alt={props.fields?.Alt?.value || ''}
                  width={parseInt(props.fields?.ImageWidth?.value || '800')}
                  height={parseInt(props.fields?.ImageHeight?.value || '600')}
                />
              </motion.div>
            )}

            {props.fields?.Caption?.value && (
              <motion.figcaption 
                className={styles.caption}
                variants={captionAnimation}
              >
                <ContentSdkText
                  field={props.fields.Caption}
                  className={styles.captionText}
                  tag="span"
                />
              </motion.figcaption>
            )}
          </figure>
        </div>
      </motion.div>
    );
  }

  // Fallback content when no fields are available
  const fallbackContent = {
    default: "Centered image with professional styling",
    left: "Image aligned to the left with caption below",
    right: "Image aligned to the right with caption below", 
    center: "Image centered with caption below",
    minimal: "Minimal image with simple caption",
    card: "Card-style image presentation"
  };

  return (
    <motion.div 
      className={`component ${containerClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="component-content">
        <figure className={styles.imageWithCaptionFigure}>
          <motion.div 
            className={styles.imageContainer}
            variants={imageAnimation}
          >
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Image
              </span>
            </div>
          </motion.div>
          <motion.figcaption 
            className={styles.caption}
            variants={captionAnimation}
          >
            <span className={styles.captionText}>
              {fallbackContent[variant]}
            </span>
          </motion.figcaption>
        </figure>
      </div>
    </motion.div>
  );
};

export const Default = (props: ImageWithCaptionProps): JSX.Element => {
  return ImageWithCaptionBase(props, 'default');
};

export const Left = (props: ImageWithCaptionProps): JSX.Element => {
  return ImageWithCaptionBase(props, 'left');
};

export const Right = (props: ImageWithCaptionProps): JSX.Element => {
  return ImageWithCaptionBase(props, 'right');
};

export const Center = (props: ImageWithCaptionProps): JSX.Element => {
  return ImageWithCaptionBase(props, 'center');
};

export const Minimal = (props: ImageWithCaptionProps): JSX.Element => {
  return ImageWithCaptionBase(props, 'minimal');
};

export const Card = (props: ImageWithCaptionProps): JSX.Element => {
  return ImageWithCaptionBase(props, 'card');
};

// Advanced variant that uses content-based positioning
export const ContentLeft = (props: ImageWithCaptionProps): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <motion.div
        className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--contentLeft']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="component-content">
          <div className={styles.contentLayout}>
            {/* Image on Left */}
            {props.fields?.Image?.value && (
              <motion.div 
                className={styles.imageSection}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ContentSdkImage
                  field={props.fields.Image}
                  className={styles.contentImage}
                  alt={props.fields?.Alt?.value || ''}
                  width={400}
                  height={300}
                />
              </motion.div>
            )}

            {/* Caption/Content on Right */}
            {props.fields?.Caption?.value && (
              <motion.div 
                className={styles.captionSection}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ContentSdkText
                  field={props.fields.Caption}
                  className={styles.contentCaption}
                  tag="div"
                />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Fallback
  return (
    <div className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--contentLeft']}`}>
      <div className="component-content">
        <div className={styles.contentLayout}>
          <div className={styles.imageSection}>
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>Image Left</span>
            </div>
          </div>
          <div className={styles.captionSection}>
            <div className={styles.contentCaption}>
              <h3>Content on Right</h3>
              <p>This layout places the image on the left with content/caption on the right side. Perfect for feature descriptions or detailed explanations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContentRight = (props: ImageWithCaptionProps): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <motion.div
        className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--contentRight']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="component-content">
          <div className={styles.contentLayout}>
            {/* Caption/Content on Left */}
            {props.fields?.Caption?.value && (
              <motion.div 
                className={styles.captionSection}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ContentSdkText
                  field={props.fields.Caption}
                  className={styles.contentCaption}
                  tag="div"
                />
              </motion.div>
            )}

            {/* Image on Right */}
            {props.fields?.Image?.value && (
              <motion.div 
                className={styles.imageSection}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ContentSdkImage
                  field={props.fields.Image}
                  className={styles.contentImage}
                  alt={props.fields?.Alt?.value || ''}
                  width={400}
                  height={300}
                />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Fallback
  return (
    <div className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--contentRight']}`}>
      <div className="component-content">
        <div className={styles.contentLayout}>
          <div className={styles.captionSection}>
            <div className={styles.contentCaption}>
              <h3>Content on Left</h3>
              <p>This layout places the content/caption on the left with the image on the right side. Great for alternating content layouts.</p>
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>Image Right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default export for Sitecore SDK compatibility
export default Default;