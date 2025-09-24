// Centralized component catalog for Component Exporter
// This ensures consistency and prevents drift from actual codebase

export type SitecoreFieldType = 
  | "SingleLineText" 
  | "MultiLineText" 
  | "RichText" 
  | "Number" 
  | "Checkbox" 
  | "Image" 
  | "GeneralLink" 
  | "Droptree" 
  | "Multilist"
  | "DateTime";

export interface ComponentProperty {
  name: string;
  type: string;
  sitecoreType: SitecoreFieldType;
  required: boolean;
  description: string;
  defaultValue?: string;
  enumValues?: string[];
}

export interface ComponentMetadata {
  name: string;
  displayName: string;
  description: string;
  category: "Business" | "UI" | "Layout" | "Form" | "Navigation";
  filePath: string;
  importPath: string;
  props: ComponentProperty[];
  dependencies: string[];
  usage: string;
  examples: string[];
  placeholders?: string[];
  renderingParameters?: ComponentProperty[];
}

export const componentCatalog: ComponentMetadata[] = [
  {
    name: "HeroBanner",
    displayName: "Hero Banner",
    description: "A prominent banner section with title, subtitle, background image and call-to-action buttons",
    category: "Business",
    filePath: "client/src/components/HeroBanner.tsx",
    importPath: "src/components/HeroBanner",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: true, description: "Main heading text" },
      { name: "subtitle", type: "string", sitecoreType: "MultiLineText", required: false, description: "Secondary descriptive text" },
      { name: "backgroundImage", type: "string", sitecoreType: "Image", required: false, description: "Background image URL" },
      { name: "ctaText", type: "string", sitecoreType: "SingleLineText", required: false, description: "Primary button text" },
      { name: "secondaryCtaText", type: "string", sitecoreType: "SingleLineText", required: false, description: "Secondary button text" },
      { name: "onCtaClick", type: "() => void", sitecoreType: "GeneralLink", required: false, description: "Primary button link" },
      { name: "onSecondaryCtaClick", type: "() => void", sitecoreType: "GeneralLink", required: false, description: "Secondary button link" }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Used for page headers and landing page hero sections",
    examples: ["Homepage hero", "Product landing pages", "Marketing campaigns"],
    placeholders: ["hero-content"]
  },
  {
    name: "ReviewsGrid",
    displayName: "Reviews Grid",
    description: "Displays customer reviews in a responsive grid layout with ratings and avatars",
    category: "Business",
    filePath: "client/src/components/ReviewsGrid.tsx",
    importPath: "src/components/ReviewsGrid",
    props: [
      { name: "reviews", type: "Review[]", sitecoreType: "Multilist", required: true, description: "Array of review datasource items" },
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title", defaultValue: "Customer Reviews" },
      { name: "columns", type: "1 | 2 | 3", sitecoreType: "Droptree", required: false, description: "Number of columns", defaultValue: "3", enumValues: ["1", "2", "3"] }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Display customer testimonials and reviews",
    examples: ["Reviews page", "Homepage testimonials", "Product reviews"],
    placeholders: ["reviews-content"]
  },
  {
    name: "BulletList",
    displayName: "Bullet List",
    description: "Displays a list of features or benefits with icons, titles, and descriptions",
    category: "Business",
    filePath: "client/src/components/BulletList.tsx",
    importPath: "src/components/BulletList",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" },
      { name: "items", type: "BulletItem[]", sitecoreType: "Multilist", required: true, description: "Array of feature items" },
      { name: "columns", type: "1 | 2 | 3 | 4", sitecoreType: "Droptree", required: false, description: "Number of columns", defaultValue: "3", enumValues: ["1", "2", "3", "4"] }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Highlight features, benefits, or key points",
    examples: ["Feature sections", "Benefits lists", "Service offerings"],
    placeholders: ["features-content"]
  },
  {
    name: "CTASection",
    displayName: "Call to Action Section",
    description: "Call-to-action section with title, subtitle, and action buttons",
    category: "Business",
    filePath: "client/src/components/CTASection.tsx",
    importPath: "src/components/CTASection",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: true, description: "Main CTA heading" },
      { name: "subtitle", type: "string", sitecoreType: "MultiLineText", required: false, description: "Supporting text" },
      { name: "primaryButtonText", type: "string", sitecoreType: "SingleLineText", required: false, description: "Primary button label" },
      { name: "secondaryButtonText", type: "string", sitecoreType: "SingleLineText", required: false, description: "Secondary button label" },
      { name: "onPrimaryClick", type: "() => void", sitecoreType: "GeneralLink", required: false, description: "Primary button link" },
      { name: "onSecondaryClick", type: "() => void", sitecoreType: "GeneralLink", required: false, description: "Secondary button link" },
      { name: "backgroundVariant", type: "default | gradient", sitecoreType: "Droptree", required: false, description: "Background style", enumValues: ["default", "gradient"] }
    ],
    dependencies: ["framer-motion"],
    usage: "Drive user actions and conversions",
    examples: ["Sign-up sections", "Download prompts", "Contact forms"],
    placeholders: ["cta-content"]
  },
  {
    name: "CategoryInstrumentsRail",
    displayName: "Category Instruments Rail",
    description: "Horizontal scrolling list of financial instruments organized by category",
    category: "Business",
    filePath: "client/src/components/CategoryInstrumentsRail.tsx",
    importPath: "src/components/CategoryInstrumentsRail",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" },
      { name: "instruments", type: "Instrument[]", sitecoreType: "Multilist", required: true, description: "Array of financial instruments" }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Display trading instruments and financial products",
    examples: ["Popular instruments", "Featured products", "Category listings"],
    placeholders: ["instruments-content"]
  },
  {
    name: "FAQAccordion",
    displayName: "FAQ Accordion",
    description: "Expandable FAQ section with questions and answers",
    category: "Business",
    filePath: "client/src/components/FAQAccordion.tsx",
    importPath: "src/components/FAQAccordion",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" },
      { name: "faqs", type: "FAQ[]", sitecoreType: "Multilist", required: true, description: "Array of FAQ items" }
    ],
    dependencies: ["framer-motion", "@radix-ui/react-accordion"],
    usage: "Display frequently asked questions",
    examples: ["Support pages", "Product information", "Help sections"],
    placeholders: ["faq-content"]
  },
  {
    name: "LearningCards",
    displayName: "Learning Cards",
    description: "Educational content cards with images, titles, and descriptions",
    category: "Business",
    filePath: "client/src/components/LearningCards.tsx",
    importPath: "src/components/LearningCards",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" },
      { name: "cards", type: "LearningCard[]", sitecoreType: "Multilist", required: true, description: "Array of learning content" },
      { name: "columns", type: "1 | 2 | 3", sitecoreType: "Droptree", required: false, description: "Number of columns", defaultValue: "3", enumValues: ["1", "2", "3"] }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Display educational content and resources",
    examples: ["Training materials", "Tutorials", "Knowledge base"],
    placeholders: ["learning-content"]
  },
  {
    name: "ReviewSummary",
    displayName: "Review Summary",
    description: "Summary of customer ratings with average score and breakdown",
    category: "Business",
    filePath: "client/src/components/ReviewSummary.tsx",
    importPath: "src/components/ReviewSummary",
    props: [
      { name: "averageRating", type: "number", sitecoreType: "Number", required: true, description: "Average rating score" },
      { name: "totalReviews", type: "number", sitecoreType: "Number", required: true, description: "Total number of reviews" },
      { name: "ratingBreakdown", type: "RatingBreakdown[]", sitecoreType: "Multilist", required: true, description: "Rating distribution" },
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Display review statistics and ratings overview",
    examples: ["Product reviews", "Service ratings", "Customer feedback"],
    placeholders: ["summary-content"]
  },
  {
    name: "RichTextSection",
    displayName: "Rich Text Section",
    description: "Rich text content section with optional image and flexible layout",
    category: "Layout",
    filePath: "client/src/components/RichTextSection.tsx",
    importPath: "src/components/RichTextSection",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" },
      { name: "content", type: "string", sitecoreType: "RichText", required: true, description: "HTML content" },
      { name: "image", type: "string", sitecoreType: "Image", required: false, description: "Image URL" },
      { name: "imagePosition", type: "left | right", sitecoreType: "Droptree", required: false, description: "Image alignment", enumValues: ["left", "right"] },
      { name: "backgroundColor", type: "string", sitecoreType: "SingleLineText", required: false, description: "Background color" }
    ],
    dependencies: ["framer-motion"],
    usage: "Display formatted text content with images",
    examples: ["About sections", "Article content", "Information pages"],
    placeholders: ["content-area"]
  },
  {
    name: "Timeline",
    displayName: "Timeline",
    description: "Vertical timeline component for displaying chronological events",
    category: "Layout",
    filePath: "client/src/components/Timeline.tsx",
    importPath: "src/components/Timeline",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title" },
      { name: "events", type: "TimelineEvent[]", sitecoreType: "Multilist", required: true, description: "Array of timeline events" }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Display chronological information and milestones",
    examples: ["Company history", "Process steps", "Event sequences"],
    placeholders: ["timeline-content"]
  },
  {
    name: "AwardsAndRatings",
    displayName: "Awards and Ratings",
    description: "Display awards, ratings, and recognitions with icons and descriptions",
    category: "Business",
    filePath: "client/src/components/AwardsAndRatings.tsx",
    importPath: "src/components/AwardsAndRatings",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: false, description: "Section title", defaultValue: "Awards & Recognition" },
      { name: "awards", type: "AwardData[]", sitecoreType: "Multilist", required: true, description: "Array of award items" },
      { name: "columns", type: "2 | 3 | 4", sitecoreType: "Droptree", required: false, description: "Number of columns", defaultValue: "4", enumValues: ["2", "3", "4"] }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Showcase company awards and recognition",
    examples: ["Awards section", "Trust indicators", "Company achievements"],
    placeholders: ["awards-content"]
  },
  {
    name: "ComparisonTable",
    displayName: "Comparison Table",
    description: "Side-by-side comparison table highlighting features and differences",
    category: "Business",
    filePath: "client/src/components/ComparisonTable.tsx",
    importPath: "src/components/ComparisonTable",
    props: [
      { name: "title", type: "string", sitecoreType: "SingleLineText", required: true, description: "Table title" },
      { name: "subtitle", type: "string", sitecoreType: "MultiLineText", required: false, description: "Table subtitle" },
      { name: "headers", type: "ComparisonHeaders", sitecoreType: "MultiLineText", required: true, description: "Column headers" },
      { name: "rows", type: "TableRow[]", sitecoreType: "Multilist", required: true, description: "Comparison data rows" }
    ],
    dependencies: ["framer-motion", "lucide-react"],
    usage: "Compare features between products or services",
    examples: ["Product comparisons", "Pricing tables", "Feature matrices"],
    placeholders: ["comparison-content"]
  },
  {
    name: "Header",
    displayName: "Header",
    description: "Main navigation header with logo, menu items, and responsive design",
    category: "Navigation",
    filePath: "client/src/components/Header.tsx",
    importPath: "src/components/Header",
    props: [],
    dependencies: ["wouter", "lucide-react"],
    usage: "Primary site navigation",
    examples: ["Site header", "Top navigation", "Brand header"],
    placeholders: ["header-content"]
  },
  {
    name: "Footer",
    displayName: "Footer",
    description: "Site footer with links, copyright, and company information",
    category: "Navigation",
    filePath: "client/src/components/Footer.tsx",
    importPath: "src/components/Footer",
    props: [],
    dependencies: ["wouter", "lucide-react"],
    usage: "Site footer navigation and information",
    examples: ["Site footer", "Bottom navigation", "Contact info"],
    placeholders: ["footer-content"]
  }
];

export const getComponentByName = (name: string): ComponentMetadata | undefined => {
  return componentCatalog.find(component => component.name === name);
};

export const getComponentsByCategory = (category: ComponentMetadata["category"]): ComponentMetadata[] => {
  return componentCatalog.filter(component => component.category === category);
};

export const getAllCategories = (): ComponentMetadata["category"][] => {
  return Array.from(new Set(componentCatalog.map(component => component.category)));
};

export const getAllDependencies = (): string[] => {
  return Array.from(new Set(componentCatalog.flatMap(component => component.dependencies)));
};