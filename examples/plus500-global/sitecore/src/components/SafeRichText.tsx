import React from 'react';
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';

interface SafeRichTextProps {
  field?: RichTextField | null | undefined;
  className?: string;
  tag?: string;
}

export const SafeRichText: React.FC<SafeRichTextProps> = ({ field, className, tag = "div" }) => {
  // Safety check: only render if field exists and has valid structure
  if (!field || !field.value) {
    return null;
  }

  return (
    <RichText
      field={field}
      className={className}
      tag={tag}
    />
  );
};

export default SafeRichText;