import {
  TextField,
  RichTextField,
  BooleanField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps as BaseComponentProps } from 'lib/component-props';

interface FAQItem {
  id: string;
  name: string;
  displayName: string;
  fields: {
    Question: TextField;
    Answer: RichTextField;
    Category: TextField;
    SortOrder: TextField;
  };
}

interface Fields {
  Heading: TextField;
  SubTitle: TextField;
  AllowMultipleOpen: BooleanField;
  Items: FAQItem[];
}

export type FAQAccordionProps = BaseComponentProps & {
  fields: Fields;
};