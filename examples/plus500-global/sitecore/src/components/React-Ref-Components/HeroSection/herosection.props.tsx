import {
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: TextField;
  Subtitle: TextField;
  Media: ImageField;
  PrimaryCTA: LinkField;
  SecondaryCTA: LinkField;
}

export type HeroSectionProps = ComponentProps & {
  fields: Fields;
};