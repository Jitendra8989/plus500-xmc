import React from "react";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import {
  Text,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import SafeRichText from '../../SafeRichText';
import { motion } from "framer-motion";
import { FooterProps } from './footer.props';
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

export const Default: React.FC<FooterProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields
  const { fields } = props;
  const logo = fields?.Logo;
  const logoCTA = fields?.LogoCTA;
  const brandDetail = fields?.BrandDetail?.value;
  const section1Header = fields?.['Section-1-Header']?.value;
  const section1Links = fields?.['Section-1-Links'] || [];
  const section2Header = fields?.['Section-2-Header']?.value;
  const section2Links = fields?.['Section-2-Links'] || [];
  const section3Header = fields?.['Section-3-Header']?.value;
  const section3Links = fields?.['Section-3-Links'] || [];
  const section4Header = fields?.['Section-4-Header']?.value;
  const section4Links = fields?.['Section-4-Links'] || [];
  const socialLinks = fields?.SocialLinks || [];
  const regionInfo = fields?.['Region Info'];
  const legalText1 = fields?.['LegalText-1']?.value;
  const legalText2 = fields?.['LegalText-2']?.value;

  return (
    <div className="bg-background border-t">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            {isEditing ? (
              <ContentSdkLink
                field={logoCTA}
                className="flex items-center gap-2 rtl:flex-row-reverse mb-4"
              >
                {logo && (
                  <ContentSdkImage
                    field={logo}
                    className="h-8 w-auto"
                    width={100}
                    height={32}
                    alt="Logo"
                  />
                )}
              </ContentSdkLink>
            ) : (
              logoCTA?.value?.href && (
                <a href={logoCTA.value.href} className="flex items-center gap-2 rtl:flex-row-reverse mb-4">
                  {logo?.value?.src && (
                    <img
                      src={logo.value.src}
                      alt={logo.value.alt || "Logo"}
                      className="h-8 w-auto"
                    />
                  )}
                </a>
              )
            )}

            {isEditing ? (
              <Text
                field={fields?.BrandDetail}
                tag="p"
                className="text-muted-foreground mb-6 max-w-sm rtl:text-right ltr:text-left"
              />
            ) : (
              brandDetail && (
                <p className="text-muted-foreground mb-6 max-w-sm rtl:text-right ltr:text-left">
                  {brandDetail}
                </p>
              )
            )}

            <div className="flex gap-4 rtl:flex-row-reverse">
              {isEditing && socialLinks.length === 0 ? (
                // Show default social icons in editing mode when no links configured
                <>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </>
              ) : (
                socialLinks.map((socialLink, index) => {
                  // Improve icon detection logic
                  const icon = socialLink.fields?.Title?.value;
                  const linkHref = socialLink.fields?.GeneralLink?.value?.href || '';

                  // Detect icon by URL or name
                  let IconComponent = Linkedin; // default
                  if (icon === '📘' || linkHref.includes('facebook') || socialLink.name?.toLowerCase().includes('facebook')) {
                    IconComponent = Facebook;
                  } else if (icon === '🐦' || linkHref.includes('twitter') || socialLink.name?.toLowerCase().includes('twitter')) {
                    IconComponent = Twitter;
                  } else if (icon === '▶️' || linkHref.includes('youtube') || socialLink.name?.toLowerCase().includes('youtube')) {
                    IconComponent = Youtube;
                  } else if (linkHref.includes('linkedin') || socialLink.name?.toLowerCase().includes('linkedin')) {
                    IconComponent = Linkedin;
                  }

                  return isEditing ? (
                    <ContentSdkLink
                      key={socialLink.id}
                      field={socialLink.fields?.GeneralLink}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-${socialLink.name?.toLowerCase() || index}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </ContentSdkLink>
                  ) : (
                    linkHref && (
                      <a
                        key={socialLink.id}
                        href={linkHref}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`link-${socialLink.name?.toLowerCase() || index}`}
                        target={socialLink.fields?.GeneralLink?.value?.target || '_blank'}
                        rel="noopener noreferrer"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    )
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Section 1 - Company */}
          <motion.div variants={fadeInUp}>
            {isEditing ? (
              <Text
                field={fields?.['Section-1-Header']}
                tag="h3"
                className="font-semibold mb-4 rtl:text-right ltr:text-left"
              />
            ) : (
              section1Header && <h3 className="font-semibold mb-4 rtl:text-right ltr:text-left">{section1Header}</h3>
            )}
              <ul className="space-y-3">
                {section1Links.map((link) => (
                  <li key={link.id}>
                    {isEditing ? (
                      <ContentSdkLink
                        field={link.fields?.GeneralLink}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      />
                    ) : (
                      link.fields?.GeneralLink?.value?.href && (
                        <a
                          href={link.fields.GeneralLink.value.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={link.fields.GeneralLink.value.target || '_self'}
                        >
                          {link.fields?.Title?.value || link.displayName}
                        </a>
                      )
                    )}
                  </li>
                ))}
              </ul>
          </motion.div>

          {/* Section 2 - Markets */}
          <motion.div variants={fadeInUp}>
            {isEditing ? (
              <Text
                field={fields?.['Section-2-Header']}
                tag="h3"
                className="font-semibold mb-4 rtl:text-right ltr:text-left"
              />
            ) : (
              section2Header && <h3 className="font-semibold mb-4 rtl:text-right ltr:text-left">{section2Header}</h3>
            )}
              <ul className="space-y-3">
                {section2Links.map((link) => (
                  <li key={link.id}>
                    {isEditing ? (
                      <ContentSdkLink
                        field={link.fields?.GeneralLink}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      />
                    ) : (
                      link.fields?.GeneralLink?.value?.href && (
                        <a
                          href={link.fields.GeneralLink.value.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={link.fields.GeneralLink.value.target || '_self'}
                        >
                          {link.fields?.Title?.value || link.displayName}
                        </a>
                      )
                    )}
                  </li>
                ))}
              </ul>
          </motion.div>

          {/* Section 3 - Learn */}
          <motion.div variants={fadeInUp}>
            {isEditing ? (
              <Text
                field={fields?.['Section-3-Header']}
                tag="h3"
                className="font-semibold mb-4 rtl:text-right ltr:text-left"
              />
            ) : (
              section3Header && <h3 className="font-semibold mb-4 rtl:text-right ltr:text-left">{section3Header}</h3>
            )}
              <ul className="space-y-3">
                {section3Links.map((link) => (
                  <li key={link.id}>
                    {isEditing ? (
                      <ContentSdkLink
                        field={link.fields?.GeneralLink}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      />
                    ) : (
                      link.fields?.GeneralLink?.value?.href && (
                        <a
                          href={link.fields.GeneralLink.value.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={link.fields.GeneralLink.value.target || '_self'}
                        >
                          {link.fields?.Title?.value || link.displayName}
                        </a>
                      )
                    )}
                  </li>
                ))}
              </ul>
          </motion.div>

          {/* Section 4 */}
          <motion.div variants={fadeInUp}>
            {isEditing ? (
              <Text
                field={fields?.['Section-4-Header']}
                tag="h3"
                className="font-semibold mb-4 rtl:text-right ltr:text-left"
              />
            ) : (
              section4Header && <h3 className="font-semibold mb-4 rtl:text-right ltr:text-left">{section4Header}</h3>
            )}
              <ul className="space-y-3">
                {section4Links.map((link) => (
                  <li key={link.id}>
                    {isEditing ? (
                      <ContentSdkLink
                        field={link.fields?.GeneralLink}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      />
                    ) : (
                      link.fields?.GeneralLink?.value?.href && (
                        <a
                          href={link.fields.GeneralLink.value.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target={link.fields.GeneralLink.value.target || '_self'}
                        >
                          {link.fields?.Title?.value || link.displayName}
                        </a>
                      )
                    )}
                  </li>
                ))}
              </ul>
          </motion.div>

        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="border-t pt-8 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          {(isEditing || regionInfo?.value) && (
            <div className="bg-muted/20 p-6 rounded-lg">
              {isEditing ? (
                <SafeRichText
                  field={regionInfo}
                  className="text-xs text-muted-foreground leading-relaxed rtl:text-right ltr:text-left"
                />
              ) : (
                <div
                  className="text-xs text-muted-foreground leading-relaxed rtl:text-right ltr:text-left"
                  dangerouslySetInnerHTML={{ __html: regionInfo.value || '' }}
                />
              )}
            </div>
          )}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
        >
          <div className="text-sm text-muted-foreground mb-4 md:mb-0 rtl:text-right ltr:text-left">
            {isEditing ? (
              <Text
                field={fields?.['LegalText-1']}
                tag="div"
                className="text-sm text-muted-foreground"
              />
            ) : (
              legalText1 && legalText1
            )}
          </div>
          <div className="text-sm text-muted-foreground rtl:text-right ltr:text-left">
            {isEditing ? (
              <Text
                field={fields?.['LegalText-2']}
                tag="div"
                className="text-sm text-muted-foreground"
              />
            ) : (
              legalText2 && legalText2
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};