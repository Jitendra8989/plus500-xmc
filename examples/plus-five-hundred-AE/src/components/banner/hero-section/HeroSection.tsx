import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './HeroSection.module.css';

interface Fields {
  Title: Field<string>;
  Subtitle: Field<string>;
  Description: RichTextField;
  Features: RichTextField;
  PrimaryCTA: LinkField;
  SecondaryCTA: LinkField;
  Image: ImageField;
  BackgroundImage: ImageField;
  IsImageLeft: Field<boolean>;
}

type HeroSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    const layout = props.params?.Layout || 'split';
    const isImageLeft = props.fields?.IsImageLeft?.value || false;

    // Determine container class with image positioning
    let containerClass =
      layout === 'centered'
        ? styles.heroSectionCentered
        : layout === 'fullscreen'
          ? styles.heroSectionFullscreen
          : styles.heroSectionSplit;

    // Add image positioning class for split layout (default layout)
    if (layout === 'split' || !layout || layout === undefined || layout === '') {
      const imagePositionClass = isImageLeft
        ? styles['heroSectionSplit--imageLeft']
        : styles['heroSectionSplit--imageRight'];
      containerClass = `${containerClass} ${imagePositionClass}`;
    }

    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--default']}`}
        role="banner"
      >
        <div className="component-content">
          {props.fields?.BackgroundImage?.value && (
            <div className={styles.backgroundImage}>
              <ContentSdkImage
                field={props.fields?.BackgroundImage}
                width={1920}
                height={1080}
                priority
              />
            </div>
          )}

          <div className={styles.heroOverlay}>
            <div className={styles.radialBlue}></div>
            <div className={styles.radialBlue} style={{ top: '60%', right: '20%' }}></div>
          </div>

          <div className={containerClass}>
            <div className={styles.heroContent}>
              {props.fields?.Title?.value && (
                <ContentSdkText field={props.fields?.Title} className={styles.heroTitle} tag="h1" />
              )}

              {props.fields?.Subtitle?.value && (
                <ContentSdkText
                  field={props.fields?.Subtitle}
                  className={styles.heroSubtitle}
                  tag="h2"
                />
              )}

              {props.fields?.Description?.value && (
                <ContentSdkRichText
                  field={props.fields?.Description}
                  className={styles.heroDescription}
                />
              )}

              {props.fields?.Features?.value && (
                <ContentSdkRichText
                  field={props.fields?.Features}
                  className={styles.heroFeatures}
                />
              )}

              <div className={styles.heroActions}>
                {(props.fields?.PrimaryCTA?.value?.href ||
                  props.fields?.PrimaryCTA?.value?.text) && (
                  <ContentSdkLink field={props.fields?.PrimaryCTA} className={styles.ctaPrimary} />
                )}
                {(props.fields?.SecondaryCTA?.value?.href ||
                  props.fields?.SecondaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields?.SecondaryCTA}
                    className={styles.ctaSecondary}
                  />
                )}
              </div>
            </div>

            {layout !== 'centered' && layout !== 'fullscreen' && props.fields?.Image?.value && (
              <div className={styles.heroImageWrapper}>
                <ContentSdkImage
                  field={props.fields?.Image}
                  className={styles.heroImage}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`component ${styles.heroSection} ${styles['heroSection--default']}`}
      role="banner"
    >
      <div className="component-content">
        <div className={styles.heroOverlay}>
          <div className={styles.radialBlue}></div>
          <div className={styles.radialBlue} style={{ top: '60%', right: '20%' }}></div>
        </div>

        <div className={styles.heroSectionSplit}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to Plus500</h1>
            <h2 className={styles.heroSubtitle}>Your Gateway to Trading Success</h2>
            <p className={styles.heroDescription}>
              Trade CFDs on shares, indices, commodities, and more with our professional trading
              platform.
            </p>

            <div className={styles.heroActions}>
              <a href="#" className={styles.ctaPrimary}>
                Start Trading
              </a>
              <a href="#" className={styles.ctaSecondary}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Dark = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    const layout = props.params?.Layout || 'split';
    const isImageLeft = props.fields?.IsImageLeft?.value || false;

    // Determine container class with image positioning
    let containerClass =
      layout === 'centered'
        ? styles.heroSectionCentered
        : layout === 'fullscreen'
          ? styles.heroSectionFullscreen
          : styles.heroSectionSplit;

    // Add image positioning class for split layout (default layout)
    if (layout === 'split' || !layout || layout === undefined || layout === '') {
      const imagePositionClass = isImageLeft
        ? styles['heroSectionSplit--imageLeft']
        : styles['heroSectionSplit--imageRight'];
      containerClass = `${containerClass} ${imagePositionClass}`;
    }

    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--dark']}`}
        role="banner"
      >
        <div className="component-content">
          {props.fields?.BackgroundImage?.value && (
            <div className={styles.backgroundImage}>
              <ContentSdkImage
                field={props.fields?.BackgroundImage}
                width={1920}
                height={1080}
                priority
              />
            </div>
          )}

          <div className={styles.heroOverlay}>
            <div className={styles.radialBlue}></div>
            <div className={styles.radialBlue} style={{ top: '60%', right: '20%' }}></div>
          </div>

          <div className={containerClass}>
            <div className={styles.heroContent}>
              {props.fields?.Title?.value && (
                <ContentSdkText field={props.fields?.Title} className={styles.heroTitle} tag="h1" />
              )}

              {props.fields?.Subtitle?.value && (
                <ContentSdkText
                  field={props.fields?.Subtitle}
                  className={styles.heroSubtitle}
                  tag="h2"
                />
              )}

              {props.fields?.Description?.value && (
                <ContentSdkRichText
                  field={props.fields?.Description}
                  className={styles.heroDescription}
                />
              )}

              {props.fields?.Features?.value && (
                <ContentSdkRichText
                  field={props.fields?.Features}
                  className={styles.heroFeatures}
                />
              )}

              <div className={styles.heroActions}>
                {(props.fields?.PrimaryCTA?.value?.href ||
                  props.fields?.PrimaryCTA?.value?.text) && (
                  <ContentSdkLink field={props.fields?.PrimaryCTA} className={styles.ctaPrimary} />
                )}
                {(props.fields?.SecondaryCTA?.value?.href ||
                  props.fields?.SecondaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields?.SecondaryCTA}
                    className={styles.ctaSecondary}
                  />
                )}
              </div>
            </div>

            {layout !== 'centered' && layout !== 'fullscreen' && props.fields?.Image?.value && (
              <div className={styles.heroImageWrapper}>
                <ContentSdkImage
                  field={props.fields?.Image}
                  className={styles.heroImage}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`component ${styles.heroSection} ${styles['heroSection--dark']}`}
      role="banner"
    >
      <div className="component-content">
        <div className={styles.heroOverlay}>
          <div className={styles.radialBlue}></div>
          <div className={styles.radialBlue} style={{ top: '60%', right: '20%' }}></div>
        </div>

        <div className={styles.heroSectionSplit}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Welcome to Plus500 Dark</h1>
            <h2 className={styles.heroSubtitle}>Professional Trading Platform</h2>
            <p className={styles.heroDescription}>
              Trade CFDs with our advanced dark-themed platform designed for professional traders.
            </p>

            <div className={styles.heroActions}>
              <a href="#" className={styles.ctaPrimary}>
                Start Trading
              </a>
              <a href="#" className={styles.ctaSecondary}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Light variant - Same structure as Default and Dark
export const Light = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    const layout = props.params?.Layout || 'split';
    const isImageLeft = props.fields?.IsImageLeft?.value || false;

    // Determine container class with image positioning
    let containerClass =
      layout === 'centered'
        ? styles.heroSectionCentered
        : layout === 'fullscreen'
          ? styles.heroSectionFullscreen
          : styles.heroSectionSplit;

    // Add image positioning class for split layout (default layout)
    if (layout === 'split' || !layout || layout === undefined || layout === '') {
      const imagePositionClass = isImageLeft
        ? styles['heroSectionSplit--imageLeft']
        : styles['heroSectionSplit--imageRight'];
      containerClass = `${containerClass} ${imagePositionClass}`;
    }

    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--light']}`}
        role="banner"
      >
        <div className="component-content">
          {props.fields?.BackgroundImage?.value && (
            <div className={styles.backgroundImage}>
              <ContentSdkImage
                field={props.fields?.BackgroundImage}
                width={1920}
                height={1080}
                priority
              />
            </div>
          )}

          <div className={containerClass}>
            <div className={styles.heroContent}>
              {props.fields?.Title?.value && (
                <ContentSdkText field={props.fields?.Title} className={styles.heroTitle} tag="h1" />
              )}

              {props.fields?.Subtitle?.value && (
                <ContentSdkText
                  field={props.fields?.Subtitle}
                  className={styles.heroSubtitle}
                  tag="h2"
                />
              )}

              {props.fields?.Description?.value && (
                <ContentSdkRichText
                  field={props.fields?.Description}
                  className={styles.heroDescription}
                />
              )}

              {props.fields?.Features?.value && (
                <ContentSdkRichText
                  field={props.fields?.Features}
                  className={styles.heroFeatures}
                />
              )}

              <div className={styles.heroActions}>
                {(props.fields?.PrimaryCTA?.value?.href ||
                  props.fields?.PrimaryCTA?.value?.text) && (
                  <ContentSdkLink field={props.fields?.PrimaryCTA} className={styles.ctaPrimary} />
                )}
                {(props.fields?.SecondaryCTA?.value?.href ||
                  props.fields?.SecondaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields?.SecondaryCTA}
                    className={styles.ctaSecondary}
                  />
                )}
              </div>
            </div>

            {layout !== 'centered' && layout !== 'fullscreen' && props.fields?.Image?.value && (
              <div className={styles.heroImageWrapper}>
                <ContentSdkImage
                  field={props.fields?.Image}
                  className={styles.heroImage}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.heroSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">HeroSection - Light</span>
      </div>
    </section>
  );
};

