import {
  TextField,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps as BaseComponentProps } from 'lib/component-props';

interface InstrumentItem {
  id: string;
  name: string;
  displayName: string;
  fields: {
    Text: TextField;      // Symbol (ETH, BTC, AAPL)
    Subtext: TextField;   // Name (Ethereum, Bitcoin, Apple)
    Icon: ImageField;     // Logo/Icon
    Money: TextField;     // Price ($2845.32)
    Percentage: TextField; // Change (+3.21 (+1.72%))
  };
}

interface Fields {
  Heading: TextField;
  Items: InstrumentItem[];
  StyleVariant: TextField;
}

export type CategoryInstrumentsRailProps = BaseComponentProps & {
  fields: Fields;
};