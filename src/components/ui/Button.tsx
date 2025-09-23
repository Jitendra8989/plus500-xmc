/**
 * Button Component - Plus500 Design System
 * Reusable button component with consistent styling
 */

import React, { forwardRef } from 'react';
import { ButtonProps, BaseButtonProps, isHTMLButtonProps, isAnchorButtonProps } from '../../styles/button-types';
import styles from '../../styles/buttons.module.css';

/**
 * Generate button CSS classes based on props
 */
const getButtonClasses = (props: BaseButtonProps, additionalClasses?: string): string => {
  const {
    variant = 'primary',
    size = 'medium',
    loading = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    theme = 'light',
    className = '',
  } = props;

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
  ];

  // Add conditional classes
  if (loading) classes.push(styles.loading);
  if (iconOnly) classes.push(styles.iconOnly);
  if ((leftIcon || rightIcon) && !iconOnly) classes.push(styles.withIcon);
  if (theme === 'dark') classes.push(styles.darkTheme);
  
  // Add additional classes
  if (additionalClasses) classes.push(additionalClasses);
  if (className) classes.push(className);

  return classes.join(' ');
};

/**
 * Button Component
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ children, leftIcon, rightIcon, iconOnly, loading, className, ...props }, ref) => {
  const buttonClasses = getButtonClasses(props, className);

  // Common content structure
  const content = (
    <>
      {loading ? null : leftIcon}
      {!iconOnly && children}
      {loading ? null : rightIcon}
    </>
  );

  // Render as HTML button
  if (isHTMLButtonProps(props)) {
    const { variant, size, theme, leftIcon: _, rightIcon: __, iconOnly: ___, loading: ____, ...buttonProps } = props;
    
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClasses}
        disabled={props.disabled || loading}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }

  // Render as anchor (link)
  if (isAnchorButtonProps(props)) {
    const { variant, size, theme, leftIcon: _, rightIcon: __, iconOnly: ___, loading: ____, as, ...linkProps } = props;
    
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={buttonClasses}
        {...linkProps}
      >
        {content}
      </a>
    );
  }

  return null;
});

Button.displayName = 'Button';

/**
 * Pre-configured Button variants for common use cases
 */
export const PrimaryButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Omit<ButtonProps, 'variant'>>((props, ref) => (
  <Button ref={ref} variant="primary" {...props} />
));

export const SecondaryButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Omit<ButtonProps, 'variant'>>((props, ref) => (
  <Button ref={ref} variant="secondary" {...props} />
));

export const OutlineButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Omit<ButtonProps, 'variant'>>((props, ref) => (
  <Button ref={ref} variant="outline" {...props} />
));

export const GhostButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Omit<ButtonProps, 'variant'>>((props, ref) => (
  <Button ref={ref} variant="ghost" {...props} />
));

export const DestructiveButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Omit<ButtonProps, 'variant'>>((props, ref) => (
  <Button ref={ref} variant="destructive" {...props} />
));

PrimaryButton.displayName = 'PrimaryButton';
SecondaryButton.displayName = 'SecondaryButton';
OutlineButton.displayName = 'OutlineButton';
GhostButton.displayName = 'GhostButton';
DestructiveButton.displayName = 'DestructiveButton';