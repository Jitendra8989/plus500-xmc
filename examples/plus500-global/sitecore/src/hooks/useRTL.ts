import { useRouter } from 'next/router';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect, useState } from 'react';

export const useRTL = () => {
  const router = useRouter();
  const { page } = useSitecore();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const rtlLocales = ['ar', 'ar-ae', 'ar-sa', 'he', 'fa', 'ur'];

    // Multiple detection methods for different contexts
    const currentLocale =
      router.locale ||
      (typeof window !== 'undefined' && window.location.pathname.split('/')[1]) ||
      (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sc_lang')) ||
      page?.layout?.sitecore?.context?.language ||
      'en';

    const detectedRTL = rtlLocales.some(locale =>
      currentLocale.toLowerCase().includes(locale.toLowerCase())
    );

    setIsRTL(detectedRTL);
  }, [router.locale, page]);

  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'rtl:text-right' : 'ltr:text-left'
  };
};