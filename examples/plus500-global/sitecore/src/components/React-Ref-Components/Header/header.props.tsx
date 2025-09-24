import {
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface NavigationItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    TreeList?: NavigationItem[];
    GeneralLink: {
      value: {
        text: string;
        href: string;
        target?: string;
      };
    };
    Title: {
      value: string;
    };
  };
}

interface Fields {
  Logo: ImageField;
  MainMenu: NavigationItem[];
  LogoCTA: LinkField;
  PrimaryCTA: LinkField;
  SecondaryCTA: LinkField;
  LanguageNavigator: NavigationItem[];
}

export type HeaderProps = ComponentProps & {
  fields: Fields;
};