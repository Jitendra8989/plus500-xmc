import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  ImageField,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './ImageWithCaption.module.css';

interface Fields {
  Image: ImageField;
  Alt: Field<string>;
  Caption: Field<string>;
  Alignment: Field<string>;
}

type ImageWithCaptionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: ImageWithCaptionProps): JSX.Element => {
  if (props.fields || props.params) {
    // Get alignment from fields or params
    const alignment = props.fields?.Alignment?.value || props.params?.FieldNames || 'Default';

    // Determine container class based on alignment
    let containerClass = styles.imageWithCaption;

    switch (alignment.toLowerCase()) {
      case 'left':
        containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--left']}`;
        break;
      case 'center':
      case 'centre':
        containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--center']}`;
        break;
      case 'right':
        containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--right']}`;
        break;
      case 'full':
      case 'fullwidth':
        containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--full']}`;
        break;
      default:
        containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--default']}`;
        break;
    }

    return (
      <div
        className={`component ${containerClass} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          <figure className={styles.imageWithCaptionFigure}>
            {props.fields?.Image?.value && (
              <div className={styles.imageContainer}>
                <ContentSdkImage
                  field={props.fields.Image}
                  className={styles.image}
                  alt={props.fields?.Alt?.value || ''}
                  width={800}
                  height={600}
                />
              </div>
            )}

            {props.fields?.Caption?.value && (
              <figcaption className={styles.caption}>
                <ContentSdkText
                  field={props.fields.Caption}
                  className={styles.captionText}
                  tag="span"
                />
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    );
  }

  // Fallback content when no fields are available
  return (
    <div className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--default']}`}>
      <div className="component-content">
        <figure className={styles.imageWithCaptionFigure}>
          <div className={styles.imageContainer}>
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>Image Placeholder</span>
            </div>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionText}>Sample image caption text goes here</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export const Minimal = (props: ImageWithCaptionProps): JSX.Element => {
  if (props.fields || props.params) {
    const alignment = props.fields?.Alignment?.value || props.params?.FieldNames || 'Default';

    let containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--minimal']}`;

    switch (alignment.toLowerCase()) {
      case 'left':
        containerClass += ` ${styles['imageWithCaption--left']}`;
        break;
      case 'center':
      case 'centre':
        containerClass += ` ${styles['imageWithCaption--center']}`;
        break;
      case 'right':
        containerClass += ` ${styles['imageWithCaption--right']}`;
        break;
      case 'full':
      case 'fullwidth':
        containerClass += ` ${styles['imageWithCaption--full']}`;
        break;
    }

    return (
      <div className={`component ${containerClass}`} id={props.params?.RenderingIdentifier}>
        <div className="component-content">
          <figure className={styles.imageWithCaptionFigure}>
            {props.fields?.Image?.value && (
              <div className={styles.imageContainer}>
                <ContentSdkImage
                  field={props.fields.Image}
                  className={styles.image}
                  alt={props.fields?.Alt?.value || ''}
                  width={600}
                  height={400}
                />
              </div>
            )}

            {props.fields?.Caption?.value && (
              <figcaption className={styles.caption}>
                <ContentSdkText
                  field={props.fields.Caption}
                  className={styles.captionText}
                  tag="span"
                />
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    );
  }

  return (
    <div className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--minimal']}`}>
      <div className="component-content">
        <figure className={styles.imageWithCaptionFigure}>
          <div className={styles.imageContainer}>
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>Image</span>
            </div>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionText}>Caption</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export const Card = (props: ImageWithCaptionProps): JSX.Element => {
  if (props.fields || props.params) {
    const alignment = props.fields?.Alignment?.value || props.params?.FieldNames || 'Default';

    let containerClass = `${styles.imageWithCaption} ${styles['imageWithCaption--card']}`;

    switch (alignment.toLowerCase()) {
      case 'left':
        containerClass += ` ${styles['imageWithCaption--left']}`;
        break;
      case 'center':
      case 'centre':
        containerClass += ` ${styles['imageWithCaption--center']}`;
        break;
      case 'right':
        containerClass += ` ${styles['imageWithCaption--right']}`;
        break;
      case 'full':
      case 'fullwidth':
        containerClass += ` ${styles['imageWithCaption--full']}`;
        break;
    }

    return (
      <div className={`component ${containerClass}`} id={props.params?.RenderingIdentifier}>
        <div className="component-content">
          <figure className={styles.imageWithCaptionFigure}>
            {props.fields?.Image?.value && (
              <div className={styles.imageContainer}>
                <ContentSdkImage
                  field={props.fields.Image}
                  className={styles.image}
                  alt={props.fields?.Alt?.value || ''}
                  width={400}
                  height={300}
                />
              </div>
            )}

            {props.fields?.Caption?.value && (
              <figcaption className={styles.caption}>
                <ContentSdkText
                  field={props.fields.Caption}
                  className={styles.captionText}
                  tag="span"
                />
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    );
  }

  return (
    <div className={`component ${styles.imageWithCaption} ${styles['imageWithCaption--card']}`}>
      <div className="component-content">
        <figure className={styles.imageWithCaptionFigure}>
          <div className={styles.imageContainer}>
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderText}>Card Image</span>
            </div>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionText}>Card Caption</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

// Default export for Sitecore SDK compatibility
export default Default;
