import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  trading: [
    { name: "Forex", href: "/trading/forex" },
    { name: "Stocks", href: "/trading/stocks" },
    { name: "Cryptocurrencies", href: "/trading/cryptocurrencies" },
    { name: "Commodities", href: "/trading/commodities" },
  ],
  help: [
    { name: "Fees & Charges", href: "/help/feescharges" },
    { name: "Risk Management", href: "/help/riskmanagement" },
    { name: "Contact Support", href: "/help/contact" },
    { name: "Platform Guide", href: "/help/guide" },
  ],
  company: [
    { name: "About Us", href: "/aboutus" },
    { name: "Reviews", href: "/aboutus/reviews" },
    { name: "DFS Account", href: "/aboutus/dfsaaccount" },
    { name: "Careers", href: "/careers" },
  ],
  legal: [
    { name: "Terms & Conditions", href: "/legal/terms" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Risk Disclosure", href: "/legal/risk" },
    { name: "Regulatory", href: "/legal/regulatory" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-primary">Plus500</div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Leading CFD trading platform serving 25+ million users worldwide. 
              Trade with confidence on our award-winning platform.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Trading Links */}
          <div>
            <h3 className="font-semibold mb-4">Trading</h3>
            <ul className="space-y-3">
              {footerLinks.trading.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t pt-8 mb-8">
          <div className="bg-muted/20 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 text-sm">Risk Warning</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 
              Between 74-89% of retail investor accounts lose money when trading CFDs with their provider. 
              You should consider whether you understand how CFDs work and whether you can afford to take the 
              high risk of losing your money. Past performance is not indicative of future results.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Plus500. All rights reserved. Plus500 is a trademark of Plus500 Ltd.
          </div>
          <div className="text-sm text-muted-foreground">
            Plus500UK Ltd is authorised and regulated by the Financial Conduct Authority (FRN 509909)
          </div>
        </div>
      </div>
    </footer>
  );
}