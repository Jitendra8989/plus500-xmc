import RichTextSection from "@/components/RichTextSection";
import BulletList from "@/components/BulletList";
import Timeline from "@/components/Timeline";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { FileText, Shield, Clock, CheckCircle } from "lucide-react";

export default function DFSAccount() {
  const dfsFeatures = [
    {
      icon: FileText,
      title: "Simplified Documentation",
      description: "Streamlined account opening process with minimal paperwork and faster verification procedures."
    },
    {
      icon: Shield,
      title: "Enhanced Protection",
      description: "Additional safeguards and protections specifically designed for retail traders and investors."
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Faster account approval and processing times, typically within 24-48 hours of application."
    },
    {
      icon: CheckCircle,
      title: "Regulatory Compliance",
      description: "Full compliance with UK financial regulations ensuring maximum protection for your investments."
    }
  ];

  const accountSteps = [
    {
      title: "Application Submission",
      description: "Complete the DFS account application form with your personal and financial information.",
      date: "Step 1",
      completed: true,
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Document Verification",
      description: "Submit required documents for identity and address verification through our secure portal.",
      date: "Step 2",
      completed: true,
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Account Review",
      description: "Our compliance team reviews your application and documentation for approval.",
      date: "Step 3",
      completed: false,
      icon: <Clock className="h-6 w-6" />
    },
    {
      title: "Account Activation",
      description: "Once approved, your DFS account is activated and ready for trading.",
      date: "Step 4",
      completed: false,
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  const faqs = [
    {
      question: "What is a DFS Account?",
      answer: "A DFS (Designated Financial Services) Account is a specialized account type that provides enhanced protections and simplified procedures for retail investors in accordance with UK financial regulations."
    },
    {
      question: "Who is eligible for a DFS Account?",
      answer: "DFS Accounts are available to UK residents who meet specific criteria including income requirements, investment experience, and regulatory compliance standards."
    },
    {
      question: "What are the benefits of a DFS Account?",
      answer: "Benefits include enhanced investor protections, priority customer support, simplified documentation processes, and access to exclusive trading features and educational resources."
    },
    {
      question: "How long does the application process take?",
      answer: "The DFS account application process typically takes 24-48 hours for review and approval, assuming all required documentation is provided correctly."
    },
    {
      question: "Are there any fees for a DFS Account?",
      answer: "There are no additional fees for opening or maintaining a DFS Account. All standard Plus500 trading costs and fee structures apply normally."
    },
    {
      question: "Can I convert my existing account to a DFS Account?",
      answer: "Yes, existing Plus500 customers can apply to convert their standard account to a DFS Account by completing the required application and verification process."
    }
  ];

  const aboutContent = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        The DFS Account is designed specifically for UK retail investors who want enhanced protections 
        and a streamlined trading experience. This account type provides additional safeguards while 
        maintaining access to all Plus500 trading features.
      </p>
      <p>
        DFS Accounts are fully regulated by the Financial Conduct Authority (FCA) and include enhanced 
        investor protection measures, priority support, and simplified account management procedures.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>FCA regulated and protected</li>
        <li>Enhanced investor safeguards</li>
        <li>Priority customer support</li>
        <li>Simplified documentation</li>
        <li>Access to exclusive features</li>
        <li>Educational resources included</li>
      </ul>
    </div>
  );

  const eligibilityContent = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        To qualify for a DFS Account, applicants must meet specific regulatory requirements 
        designed to ensure suitability and protection for retail investors.
      </p>
      <p>
        These requirements help ensure that DFS Account holders have the necessary knowledge 
        and financial capacity to engage in CFD trading responsibly.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>UK residency requirement</li>
        <li>Minimum income threshold</li>
        <li>Investment experience assessment</li>
        <li>Risk tolerance evaluation</li>
        <li>Identity and address verification</li>
        <li>Compliance with FCA guidelines</li>
      </ul>
    </div>
  );

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DFS Account
          </h1>
          <p className="text-xl text-muted-foreground">
            Enhanced protection and streamlined trading for UK retail investors with additional regulatory safeguards.
          </p>
        </div>
      </div>
      
      <RichTextSection
        title="What is a DFS Account?"
        content={aboutContent}
        image="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="DFS Account Benefits"
        imagePosition="right"
        backgroundColor="muted"
      />
      
      <BulletList
        title="DFS Account Benefits"
        items={dfsFeatures}
        columns={4}
      />
      
      <RichTextSection
        title="Eligibility Requirements"
        content={eligibilityContent}
        image="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="Account Eligibility"
        imagePosition="left"
        backgroundColor="default"
      />
      
      <Timeline
        title="Application Process"
        items={accountSteps}
        showProgress={true}
      />
      
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about DFS Accounts"
        faqs={faqs}
        defaultOpen={["item-0"]}
      />
      
      <CTASection
        title="Ready to Apply for a DFS Account?"
        subtitle="Take advantage of enhanced protections and priority support with a DFS Account designed for UK retail investors."
        primaryButtonText="Apply for DFS Account"
        secondaryButtonText="Learn More"
        onPrimaryClick={() => console.log('Apply for DFS Account clicked')}
        onSecondaryClick={() => console.log('Learn More clicked')}
        backgroundVariant="gradient"
      />
    </div>
  );
}