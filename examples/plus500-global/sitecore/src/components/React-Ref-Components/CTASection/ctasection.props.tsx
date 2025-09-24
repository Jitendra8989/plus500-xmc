import {
  TextField,
  LinkField,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps as BaseComponentProps } from 'lib/component-props';

interface Fields {
  Title: TextField;
  Subtitle: TextField;
  PrimaryCTA: LinkField;
  SecondaryCTA: LinkField;
  BackgroundImage: ImageField;
  BackgroundVariant: TextField; // gradient, solid, image
}

export type CTASectionProps = BaseComponentProps & {
  fields: Fields;
};