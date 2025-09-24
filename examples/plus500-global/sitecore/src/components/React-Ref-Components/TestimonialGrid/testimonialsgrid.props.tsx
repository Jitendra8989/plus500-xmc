import {
  TextField,
  ImageField,
  NumberField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps as BaseComponentProps } from 'lib/component-props';

interface TestimonialItem {
  id: string;
  name: string;
  displayName: string;
  fields: {
    Text: TextField;          // Reviewer name (Sarah Johnson)
    Subtext: TextField;       // Testimonial quote/message
    Icon: ImageField;         // Profile image
    Money: TextField;         // Profession/title (Professional Trader)
    Percentage: TextField;    // Rating as percentage (5%, 4%, etc.)
  };
}

interface Fields {
  Heading: TextField;
  Items: TestimonialItem[];
  Columns: NumberField;       // 1, 2, or 3 columns
}

export type TestimonialGridProps = BaseComponentProps & {
  fields: Fields;
};