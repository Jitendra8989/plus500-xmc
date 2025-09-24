import {
  TextField,
  RichTextField,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface LinkItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    TreeList: any[];
    GeneralLink: LinkField;
    Title: TextField;
    Image: ImageField;
    'Sub Title': TextField;
  };
}

interface Fields {
  Logo: ImageField;
  LogoCTA: LinkField;
  BrandDetail: TextField;
  'Section-1-Header': TextField;
  'Section-1-Links': LinkItem[];
  'Section-2-Header': TextField;
  'Section-2-Links': LinkItem[];
  'Section-3-Header': TextField;
  'Section-3-Links': LinkItem[];
  'Section-4-Header': TextField;
  'Section-4-Links': LinkItem[];
  SocialLinks: LinkItem[];
  'SocialLinks-Header': TextField;
  'Region Info': RichTextField;
  'LegalText-1': TextField;
  'LegalText-2': TextField;
}

export type FooterProps = ComponentProps & {
  fields: Fields;
};