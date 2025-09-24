import HeroBanner from '../HeroBanner';

export default function HeroBannerExample() {
  return (
    <HeroBanner
      title="Trade with Confidence"
      subtitle="Join millions of traders worldwide on Plus500's award-winning platform. Trade CFDs on shares, forex, commodities, cryptocurrencies and more."
      backgroundImage="/images/Trading_hero_background_image_f734fb4f.png"
      ctaText="Start Trading Now"
      secondaryCtaText="Try Free Demo"
      onCtaClick={() => console.log('Start Trading clicked')}
      onSecondaryCtaClick={() => console.log('Try Demo clicked')}
    />
  );
}