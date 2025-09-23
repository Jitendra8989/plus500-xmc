import React, { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { PrimaryButton, SecondaryButton } from '../ui';
import styles from './Header.module.css';

interface NavigationItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    TreeList?: NavigationItem[];
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
  };
}

interface Fields {
  Logo: ImageField;
  MainMenu: NavigationItem[];
  LogoCTA: LinkField;
  PrimaryCTA: LinkField;
  SecondaryCTA: LinkField;
  LanguageNavigator: NavigationItem[];
}

type HeaderProps = ComponentProps & {
  fields: Fields;
};

// Helper function to render navigation items
const renderNavigationItem = (item: NavigationItem, level: number = 0): JSX.Element => {
  const hasChildren = item.fields.TreeList && item.fields.TreeList.length > 0;
  const link = item.fields.GeneralLink?.value;
  const title = item.fields.Title?.value || item.displayName;

  return (
    <li key={item.id} className={`${styles.navItem} ${level > 0 ? styles.navSubItem : ''}`}>
      {link?.href ? (
        <a
          href={link.href}
          target="_self"
          className={styles.navLink}
          data-testid={`nav-link-${(link.text || title).toLowerCase().replace(/\s+/g, '-')}`}
        >
          {link.text || title}
          {hasChildren && (
            <svg
              className={styles.dropdownArrow}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </a>
      ) : (
        <span className={styles.navLabel}>
          {title}
          {hasChildren && (
            <svg
              className={styles.dropdownArrow}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}

      {hasChildren && (
        <ul className={styles.navSubmenu}>
          {item.fields.TreeList?.map((subItem) => renderNavigationItem(subItem, level + 1))}
        </ul>
      )}
    </li>
  );
};

// Helper function to render language navigation
const renderLanguageNav = (languages: NavigationItem[]): JSX.Element => {
  return (
    <div className={styles.languageNav}>
      <select
        className={styles.languageSelector}
        data-testid="language-selector"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.name}>
            {lang.fields.Title?.value || lang.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Default = (props: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (props.fields) {
    return (
      <header
        className={`component ${styles.header} ${styles['header--default']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="banner"
      >
        <div className="component-content">
          <div className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
              {/* Logo */}
              <div className={styles.logo}>
                {props.fields.LogoCTA?.value ? (
                  <ContentSdkLink
                    field={props.fields.LogoCTA}
                    className={styles.logoLink}
                    data-testid="logo-plus500"
                  >
                    {props.fields.Logo?.value && (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={150}
                        height={40}
                        priority
                      />
                    )}
                  </ContentSdkLink>
                ) : (
                  props.fields.Logo?.value && (
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.logoImage}
                      alt="Plus500 Logo"
                      width={150}
                      height={40}
                      priority
                      data-testid="logo-plus500"
                    />
                  )
                )}
              </div>

              {/* Main Navigation */}
              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                {/* Desktop Menu */}
                <div
                  className={`${styles.navMenu} ${styles.desktopMenu}`}
                  data-testid="desktop-menu"
                >
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}
                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>

                {/* Mobile Menu with Framer Motion */}
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`${styles.navMenu} ${styles.navMenuOpen}`}
                      data-testid="mobile-menu"
                    >
                      {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                        <motion.ul
                          className={styles.mainMenu}
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {props.fields.MainMenu.map((menuItem, index) => (
                            <motion.li
                              key={menuItem.id}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.05 }}
                            >
                              {renderNavigationItem(menuItem)}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}

                      {/* Language Navigator */}
                      {props.fields.LanguageNavigator &&
                        props.fields.LanguageNavigator.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {renderLanguageNav(props.fields.LanguageNavigator)}
                          </motion.div>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>

              {/* CTA Buttons */}
              <div className={styles.ctaSection}>
                {props.fields.SecondaryCTA?.value && (
                  <SecondaryButton
                    {...{
                      as: 'link' as const,
                      href: props.fields.SecondaryCTA.value.href || '#',
                      target: props.fields.SecondaryCTA.value.target,
                      'data-testid': 'cta-secondary',
                    }}
                  >
                    {props.fields.SecondaryCTA.value.text || 'Try Demo'}
                  </SecondaryButton>
                )}
                {props.fields.PrimaryCTA?.value && (
                  <PrimaryButton
                    {...{
                      as: 'link' as const,
                      href: props.fields.PrimaryCTA.value.href || '#',
                      target: props.fields.PrimaryCTA.value.target,
                      'data-testid': 'cta-primary',
                    }}
                  >
                    {props.fields.PrimaryCTA.value.text || 'Start Trading'}
                  </PrimaryButton>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
                data-testid="mobile-menu-toggle"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <motion.span
                  className={styles.hamburger}
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={styles.hamburger}
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={styles.hamburger}
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`component ${styles.header}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header</span>
      </div>
    </header>
  );
};

export const Dark = (props: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (props.fields || props.params) {
    return (
      <header
        className={`component ${styles.header} ${styles['header--dark']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="banner"
      >
        <div className="component-content">
          <div className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
              <div className={styles.logo}>
                {props.fields.LogoCTA?.value ? (
                  <ContentSdkLink field={props.fields.LogoCTA} className={styles.logoLink}>
                    {props.fields.Logo?.value && (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={150}
                        height={40}
                        priority
                      />
                    )}
                  </ContentSdkLink>
                ) : (
                  props.fields.Logo?.value && (
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.logoImage}
                      alt="Plus500 Logo"
                      width={150}
                      height={40}
                      priority
                    />
                  )
                )}
              </div>

              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}

                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>
              </nav>

              <div className={styles.ctaSection}>
                {props.fields.SecondaryCTA?.value && (
                  <SecondaryButton
                    {...{
                      as: 'link' as const,
                      href: props.fields.SecondaryCTA.value.href || '#',
                      target: props.fields.SecondaryCTA.value.target,
                      theme: 'dark',
                      'data-testid': 'cta-secondary',
                    }}
                  >
                    {props.fields.SecondaryCTA.value.text || 'Try Demo'}
                  </SecondaryButton>
                )}
                {props.fields.PrimaryCTA?.value && (
                  <PrimaryButton
                    {...{
                      as: 'link' as const,
                      href: props.fields.PrimaryCTA.value.href || '#',
                      target: props.fields.PrimaryCTA.value.target,
                      theme: 'dark',
                      'data-testid': 'cta-primary',
                    }}
                  >
                    {props.fields.PrimaryCTA.value.text || 'Start Trading'}
                  </PrimaryButton>
                )}
              </div>

              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
              >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`component ${styles.header} ${styles['header--dark']}`} role="banner">
      <div className="component-content">
        <div className={styles.headerContainer}>
          <div className={styles.headerWrapper}>
            <div className={styles.logo}>
              <a href="/" className={styles.logoLink}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700' }}>
                  Plus500
                </span>
              </a>
            </div>

            <nav className={styles.mainMenu} role="navigation">
              <a href="#" className={styles.navLink}>
                Trading
              </a>
              <a href="#" className={styles.navLink}>
                Markets
              </a>
              <a href="#" className={styles.navLink}>
                Education
              </a>
              <a href="#" className={styles.navLink}>
                About
              </a>
            </nav>

            <div className={styles.headerActions}>
              <a href="#" className={styles.ctaPrimary}>
                Start Trading
              </a>
              <a href="#" className={styles.ctaSecondary}>
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Light = (props: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (props.fields) {
    return (
      <header
        className={`component ${styles.header} ${styles['header--light']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="banner"
      >
        <div className="component-content">
          <div className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
              <div className={styles.logo}>
                {props.fields.LogoCTA?.value ? (
                  <ContentSdkLink field={props.fields.LogoCTA} className={styles.logoLink}>
                    {props.fields.Logo?.value && (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={150}
                        height={40}
                        priority
                      />
                    )}
                  </ContentSdkLink>
                ) : (
                  props.fields.Logo?.value && (
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.logoImage}
                      alt="Plus500 Logo"
                      width={150}
                      height={40}
                      priority
                    />
                  )
                )}
              </div>

              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}

                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>
              </nav>

              <div className={styles.ctaSection}>
                {props.fields.SecondaryCTA?.value && (
                  <SecondaryButton
                    {...{
                      as: 'link' as const,
                      href: props.fields.SecondaryCTA.value.href || '#',
                      target: props.fields.SecondaryCTA.value.target,
                      'data-testid': 'cta-secondary',
                    }}
                  >
                    {props.fields.SecondaryCTA.value.text || 'Try Demo'}
                  </SecondaryButton>
                )}
                {props.fields.PrimaryCTA?.value && (
                  <PrimaryButton
                    {...{
                      as: 'link' as const,
                      href: props.fields.PrimaryCTA.value.href || '#',
                      target: props.fields.PrimaryCTA.value.target,
                      'data-testid': 'cta-primary',
                    }}
                  >
                    {props.fields.PrimaryCTA.value.text || 'Start Trading'}
                  </PrimaryButton>
                )}
              </div>

              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
              >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`component ${styles.header}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header</span>
      </div>
    </header>
  );
};

export const Primary = (props: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (props.fields) {
    return (
      <header
        className={`component ${styles.header} ${styles['header--primary']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="banner"
      >
        <div className="component-content">
          <div className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
              <div className={styles.logo}>
                {props.fields.LogoCTA?.value ? (
                  <ContentSdkLink field={props.fields.LogoCTA} className={styles.logoLink}>
                    {props.fields.Logo?.value && (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={150}
                        height={40}
                        priority
                      />
                    )}
                  </ContentSdkLink>
                ) : (
                  props.fields.Logo?.value && (
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.logoImage}
                      alt="Plus500 Logo"
                      width={150}
                      height={40}
                      priority
                    />
                  )
                )}
              </div>

              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}

                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>
              </nav>

              <div className={styles.ctaSection}>
                {props.fields.SecondaryCTA?.value && (
                  <ContentSdkLink
                    field={props.fields.SecondaryCTA}
                    className={`${styles.cta} ${styles.ctaSecondary}`}
                  />
                )}
                {props.fields.PrimaryCTA?.value && (
                  <ContentSdkLink
                    field={props.fields.PrimaryCTA}
                    className={`${styles.cta} ${styles.ctaPrimary}`}
                  />
                )}
              </div>

              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
              >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`component ${styles.header}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header</span>
      </div>
    </header>
  );
};

export const Glass = (props: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (props.fields) {
    return (
      <header
        className={`component ${styles.header} ${styles['header--glass']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="banner"
      >
        <div className="component-content">
          <div className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
              <div className={styles.logo}>
                {props.fields.LogoCTA?.value ? (
                  <ContentSdkLink field={props.fields.LogoCTA} className={styles.logoLink}>
                    {props.fields.Logo?.value && (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={150}
                        height={40}
                        priority
                      />
                    )}
                  </ContentSdkLink>
                ) : (
                  props.fields.Logo?.value && (
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.logoImage}
                      alt="Plus500 Logo"
                      width={150}
                      height={40}
                      priority
                    />
                  )
                )}
              </div>

              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}

                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>
              </nav>

              <div className={styles.ctaSection}>
                {props.fields.SecondaryCTA?.value && (
                  <ContentSdkLink
                    field={props.fields.SecondaryCTA}
                    className={`${styles.cta} ${styles.ctaSecondary}`}
                  />
                )}
                {props.fields.PrimaryCTA?.value && (
                  <ContentSdkLink
                    field={props.fields.PrimaryCTA}
                    className={`${styles.cta} ${styles.ctaPrimary}`}
                  />
                )}
              </div>

              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
              >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`component ${styles.header}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header</span>
      </div>
    </header>
  );
};

export const Transparent = (props: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (props.fields) {
    return (
      <header
        className={`component ${styles.header} ${styles['header--transparent']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
        role="banner"
      >
        <div className="component-content">
          <div className={styles.headerContainer}>
            <div className={styles.headerWrapper}>
              <div className={styles.logo}>
                {props.fields.LogoCTA?.value ? (
                  <ContentSdkLink field={props.fields.LogoCTA} className={styles.logoLink}>
                    {props.fields.Logo?.value && (
                      <ContentSdkImage
                        field={props.fields.Logo}
                        className={styles.logoImage}
                        alt="Plus500 Logo"
                        width={150}
                        height={40}
                        priority
                      />
                    )}
                  </ContentSdkLink>
                ) : (
                  props.fields.Logo?.value && (
                    <ContentSdkImage
                      field={props.fields.Logo}
                      className={styles.logoImage}
                      alt="Plus500 Logo"
                      width={150}
                      height={40}
                      priority
                    />
                  )
                )}
              </div>

              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}

                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>
              </nav>

              <div className={styles.ctaSection}>
                {props.fields.SecondaryCTA?.value && (
                  <ContentSdkLink
                    field={props.fields.SecondaryCTA}
                    className={`${styles.cta} ${styles.ctaSecondary}`}
                  />
                )}
                {props.fields.PrimaryCTA?.value && (
                  <ContentSdkLink
                    field={props.fields.PrimaryCTA}
                    className={`${styles.cta} ${styles.ctaPrimary}`}
                  />
                )}
              </div>

              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation menu"
              >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`component ${styles.header}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header</span>
      </div>
    </header>
  );
};
