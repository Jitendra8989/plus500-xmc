import FAQAccordion from '../FAQAccordion';

export default function FAQAccordionExample() {
  // todo: remove mock functionality
  const faqs = [
    {
      question: "What is CFD trading?",
      answer: "CFD (Contract for Difference) trading allows you to speculate on the price movements of financial instruments without owning the underlying asset. You can profit from both rising and falling markets by going long or short."
    },
    {
      question: "How much does it cost to trade with Plus500?",
      answer: "Plus500 doesn't charge commission on trades. Instead, we make money through competitive spreads. There are no account opening fees, and you can start with a minimum deposit of just $100."
    },
    {
      question: "Is Plus500 regulated and safe?",
      answer: "Yes, Plus500 is regulated by top-tier financial authorities including the FCA (UK), CySEC (Cyprus), and ASIC (Australia). Your funds are protected through segregated accounts and negative balance protection."
    },
    {
      question: "Can I try trading with a demo account?",
      answer: "Absolutely! Plus500 offers a free demo account with $40,000 virtual money. You can practice trading in real market conditions without any risk to your capital."
    },
    {
      question: "What instruments can I trade?",
      answer: "Plus500 offers over 2,800 instruments including forex pairs, stocks, commodities, cryptocurrencies, indices, and options. You can trade popular assets like Bitcoin, Apple shares, Gold, and major currency pairs."
    },
    {
      question: "How do I withdraw my funds?",
      answer: "Withdrawals are processed quickly and securely. You can withdraw funds using the same method you used to deposit. Most withdrawals are processed within 1-3 business days, depending on your payment method."
    }
  ];

  return (
    <FAQAccordion
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about trading with Plus500"
      faqs={faqs}
      defaultOpen={["item-0"]}
    />
  );
}