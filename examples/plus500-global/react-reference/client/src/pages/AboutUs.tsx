import HeroBanner from "@/components/HeroBanner";
import RichTextSection from "@/components/RichTextSection";
import BulletList from "@/components/BulletList";
import Timeline from "@/components/Timeline";
import AwardsAndRatings from "@/components/AwardsAndRatings";
import { Building, Users, Globe, Award, Shield, TrendingUp } from "lucide-react";

export default function AboutUs() {
  const companyValues = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize the security of our clients' funds and data with industry-leading protection measures and regulatory compliance."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology to provide the best trading experience."
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Our clients are at the center of everything we do, driving our commitment to exceptional service and support."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving millions of traders across 50+ countries with localized support and market access."
    }
  ];

  const milestones = [
    {
      title: "Company Founded",
      description: "Plus500 was established with a vision to democratize financial markets and make trading accessible to everyone.",
      date: "2008",
      completed: true,
      icon: <Building className="h-6 w-6" />
    },
    {
      title: "IPO on London Stock Exchange",
      description: "Plus500 went public on the London Stock Exchange, marking a significant milestone in our growth journey.",
      date: "2013",
      completed: true,
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "10 Million Users",
      description: "Reached the milestone of 10 million registered users worldwide, establishing ourselves as a leading CFD provider.",
      date: "2018",
      completed: true,
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "25 Million Users",
      description: "Continued growth led us to serve over 25 million registered users across our global platform.",
      date: "2023",
      completed: true,
      icon: <Globe className="h-6 w-6" />
    }
  ];

  const awards = [
    {
      title: "Best CFD Provider",
      description: "Recognized for excellence in CFD trading platform and customer service",
      year: "2024",
      icon: <Award className="h-8 w-8 text-primary" />
    },
    {
      title: "Most Trusted Broker",
      description: "Awarded for maintaining the highest standards of transparency and regulation",
      year: "2024",
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      title: "Innovation Award",
      description: "Honored for technological advancement in trading platform development",
      year: "2023",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    },
    {
      title: "Global Expansion",
      description: "Recognized for successful international expansion and localization efforts",
      year: "2023",
      icon: <Globe className="h-8 w-8 text-primary" />
    }
  ];

  const aboutContent = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        Plus500 is a leading fintech company and a FTSE 250 constituent, that has been operating 
        its proprietary trading platform since 2008. We serve over 25 million registered customers globally.
      </p>
      <p>
        Our mission is to make financial markets accessible to everyone through innovative technology, 
        competitive pricing, and exceptional customer service. We're regulated by top-tier authorities 
        including the FCA, CySEC, and ASIC.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Founded in 2008 with headquarters in London</li>
        <li>Listed on the London Stock Exchange (FTSE 250)</li>
        <li>Serving 25+ million registered users worldwide</li>
        <li>Operating in 50+ countries</li>
        <li>Multi-regulated by top financial authorities</li>
        <li>Award-winning trading platform and mobile apps</li>
      </ul>
    </div>
  );

  const visionContent = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        We envision a world where anyone can participate in financial markets with confidence, 
        regardless of their experience level or account size.
      </p>
      <p>
        Our commitment to innovation, transparency, and customer-centric approach drives us to 
        continuously improve our platform and services, ensuring our clients have the best 
        possible trading experience.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Democratizing access to financial markets</li>
        <li>Empowering traders with advanced technology</li>
        <li>Maintaining the highest regulatory standards</li>
        <li>Building long-term customer relationships</li>
      </ul>
    </div>
  );

  return (
    <div>
      <HeroBanner
        title="About Plus500"
        subtitle="A leading fintech company making financial markets accessible to millions of traders worldwide since 2008."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ctaText="Start Trading"
        secondaryCtaText="Learn More"
        onCtaClick={() => console.log('Start Trading clicked')}
        onSecondaryCtaClick={() => console.log('Learn More clicked')}
      />
      
      <RichTextSection
        title="Who We Are"
        content={aboutContent}
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="About Plus500"
        imagePosition="right"
        backgroundColor="default"
      />
      
      <BulletList
        title="Our Core Values"
        items={companyValues}
        columns={4}
      />
      
      <RichTextSection
        title="Our Vision & Mission"
        content={visionContent}
        image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="Plus500 Vision"
        imagePosition="left"
        backgroundColor="muted"
      />
      
      <Timeline
        title="Our Journey"
        items={milestones}
        showProgress={true}
      />
      
      <AwardsAndRatings
        title="Recognition & Awards"
        awards={awards}
        columns={4}
      />
    </div>
  );
}