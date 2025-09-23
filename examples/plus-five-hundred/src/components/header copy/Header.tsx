import React, { JSX, useState } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
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
    <li
      key={item.id}
      className={`${styles.navItem} ${level > 0 ? styles.navSubItem : ''} ${hasChildren ? styles.navItemWithChildren : ''}`}
    >
      {/* Always render the root element - as a link if href exists, otherwise as span */}
      {link?.href ? (
        <a href={link.href} target={link.target || '_self'} className={styles.navLink}>
          {link.text || title}
        </a>
      ) : (
        <span className={styles.navLabel}>{title}</span>
      )}

      {/* Always render children if they exist, regardless of whether parent has a link */}
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
      <select className={styles.languageSelector}>
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

              {/* Main Navigation */}
              <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
                  {props.fields.MainMenu && props.fields.MainMenu.length > 0 && (
                    <ul className={styles.mainMenu}>
                      {props.fields.MainMenu.map((menuItem) => renderNavigationItem(menuItem))}
                    </ul>
                  )}

                  {/* Language Navigator */}
                  {props.fields.LanguageNavigator &&
                    props.fields.LanguageNavigator.length > 0 &&
                    renderLanguageNav(props.fields.LanguageNavigator)}
                </div>
              </nav>

              {/* CTA Buttons */}
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

              {/* Mobile Menu Toggle */}
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
