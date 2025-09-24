import {
  TextField,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps as BaseComponentProps } from 'lib/component-props';

interface BulletItem {
  id: string;
  name: string;
  displayName: string;
  fields: {
    Icon: ImageField;
    Text: TextField;
    Subtext: TextField;
  };
}

interface Fields {
  Heading: TextField;
  Items: BulletItem[];
  StyleVariant: TextField;
}

export type BulletListProps = BaseComponentProps & {
  fields: Fields;
};