export const Robinhood = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    // Robinhood variant is always centered layout
    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--robinhood']}`}
        role="banner"
      >
        <div className="component-content">
          {props.fields?.BackgroundImage?.value && (
            <div className={styles.backgroundImage}>
              <ContentSdkImage
                field={props.fields?.BackgroundImage}
                width={1920}
                height={1080}
                priority
              />
            </div>
          )}

          {/* Geometric Background Patterns */}
          <div className={styles.geometricBackground}>
            <div
              className={styles.geometricLine}
              style={{ top: '20%', left: '10%', transform: 'rotate(45deg)' }}
            ></div>
            <div
              className={styles.geometricLine}
              style={{ top: '60%', right: '15%', transform: 'rotate(-45deg)' }}
            ></div>
            <div
              className={styles.geometricLine}
              style={{ bottom: '30%', left: '20%', transform: 'rotate(30deg)' }}
            ></div>
          </div>

          {/* Floating Plus Signs */}
          <div className={styles.floatingElements}>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={styles.floatingPlus}
                style={{
                  top: `${20 + index * 12}%`,
                  left: `${10 + index * 15}%`,
                  animationDelay: `${index * 0.8}s`,
                  animationDuration: `${4 + index * 0.5}s`,
                }}
              >
                +
              </div>
            ))}
          </div>

          <div className={styles.heroSectionCentered}>
            <div className={styles.heroContent}>
              {props.fields?.Title?.value && (
                <ContentSdkText field={props.fields?.Title} className={styles.heroTitle} tag="h1" />
              )}

              {props.fields?.Subtitle?.value && (
                <ContentSdkText
                  field={props.fields?.Subtitle}
                  className={styles.heroSubtitle}
                  tag="h2"
                />
              )}

              {props.fields?.Description?.value && (
                <ContentSdkRichText
                  field={props.fields?.Description}
                  className={styles.heroDescription}
                />
              )}

              {props.fields?.Features?.value && (
                <ContentSdkRichText
                  field={props.fields?.Features}
                  className={styles.heroFeatures}
                />
              )}

              <div className={styles.heroActions}>
                {(props.fields?.PrimaryCTA?.value?.href ||
                  props.fields?.PrimaryCTA?.value?.text) && (
                  <ContentSdkLink field={props.fields?.PrimaryCTA} className={styles.ctaPrimary} />
                )}
                {(props.fields?.SecondaryCTA?.value?.href ||
                  props.fields?.SecondaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields?.SecondaryCTA}
                    className={styles.ctaSecondary}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.heroSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">HeroSection - Robinhood</span>
      </div>
    </section>
  );
};

