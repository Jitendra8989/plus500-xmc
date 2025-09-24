import RichTextSection from '../RichTextSection';

export default function RichTextSectionExample() {
  const content = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        Plus500 is a leading multi-asset fintech group that operates proprietary technology-based trading platforms. 
        The Group serves retail customers primarily through its flagship brand, Plus500.
      </p>
      <p>
        Our platform offers access to thousands of financial instruments including shares, forex, commodities, 
        cryptocurrencies, options and indices through our powerful CFD service.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Regulated and licensed globally</li>
        <li>No commission on trades</li>
        <li>24/7 customer support</li>
        <li>Advanced risk management tools</li>
      </ul>
    </div>
  );

  return (
    <RichTextSection
      title="About Plus500"
      content={content}
      image="/images/Crypto_trading_illustration_e904d10e.png"
      imageAlt="Plus500 Trading Platform"
      imagePosition="right"
      backgroundColor="muted"
    />
  );
}