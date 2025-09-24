// Basic animations to replace Framer Motion
export const Animations = {
  // Initialize all animations
  init() {
    this.initHeroAnimations();
    this.initScrollAnimations();
    this.initInteractionAnimations();
  },

  // Hero section animations
  initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-animate');

    heroElements.forEach((element, index) => {
      // Stagger animation delays
      const delay = index * 200;

      setTimeout(() => {
        element.classList.add('animate-fade-in-up');
      }, delay);
    });

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.classList.add('animate-bounce');
    }
  },

  // Scroll-triggered animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');

          // Handle staggered animations for groups
          if (entry.target.hasAttribute('data-stagger-children')) {
            this.staggerChildAnimations(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  },

  // Stagger child element animations
  staggerChildAnimations(parent) {
    const children = parent.querySelectorAll('.stagger-item');

    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('animate-fade-in-up');
      }, index * 100);
    });
  },

  // Interaction animations
  initInteractionAnimations() {
    // Button hover effects
    document.querySelectorAll('.hover-elevate').forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.transition = 'transform 0.2s ease-out';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });

    // Card hover effects
    document.querySelectorAll('.card-hover').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        card.style.transition = 'all 0.3s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
      });
    });
  },

  // Utility: Fade in animation
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      element.style.opacity = Math.min(progress / duration, 1);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  },

  // Utility: Fade out animation
  fadeOut(element, duration = 300) {
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      element.style.opacity = Math.max(1 - (progress / duration), 0);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };

    requestAnimationFrame(animate);
  },

  // Utility: Slide in from direction
  slideIn(element, direction = 'up', duration = 400) {
    const transforms = {
      up: 'translateY(30px)',
      down: 'translateY(-30px)',
      left: 'translateX(30px)',
      right: 'translateX(-30px)'
    };

    element.style.opacity = '0';
    element.style.transform = transforms[direction];
    element.style.transition = `all ${duration}ms ease-out`;

    // Trigger animation
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0)';
    });
  },

  // Utility: Scale animation
  scaleIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.9)';
    element.style.transition = `all ${duration}ms ease-out`;

    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }
};

// CSS Animation Classes (to be added to CSS)
const animationCSS = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }

  /* Utility classes for initial states */
  .hero-animate {
    opacity: 0;
    transform: translateY(30px);
  }

  .animate-on-scroll {
    opacity: 0;
  }

  .stagger-item {
    opacity: 0;
    transform: translateY(20px);
  }
`;

// Inject animation CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animationCSS;
  document.head.appendChild(style);

  // Auto-initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    Animations.init();
  });
}