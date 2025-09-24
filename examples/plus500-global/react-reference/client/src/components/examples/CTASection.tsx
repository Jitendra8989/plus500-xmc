import CTASection from '../CTASection';

export default function CTASectionExample() {
  return (
    <CTASection
      title="Ready to Start Trading?"
      subtitle="Join over 25 million users who trust Plus500. Start with a free demo account and learn to trade with virtual money, or dive right in with a live account."
      primaryButtonText="Open Live Account"
      secondaryButtonText="Try Free Demo"
      onPrimaryClick={() => console.log('Open Live Account clicked')}
      onSecondaryClick={() => console.log('Try Free Demo clicked')}
      backgroundVariant="gradient"
    />
  );
}