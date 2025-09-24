import {
  TextField,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps as BaseComponentProps } from 'lib/component-props';

interface Fields {
  Image: ImageField;
  Alt: TextField; // Serves as both title and alt text
  Caption: TextField;
  Alignment: TextField;
}

export type ImageWithCaptionProps = BaseComponentProps & {
  fields: Fields;
};