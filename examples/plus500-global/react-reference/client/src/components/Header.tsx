import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [location] = useLocation();

  return (
    <header className="bg-background border-b sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-plus500">
            <div className="text-2xl font-bold text-primary">Plus500</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setOpenSubmenu(item.name)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                {item.submenu ? (
                  <div className="flex items-center space-x-1 cursor-pointer py-2">
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        location === item.href ? "text-primary" : "text-foreground"
                      }`}
                      data-testid={`nav-link-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                    <ChevronDown className="h-4 w-4" />
                    
                    {/* Submenu */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: openSubmenu === item.name ? 1 : 0, 
                        y: openSubmenu === item.name ? 0 : 10 
                      }}
                      className={`absolute top-full left-0 pt-2 w-48 ${
                        openSubmenu === item.name ? "block" : "hidden"
                      }`}
                    >
                      <div className="bg-background border rounded-lg shadow-lg">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location === item.href ? "text-primary" : "text-foreground"
                    }`}
                    data-testid={`nav-link-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" data-testid="button-demo">
              Try Demo
            </Button>
            <Button data-testid="button-start-trading">
              Start Trading
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? "auto" : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          className="lg:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-1 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                Try Demo
              </Button>
              <Button className="w-full">
                Start Trading
              </Button>
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}