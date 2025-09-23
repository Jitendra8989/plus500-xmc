/**
 * Example Component showing how to use global button styles
 * This demonstrates the reusability of the button system across components
 */

import React from 'react';
import { 
  PrimaryButton, 
  SecondaryButton, 
  OutlineButton, 
  GhostButton, 
  DestructiveButton,
} from '../ui';

/**
 * Hero Section Component
 * Shows how to use buttons in different contexts
 */
export const HeroSection: React.FC = () => {
  return (
    <div className="hero-section" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Plus500</h1>
      <p>Start trading with confidence</p>
      
      {/* CTA Buttons using global styles */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '2rem' }}>
        <PrimaryButton size="large">
          Start Trading Now
        </PrimaryButton>
        <SecondaryButton size="large">
          Try Demo Account
        </SecondaryButton>
      </div>
    </div>
  );
};

/**
 * Form Component Example
 */
export const ContactForm: React.FC = () => {
  return (
    <form style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Contact Us</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Your Name" 
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      {/* Form buttons using global styles */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <GhostButton type="button">
          Cancel
        </GhostButton>
        <PrimaryButton type="submit">
          Send Message
        </PrimaryButton>
      </div>
    </form>
  );
};

/**
 * Card Component with Actions
 */
interface CardProps {
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionCard: React.FC<CardProps> = ({ title, description, onEdit, onDelete }) => {
  return (
    <div 
      style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        padding: '1.5rem',
        marginBottom: '1rem'
      }}
    >
      <h3>{title}</h3>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{description}</p>
      
      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        {onEdit && (
          <OutlineButton size="small" onClick={onEdit}>
            Edit
          </OutlineButton>
        )}
        {onDelete && (
          <DestructiveButton size="small" onClick={onDelete}>
            Delete
          </DestructiveButton>
        )}
      </div>
    </div>
  );
};

/**
 * Loading Button Example
 */
export const LoadingButtonExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h3>Loading State Example</h3>
      <PrimaryButton 
        loading={loading} 
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? 'Processing...' : 'Submit Order'}
      </PrimaryButton>
    </div>
  );
};

/**
 * Button as Link Examples
 */
export const LinkButtonExamples: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h3>Buttons as Links</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <PrimaryButton 
          as="link" 
          href="/trading" 
          target="_blank"
        >
          Start Trading
        </PrimaryButton>
        
        <SecondaryButton 
          as="link" 
          href="/demo"
        >
          Try Demo
        </SecondaryButton>
        
        <OutlineButton 
          as="link" 
          href="/learn-more"
        >
          Learn More
        </OutlineButton>
      </div>
    </div>
  );
};