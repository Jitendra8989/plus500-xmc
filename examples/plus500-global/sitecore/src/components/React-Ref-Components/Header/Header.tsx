import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { HeaderProps } from './header.props';
import { cn } from '@/lib/utils';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

// For now, using hardcoded navigation - later this can come from Sitecore fields
const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Trading",
    href: "/trading/cryptocurrencies",
    submenu: [
      { name: "Cryptocurrencies", href: "/trading/cryptocurrencies" },
      { name: "Forex", href: "/trading/forex" },
      { name: "Stocks", href: "/trading/stocks" },
    ]
  },
  {
    name: "Help",
    href: "/help/feescharges",
    submenu: [
      { name: "Fees & Charges", href: "/help/feescharges" },
      { name: "Risk Management", href: "/help/riskmanagement" },
    ]
  },
  {
    name: "About",
    href: "/aboutus",
    submenu: [
      { name: "About Us", href: "/aboutus" },
      { name: "DFS Account", href: "/aboutus/dfsaaccount" },
      { name: "Reviews", href: "/aboutus/reviews" },
    ]
  },
  { name: "Trading Academy", href: "/tradingacademy" },
];

export const Default: React.FC<HeaderProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { page } = useSitecore();

  // For now using hardcoded location - later integrate with Next.js router
  const location = "/"; // TODO: Get current route

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing modes using the same pattern as other components
  const isEditing = page.mode.isEditing;

  // Debug editing context
  console.log('Header Debug:', {
    isEditing,
    pageMode: page.mode,
    isPageEditing: page.mode.isEditing,
    isDesignLibrary: page.mode.isDesignLibrary,
    isPreview: page.mode.isPreview
  });

  // Extract Sitecore fields
  const { fields } = props;
  const logo = fields?.Logo;
  const mainMenu = fields?.MainMenu || [];
  const logoCTA = fields?.LogoCTA;
  const primaryCTA = fields?.PrimaryCTA;
  const secondaryCTA = fields?.SecondaryCTA;

  return (
    <>
      <header className="bg-background border-b sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-center justify-between h-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 rtl:flex-row-reverse"
            data-testid="logo-plus500"
            variants={fadeInUp}
          >
            {logo ? (
              logoCTA ? (
                <ContentSdkLink field={logoCTA} className="flex items-center">
                  <ContentSdkImage
                    field={logo}
                    className="h-8 w-auto"
                    alt="Logo"
                    width={150}
                    height={32}
                  />
                </ContentSdkLink>
              ) : (
                <ContentSdkImage
                  field={logo}
                  className="h-8 w-auto"
                  alt="Logo"
                  width={150}
                  height={32}
                />
              )
            ) : (
              <div className="text-2xl font-bold text-primary">Plus500</div>
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center gap-8"
            variants={fadeInUp}
          >
            {/* Home link using LogoCTA */}
            <div className="relative group">
              {logoCTA ? (
                <ContentSdkLink
                  field={logoCTA}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === "/" ? "text-primary" : "text-foreground"
                  )}
                  data-testid="nav-link-home"
                >
                  Home
                </ContentSdkLink>
              ) : (
                <a
                  href="/"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === "/" ? "text-primary" : "text-foreground"
                  )}
                  data-testid="nav-link-home"
                >
                  Home
                </a>
              )}
            </div>

            {/* Other navigation items from MainMenu */}
            {(mainMenu && mainMenu.length > 0 ? mainMenu : navigation.slice(1)).map((item, index) => {
              const itemName = item.fields?.Title?.value || item.name;
              const itemHref = item.fields?.GeneralLink?.value?.href || item.href;
              const submenuItems = item.fields?.TreeList || item.submenu;
              const itemKey = item.id || item.name || index;

              return (
                <div
                  key={itemKey}
                  className="relative group"
                  onMouseEnter={() => setOpenSubmenu(itemName)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  {submenuItems && submenuItems.length > 0 ? (
                    <div className="flex items-center gap-1 cursor-pointer py-2 rtl:flex-row-reverse">
                      <a
                        href={itemHref}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          location === itemHref ? "text-primary" : "text-foreground"
                        )}
                        data-testid={`nav-link-${itemName?.toLowerCase()?.replace(' ', '-') || ''}`}
                      >
                        {itemName}
                      </a>
                      <ChevronDown className="h-4 w-4" />

                      {/* Submenu */}
                      <div
                        className={cn(
                          "absolute top-full left-0 pt-2 w-48 transition-all duration-200",
                          openSubmenu === itemName ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                        )}
                      >
                        <div className="bg-background border rounded-lg shadow-lg">
                          {submenuItems?.map((subItem, subIndex) => {
                            const subItemName = subItem.fields?.Title?.value || subItem.name;
                            const subItemHref = subItem.fields?.GeneralLink?.value?.href || subItem.href;
                            const subItemKey = subItem.id || subItem.name || subIndex;

                            return (
                              <a
                                key={subItemKey}
                                href={subItemHref}
                                className="block px-4 py-2 text-sm hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors"
                              >
                                {subItemName}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={itemHref}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        location === itemHref ? "text-primary" : "text-foreground"
                      )}
                      data-testid={`nav-link-${itemName?.toLowerCase()?.replace(' ', '-') || ''}`}
                    >
                      {itemName}
                    </a>
                  )}
                </div>
              );
            })}
          </motion.nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            className="hidden lg:flex items-center gap-4 rtl:flex-row-reverse"
            variants={fadeInUp}
          >
            {isEditing ? (
              <>
                <ContentSdkLink
                  field={secondaryCTA}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  data-testid="button-demo"
                />
                <ContentSdkLink
                  field={primaryCTA}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  data-testid="button-start-trading"
                />
              </>
            ) : (
              <>
                <button
                  onClick={() => window.location.href = secondaryCTA?.value?.href || '#'}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-9 px-4 py-2"
                  data-testid="button-demo"
                >
                  {secondaryCTA?.value?.text || 'Try Demo'}
                </button>
                <button
                  onClick={() => window.location.href = primaryCTA?.value?.href || '#'}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2"
                  data-testid="button-start-trading"
                >
                  {primaryCTA?.value?.text || 'Start Trading'}
                </button>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
            variants={fadeInUp}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </motion.div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="py-4 space-y-4">
            {/* Home link using LogoCTA */}
            <div>
              {logoCTA ? (
                <ContentSdkLink
                  field={logoCTA}
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors hover:text-primary",
                    location === "/" ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </ContentSdkLink>
              ) : (
                <a
                  href="/"
                  className={cn(
                    "block py-2 text-sm font-medium transition-colors hover:text-primary",
                    location === "/" ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              )}
            </div>

            {/* Other navigation items from MainMenu */}
            {(mainMenu && mainMenu.length > 0 ? mainMenu : navigation.slice(1)).map((item, index) => {
              const itemName = item.fields?.Title?.value || item.name;
              const itemHref = item.fields?.GeneralLink?.value?.href || item.href;
              const submenuItems = item.fields?.TreeList || item.submenu;
              const itemKey = item.id || item.name || index;

              return (
                <div key={itemKey}>
                  <a
                    href={itemHref}
                    className={cn(
                      "block py-2 text-sm font-medium transition-colors hover:text-primary",
                      location === itemHref ? "text-primary" : "text-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {itemName}
                  </a>
                  {submenuItems && submenuItems.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {submenuItems?.map((subItem, subIndex) => {
                        const subItemName = subItem.fields?.Title?.value || subItem.name;
                        const subItemHref = subItem.fields?.GeneralLink?.value?.href || subItem.href;
                        const subItemKey = subItem.id || subItem.name || subIndex;

                        return (
                          <a
                            key={subItemKey}
                            href={subItemHref}
                            className="block py-1 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItemName}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-4 space-y-2">
              {isEditing ? (
                <>
                  <ContentSdkLink
                    field={secondaryCTA}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                  />
                  <ContentSdkLink
                    field={primaryCTA}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => window.location.href = secondaryCTA?.value?.href || '#'}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-9 px-4 py-2 w-full"
                  >
                    {secondaryCTA?.value?.text || 'Try Demo'}
                  </button>
                  <button
                    onClick={() => window.location.href = primaryCTA?.value?.href || '#'}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 bg-primary text-primary-foreground border border-primary-border min-h-9 px-4 py-2 w-full"
                  >
                    {primaryCTA?.value?.text || 'Start Trading'}
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      </header>
    </>
  );
};
