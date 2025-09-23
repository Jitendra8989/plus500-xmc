// Below are built-in components that are available in the app, it's recommended to keep them as is
import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';
// end of built-in components

// Components imported from the app itself
import * as Title from 'src/components/title/Title';
import * as FinnhubStockDashboard from 'src/components/stock-dashboard/FinnhubStockDashboard';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as MarketCalenderEventDetail from 'src/components/market-calendar-detail/MarketCalenderEventDetail';
import * as MarketCalenderRegion from 'src/components/market-calendar-backup/MarketCalenderRegion';
import * as MarketCalendarGraphql from 'src/components/market-calendar/MarketCalendarGraphql';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as Header from 'src/components/header/Header';
import * as Footer from 'src/components/footer/Footer';
import * as FinancialInstruments from 'src/components/financial-instruments/FinancialInstruments';
import * as FeatureSection from 'src/components/feature-section/FeatureSection';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as HeroSection from 'src/components/banner/hero-section/HeroSection';


// Components must be registered within the map to match the string key with component name in Sitecore
export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', Title],
  ['FinnhubStockDashboard', FinnhubStockDashboard],
  ['RowSplitter', RowSplitter],
  ['RichText', RichText],
  ['Promo', Promo],
  ['PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder],
  ['PageContent', PageContent],
  ['Navigation', Navigation],
  ['MarketCalenderEventDetail', MarketCalenderEventDetail],
  ['MarketCalenderRegion', MarketCalenderRegion],
  ['MarketCalendarGraphql', MarketCalendarGraphql],
  ['LinkList', LinkList],
  ['Image', Image],
  ['Header', Header],
  ['Footer', Footer],
  ['FinancialInstruments', FinancialInstruments],
  ['FeatureSection', FeatureSection],
  ['ContentBlock', ContentBlock],
  ['Container', Container],
  ['ColumnSplitter', ColumnSplitter],
  ['HeroSection', HeroSection],
]);

export default componentMap;
