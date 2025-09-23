/**
 * Button Types - Plus500 Design System
 * Global button component types and interfaces
 */

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

/**
 * Button Variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

/**
 * Button Sizes
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button Theme
 */
export type ButtonTheme = 'light' | 'dark';

/**
 * Base Button Props
 */
export interface BaseButtonProps {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Icon to display before button text */
  leftIcon?: ReactNode;
  /** Icon to display after button text */
  rightIcon?: ReactNode;
  /** Whether this is an icon-only button */
  iconOnly?: boolean;
  /** Button theme for dark/light mode */
  theme?: ButtonTheme;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children?: ReactNode;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * HTML Button Element Props
 */
export interface HTMLButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'className' | 'children'> {
  /** Render as HTML button element */
  as?: 'button';
}

/**
 * Anchor Element Props (for links styled as buttons)
 */
export interface AnchorButtonProps
  extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  /** Render as anchor element */
  as: 'link';
  /** Link destination */
  href: string;
  /** Link target */
  target?: string;
  /** Link relationship */
  rel?: string;
}

/**
 * Union of all possible button props
 */
export type ButtonProps = HTMLButtonProps | AnchorButtonProps;

/**
 * CTA Button specific types (for Header and other components)
 */
export interface CTAButtonProps extends Omit<BaseButtonProps, 'variant'> {
  /** CTA specific variants */
  variant: 'primary' | 'secondary';
  /** Button text */
  text: string;
  /** Button link URL */
  href?: string;
  /** Link target */
  target?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Predefined button configurations for common use cases
 */
export const BUTTON_PRESETS = {
  // Header buttons
  HEADER_PRIMARY: {
    variant: 'primary' as ButtonVariant,
    size: 'medium' as ButtonSize,
  },
  HEADER_SECONDARY: {
    variant: 'secondary' as ButtonVariant,
    size: 'medium' as ButtonSize,
  },

  // Form buttons
  FORM_SUBMIT: {
    variant: 'primary' as ButtonVariant,
    size: 'medium' as ButtonSize,
    type: 'submit' as const,
  },
  FORM_CANCEL: {
    variant: 'ghost' as ButtonVariant,
    size: 'medium' as ButtonSize,
    type: 'button' as const,
  },
} as const;

/**
 * Type guard functions to determine button type at runtime
 */
export function isHTMLButtonProps(props: ButtonProps): props is HTMLButtonProps {
  return !props.hasOwnProperty('as') || props.as === 'button';
}

export function isAnchorButtonProps(props: ButtonProps): props is AnchorButtonProps {
  return props.hasOwnProperty('as') && (props as AnchorButtonProps).as === 'link';
}