export const Minimal = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    const layout = props.params?.Layout || 'split';
    const isImageLeft = props.fields?.IsImageLeft?.value || false;

    // Determine container class with image positioning
    let containerClass =
      layout === 'centered'
        ? styles.heroSectionCentered
        : layout === 'fullscreen'
          ? styles.heroSectionFullscreen
          : styles.heroSectionSplit;

    // Add image positioning class for split layout (default layout)
    if (layout === 'split' || !layout || layout === undefined || layout === '') {
      const imagePositionClass = isImageLeft
        ? styles['heroSectionSplit--imageLeft']
        : styles['heroSectionSplit--imageRight'];
      containerClass = `${containerClass} ${imagePositionClass}`;
    }

    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--minimal']}`}
        role="banner"
      >
        <div className="component-content">
          {props.fields?.BackgroundImage?.value && (
            <div className={styles.backgroundImage}>
              <ContentSdkImage
                field={props.fields?.BackgroundImage}
                width={1920}
                height={1080}
                priority
              />
            </div>
          )}

          <div className={containerClass}>
            <div className={styles.heroContent}>
              {props.fields?.Title?.value && (
                <ContentSdkText field={props.fields?.Title} className={styles.heroTitle} tag="h1" />
              )}

              {props.fields?.Subtitle?.value && (
                <ContentSdkText
                  field={props.fields?.Subtitle}
                  className={styles.heroSubtitle}
                  tag="h2"
                />
              )}

              {props.fields?.Description?.value && (
                <ContentSdkRichText
                  field={props.fields?.Description}
                  className={styles.heroDescription}
                />
              )}

              {props.fields?.Features?.value && (
                <ContentSdkRichText
                  field={props.fields?.Features}
                  className={styles.heroFeatures}
                />
              )}

              <div className={styles.heroActions}>
                {(props.fields?.PrimaryCTA?.value?.href ||
                  props.fields?.PrimaryCTA?.value?.text) && (
                  <ContentSdkLink field={props.fields?.PrimaryCTA} className={styles.ctaPrimary} />
                )}
                {(props.fields?.SecondaryCTA?.value?.href ||
                  props.fields?.SecondaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields?.SecondaryCTA}
                    className={styles.ctaSecondary}
                  />
                )}
              </div>
            </div>

            {layout !== 'centered' && layout !== 'fullscreen' && props.fields?.Image?.value && (
              <div className={styles.heroImageWrapper}>
                <ContentSdkImage
                  field={props.fields?.Image}
                  className={styles.heroImage}
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.heroSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">HeroSection - Minimal</span>
      </div>
    </section>
  );
};

