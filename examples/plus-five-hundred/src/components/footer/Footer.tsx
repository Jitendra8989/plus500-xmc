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
import styles from './Footer.module.css';

interface FooterLinkItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    TreeList?: FooterLinkItem[];
    GeneralLink: {
      value: {
        text: string;
        href: string;
        target?: string;
      };
    };
    Title: {
      value: string;
    };
    Image?: {
      value: string;
    };
  };
}

interface Fields {
  Logo: ImageField;
  LogoCTA: LinkField;
  BrandTitle: Field<string>;
  BrandDescription: Field<string>;
  LegalText: RichTextField;
  'Region Info': RichTextField;
  LegalEntity?: Field<string>;
  RegulatoryAuthority?: Field<string>;
  LicenseNumber?: Field<string>;
  Country?: Field<string>;
  'Section-1-Header': Field<string>;
  'Section-2-Header': Field<string>;
  'Section-3-Header': Field<string>;
  'Section-4-Header': Field<string>;
  'SocialLinks-Header': Field<string>;
  'Section-1-Links': FooterLinkItem[];
  'Section-2-Links': FooterLinkItem[];
  'Section-3-Links': FooterLinkItem[];
  'Section-4-Links': FooterLinkItem[];
  SocialLinks: FooterLinkItem[];
}

type FooterProps = ComponentProps & {
  fields: Fields;
};

// Helper function to render footer link sections
const renderFooterSection = (
  header: Field<string> | undefined,
  links: FooterLinkItem[] | undefined,
  className: string
): JSX.Element | null => {
  if (!header?.value && (!links || links.length === 0)) return null;

  return (
    <div className={className}>
      {header?.value && <h3 className={styles.sectionHeader}>{header.value}</h3>}
      {links && links.length > 0 && (
        <ul className={styles.linkList}>
          {links.map((link) => (
            <li key={link.id} className={styles.linkItem}>
              {link.fields.GeneralLink?.value?.href ? (
                <ContentSdkLink field={link.fields.GeneralLink} className={styles.footerLink}>
                  {link.fields.GeneralLink.value.text ||
                    link.fields.Title?.value ||
                    link.displayName}
                </ContentSdkLink>
              ) : (
                <ContentSdkText
                  field={link.fields.Title}
                  className={styles.footerText}
                  tag="span"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Helper function to render social links
const renderSocialLinks = (
  socialLinks: FooterLinkItem[] | undefined,
  header: Field<string> | undefined
): JSX.Element | null => {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className={styles.socialSection}>
      {header?.value && <h3 className={styles.sectionHeader}>{header.value}</h3>}
      <div className={styles.socialLinks}>
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.fields.GeneralLink?.value?.href || '#'}
            target={social.fields.GeneralLink?.value?.target || '_blank'}
            className={styles.socialLink}
            aria-label={social.fields.Title?.value || social.displayName}
          >
            {social.fields.Image?.value ? (
              <img
                src={social.fields.Image.value}
                alt={social.fields.Title?.value || social.displayName}
                className={styles.socialIconImage}
              />
            ) : (
              <span className={styles.socialIcon}>
                {social.fields.Title?.value || social.displayName}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Default = (props: FooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <footer
        className={`component ${styles.footer} ${styles['footer--default']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="contentinfo"
      >
        <div className="component-content">
          <div className={styles.footerContainer}>
            {/* Top Section */}
            <div className={styles.footerTop}>
              {/* Brand Section */}
              <div className={styles.brandSection}>
                {props.fields.Logo?.value && (
                  <div className={styles.footerLogo}>
                    {props.fields.LogoCTA?.value ? (
                      <ContentSdkLink field={props.fields.LogoCTA} className={styles.logoLink}>
                        <ContentSdkImage
                          field={props.fields.Logo}
                          className={styles.logoImage}
                          alt="Plus500 Logo"
                          width={120}
                          height={32}
                        />
                      </ContentSdkLink>
                    ) : (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={120}
                        height={32}
                      />
                    )}
                  </div>
                )}

                {props.fields.BrandTitle?.value && (
                  <ContentSdkText
                    field={props.fields.BrandTitle}
                    className={styles.brandTitle}
                    tag="h2"
                  />
                )}

                {props.fields.BrandDescription?.value && (
                  <ContentSdkText
                    field={props.fields.BrandDescription}
                    className={styles.brandDescription}
                    tag="p"
                  />
                )}
              </div>

              {/* Link Sections */}
              <div className={styles.linkSections}>
                {renderFooterSection(
                  props.fields['Section-1-Header'],
                  props.fields['Section-1-Links'],
                  styles.linkSection
                )}
                {renderFooterSection(
                  props.fields['Section-2-Header'],
                  props.fields['Section-2-Links'],
                  styles.linkSection
                )}
                {renderFooterSection(
                  props.fields['Section-3-Header'],
                  props.fields['Section-3-Links'],
                  styles.linkSection
                )}
                {renderSocialLinks(
                  props.fields.SocialLinks || props.fields['Section-4-Links'],
                  props.fields['SocialLinks-Header'] || props.fields['Section-4-Header']
                )}
              </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.footerBottom}>
              {/* Legal Text Section */}
              {props.fields.LegalText?.value && (
                <div className={styles.legalSection}>
                  <ContentSdkRichText field={props.fields.LegalText} className={styles.legalText} />
                </div>
              )}

              {/* Region Info Section */}
              {props.fields['Region Info']?.value && (
                <div className={styles.riskWarningSection}>
                  <div className={styles.riskWarningBox}>
                    <ContentSdkRichText
                      field={props.fields['Region Info']}
                      className={styles.riskWarningText}
                    />
                  </div>
                </div>
              )}

              {/* Regional Entity Information */}
              <div className={styles.regionalInfo}>
                {props.fields.LegalEntity?.value && (
                  <div className={styles.entityInfo}>
                    <span className={styles.entityLabel}>Legal Entity:</span>
                    <ContentSdkText
                      field={props.fields.LegalEntity}
                      className={styles.entityName}
                      tag="span"
                    />
                  </div>
                )}
                {props.fields.RegulatoryAuthority?.value && (
                  <div className={styles.regulatorInfo}>
                    <span className={styles.regulatorLabel}>Regulated by:</span>
                    <ContentSdkText
                      field={props.fields.RegulatoryAuthority}
                      className={styles.regulatorName}
                      tag="span"
                    />
                  </div>
                )}
                {props.fields.LicenseNumber?.value && (
                  <div className={styles.licenseInfo}>
                    <span className={styles.licenseLabel}>License No:</span>
                    <ContentSdkText
                      field={props.fields.LicenseNumber}
                      className={styles.licenseNumber}
                      tag="span"
                    />
                  </div>
                )}
                {props.fields.Country?.value && (
                  <div className={styles.countryInfo}>
                    <span className={styles.countryLabel}>Region:</span>
                    <ContentSdkText
                      field={props.fields.Country}
                      className={styles.countryName}
                      tag="span"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`component ${styles.footer}`}>
      <div className="component-content">
        <span className="is-empty-hint">Footer - Default</span>
      </div>
    </footer>
  );
};

export const Minimal = (props: FooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <footer
        className={`component ${styles.footer} ${styles['footer--minimal']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="contentinfo"
      >
        <div className="component-content">
          <div className={styles.footerContainer}>
            <div className={styles.footerMinimal}>
              {/* Essential Links Only */}
              <div className={styles.essentialLinks}>
                {props.fields['Section-1-Links'] && props.fields['Section-1-Links'].length > 0 && (
                  <div className={styles.minimalSection}>
                    {props.fields['Section-1-Links'].slice(0, 3).map((link) => (
                      <ContentSdkLink
                        key={link.id}
                        field={link.fields.GeneralLink}
                        className={styles.minimalLink}
                      >
                        {link.fields.GeneralLink?.value?.text ||
                          link.fields.Title?.value ||
                          link.displayName}
                      </ContentSdkLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Copyright */}
              <div className={styles.copyright}>
                {props.fields.LegalText?.value && (
                  <ContentSdkRichText
                    field={props.fields.LegalText}
                    className={styles.copyrightText}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`component ${styles.footer}`}>
      <div className="component-content">
        <span className="is-empty-hint">Footer - Minimal</span>
      </div>
    </footer>
  );
};

export const Brand = (props: FooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <footer
        className={`component ${styles.footer} ${styles['footer--brand']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="contentinfo"
      >
        <div className="component-content">
          <div className={styles.footerContainer}>
            <div className={styles.footerBrand}>
              {/* Centered Brand Section */}
              <div className={styles.brandCentered}>
                {props.fields.Logo?.value && (
                  <div className={styles.brandLogo}>
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.brandLogoImage}
                      alt="Plus500 Logo"
                      width={180}
                      height={48}
                    />
                  </div>
                )}

                {props.fields.BrandTitle?.value && (
                  <ContentSdkText
                    field={props.fields.BrandTitle}
                    className={styles.brandTitleLarge}
                    tag="h2"
                  />
                )}

                {/* Reduced Link Sections */}
                <div className={styles.brandLinks}>
                  {renderFooterSection(
                    props.fields['Section-1-Header'],
                    props.fields['Section-1-Links'],
                    styles.brandLinkSection
                  )}
                  {renderSocialLinks(
                    props.fields.SocialLinks || props.fields['Section-4-Links'],
                    props.fields['SocialLinks-Header'] || props.fields['Section-4-Header']
                  )}
                </div>
              </div>

              {/* Legal */}
              <div className={styles.brandLegal}>
                {props.fields.LegalText?.value && (
                  <ContentSdkRichText
                    field={props.fields.LegalText}
                    className={styles.brandLegalText}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`component ${styles.footer}`}>
      <div className="component-content">
        <span className="is-empty-hint">Footer - Brand</span>
      </div>
    </footer>
  );
};

export const Corporate = (props: FooterProps): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <footer
        className={`component ${styles.footer} ${styles['footer--corporate']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="contentinfo"
      >
        <div className="component-content">
          <div className={styles.footerContainer}>
            {/* Corporate Grid Layout */}
            <div className={styles.corporateGrid}>
              {/* Brand Section */}
              <div className={styles.corporateBrand}>
                {props.fields.Logo?.value && (
                  <ContentSdkImage
                    field={props.fields.Logo}
                    className={styles.corporateLogo}
                    alt="Plus500 Logo"
                    width={140}
                    height={36}
                  />
                )}
                {props.fields.BrandTitle?.value && (
                  <ContentSdkText
                    field={props.fields.BrandTitle}
                    className={styles.corporateTitle}
                    tag="h2"
                  />
                )}
              </div>

              {/* All Link Sections */}
              {renderFooterSection(
                props.fields['Section-1-Header'],
                props.fields['Section-1-Links'],
                styles.corporateSection
              )}
              {renderFooterSection(
                props.fields['Section-2-Header'],
                props.fields['Section-2-Links'],
                styles.corporateSection
              )}
              {renderFooterSection(
                props.fields['Section-3-Header'],
                props.fields['Section-3-Links'],
                styles.corporateSection
              )}
              {renderSocialLinks(
                props.fields.SocialLinks || props.fields['Section-4-Links'],
                props.fields['SocialLinks-Header'] || props.fields['Section-4-Header']
              )}
            </div>

            {/* Detailed Legal Section */}
            <div className={styles.corporateLegal}>
              <div className={styles.legalFull}>
                {props.fields.LegalText?.value && (
                  <ContentSdkRichText
                    field={props.fields.LegalText}
                    className={styles.corporateLegalText}
                  />
                )}
              </div>

              <div className={styles.regionFull}>
                {props.fields['Region Info']?.value && (
                  <ContentSdkRichText
                    field={props.fields['Region Info']}
                    className={styles.corporateRegion}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`component ${styles.footer}`}>
      <div className="component-content">
        <span className="is-empty-hint">Footer - Corporate</span>
      </div>
    </footer>
  );
};