export const ImageBackground = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--imageBackground']}`}
        role="banner"
      >
        <div className="component-content">
          {/* Editable Background Image - Full Screen */}
          {props.fields?.Image?.value ? (
            <div className={styles.editableBackground}>
              <ContentSdkImage field={props.fields.Image} width={1920} height={1080} priority />
            </div>
          ) : (
            <div className={styles.editableBackground}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
                }}
              ></div>
            </div>
          )}

          {/* Dark Overlay for Text Readability */}
          <div className={styles.backgroundOverlay}></div>

          <div className={styles.heroSectionCentered}>
            {props.fields?.Title?.value ? (
              <ContentSdkText field={props.fields.Title} className={styles.heroTitle} tag="h1" />
            ) : (
              <h1 className={styles.heroTitle}>Trade with Confidence</h1>
            )}

            {props.fields?.Subtitle ? (
              <ContentSdkText
                field={props.fields.Subtitle}
                className={styles.heroSubtitle}
                tag="h2"
              />
            ) : (
              <h2 className={styles.heroSubtitle}>Professional CFD Trading Platform</h2>
            )}

            {props.fields?.Description ? (
              <ContentSdkRichText
                field={props.fields.Description}
                className={styles.heroDescription}
              />
            ) : (
              <p className={styles.heroDescription}>
                Experience advanced trading tools, real-time market data, and professional analysis
                on our secure platform.
              </p>
            )}

            <div className={styles.heroActions}>
              {(props.fields?.PrimaryCTA?.value?.href || props.fields?.PrimaryCTA?.value?.text) &&
              props.fields?.PrimaryCTA ? (
                <ContentSdkLink field={props.fields.PrimaryCTA} className={styles.ctaPrimary} />
              ) : (
                <a href="#" className={styles.ctaPrimary}>
                  Start Trading Now
                </a>
              )}
              {(props.fields?.SecondaryCTA?.value?.href ||
                props.fields?.SecondaryCTA?.value?.text) &&
              props.fields?.SecondaryCTA ? (
                <ContentSdkLink field={props.fields.SecondaryCTA} className={styles.ctaSecondary} />
              ) : (
                <a href="#" className={styles.ctaSecondary}>
                  Watch Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`component ${styles.heroSection} ${styles['heroSection--imageBackground']}`}
      role="banner"
    >
      <div className="component-content">
        <div className={styles.editableBackground}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
            }}
          ></div>
        </div>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.heroSectionCentered}>
          <h1 className={styles.heroTitle}>Trade with Confidence</h1>
          <h2 className={styles.heroSubtitle}>Professional CFD Trading Platform</h2>
          <p className={styles.heroDescription}>
            Experience advanced trading tools, real-time market data, and professional analysis.
          </p>
          <div className={styles.heroActions}>
            <a href="#" className={styles.ctaPrimary}>
              Start Trading Now
            </a>
            <a href="#" className={styles.ctaSecondary}>
              Watch Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TextOnly = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <section
        className={`component ${styles.heroSection} ${styles['heroSection--textOnly']}`}
        role="banner"
      >
        <div className="component-content">
          {/* Animated Background Pattern */}
          <div className={styles.animatedBackground}>
            <div className={styles.geometricPattern}>
              {/* Animated Circles */}
              <div className={styles.animatedCircle}></div>
              <div className={styles.animatedCircle}></div>
              <div className={styles.animatedCircle}></div>
              <div className={styles.animatedCircle}></div>
              <div className={styles.animatedCircle}></div>

              {/* Animated Lines */}
              <div className={styles.animatedLine}></div>
              <div className={styles.animatedLine}></div>
              <div className={styles.animatedLine}></div>
              <div className={styles.animatedLine}></div>

              {/* Plus Symbols */}
              <div className={styles.plusSymbol}>+</div>
              <div className={styles.plusSymbol}>+</div>
              <div className={styles.plusSymbol}>+</div>
              <div className={styles.plusSymbol}>+</div>
              <div className={styles.plusSymbol}>+</div>

              {/* Additional Geometric Elements */}
              <div className={styles.animatedSquare}></div>
              <div className={styles.animatedSquare}></div>
              <div className={styles.animatedTriangle}></div>
              <div className={styles.animatedTriangle}></div>
              <div className={styles.animatedDot}></div>
              <div className={styles.animatedDot}></div>
              <div className={styles.animatedDot}></div>
              <div className={styles.animatedDot}></div>
            </div>
          </div>

          <div className={styles.heroSectionCentered}>
            {props.fields?.Title?.value ? (
              <ContentSdkText field={props.fields.Title} className={styles.heroTitle} tag="h1" />
            ) : (
              <h1 className={styles.heroTitle}>Plus500</h1>
            )}

            {props.fields?.Subtitle ? (
              <ContentSdkText
                field={props.fields.Subtitle}
                className={styles.heroSubtitle}
                tag="h2"
              />
            ) : (
              <h2 className={styles.heroSubtitle}>Leading CFD Trading Platform</h2>
            )}

            {props.fields?.Description ? (
              <ContentSdkRichText
                field={props.fields.Description}
                className={styles.heroDescription}
              />
            ) : (
              <p className={styles.heroDescription}>
                Join millions of traders worldwide who trust Plus500 for their CFD trading needs.
                Advanced tools, competitive spreads, and 24/7 support.
              </p>
            )}

            <div className={styles.heroActions}>
              {(props.fields?.PrimaryCTA?.value?.href || props.fields?.PrimaryCTA?.value?.text) &&
              props.fields?.PrimaryCTA ? (
                <ContentSdkLink field={props.fields.PrimaryCTA} className={styles.ctaPrimary} />
              ) : (
                <a href="#" className={styles.ctaPrimary}>
                  Get Started
                </a>
              )}
              {(props.fields?.SecondaryCTA?.value?.href ||
                props.fields?.SecondaryCTA?.value?.text) &&
              props.fields?.SecondaryCTA ? (
                <ContentSdkLink field={props.fields.SecondaryCTA} className={styles.ctaSecondary} />
              ) : (
                <a href="#" className={styles.ctaSecondary}>
                  Learn More
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`component ${styles.heroSection} ${styles['heroSection--textOnly']}`}
      role="banner"
    >
      <div className="component-content">
        <div className={styles.animatedBackground}>
          <div className={styles.geometricPattern}>
            <div
              className={styles.floatingShape}
              style={{ '--delay': '0s' } as React.CSSProperties}
            ></div>
            <div
              className={styles.floatingShape}
              style={{ '--delay': '2s' } as React.CSSProperties}
            ></div>
            <div
              className={styles.floatingShape}
              style={{ '--delay': '4s' } as React.CSSProperties}
            ></div>
          </div>
        </div>
        <div className={styles.textOnlyContainer}>
          <div className={styles.textOnlyContent}>
            <h1 className={styles.textOnlyTitle}>Plus500</h1>
            <h2 className={styles.textOnlySubtitle}>Leading CFD Trading Platform</h2>
            <p className={styles.textOnlyDescription}>
              Join millions of traders worldwide who trust Plus500 for their CFD trading needs.
            </p>
            <div className={styles.textOnlyActions}>
              <a href="#" className={styles.textOnlyPrimary}>
                Get Started
              </a>
              <a href="#" className={styles.textOnlySecondary}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
