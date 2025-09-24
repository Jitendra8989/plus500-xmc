// Mobile menu functionality
export const MobileMenu = {
  isOpen: false,
  menuElement: null,
  toggleButton: null,

  // Initialize mobile menu
  init() {
    this.menuElement = document.querySelector('.mobile-navigation');
    this.toggleButton = document.querySelector('[data-testid="button-mobile-menu"]');

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggle());
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e));

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
  },

  // Toggle mobile menu
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  // Open mobile menu
  open() {
    this.isOpen = true;
    this.updateMenuState();

    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    this.trapFocus();
  },

  // Close mobile menu
  close() {
    this.isOpen = false;
    this.updateMenuState();

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to toggle button
    if (this.toggleButton) {
      this.toggleButton.focus();
    }
  },

  // Update menu visual state
  updateMenuState() {
    if (!this.menuElement) return;

    if (this.isOpen) {
      this.menuElement.classList.add('max-h-screen', 'opacity-100');
      this.menuElement.classList.remove('max-h-0', 'opacity-0');
      this.menuElement.setAttribute('aria-hidden', 'false');
    } else {
      this.menuElement.classList.add('max-h-0', 'opacity-0');
      this.menuElement.classList.remove('max-h-screen', 'opacity-100');
      this.menuElement.setAttribute('aria-hidden', 'true');
    }

    // Update toggle button state
    if (this.toggleButton) {
      this.toggleButton.setAttribute('aria-expanded', this.isOpen.toString());
      this.updateButtonIcon();
    }
  },

  // Update button icon
  updateButtonIcon() {
    const menuIcon = this.toggleButton.querySelector('.lucide-menu');
    const closeIcon = this.toggleButton.querySelector('.lucide-x');

    if (menuIcon && closeIcon) {
      menuIcon.style.display = this.isOpen ? 'none' : 'block';
      closeIcon.style.display = this.isOpen ? 'block' : 'none';
    }
  },

  // Handle clicks outside menu
  handleOutsideClick(e) {
    if (!this.isOpen) return;

    const isClickInsideMenu = this.menuElement && this.menuElement.contains(e.target);
    const isClickOnToggle = this.toggleButton && this.toggleButton.contains(e.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
      this.close();
    }
  },

  // Handle window resize
  handleResize() {
    // Close mobile menu on desktop breakpoint
    if (window.innerWidth >= 1024 && this.isOpen) {
      this.close();
    }
  },

  // Focus trap for accessibility
  trapFocus() {
    if (!this.isOpen || !this.menuElement) return;

    const focusableElements = this.menuElement.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    // Handle tab navigation
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    // Remove event listener when menu closes
    const removeTabHandler = () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('focusout', removeTabHandler);
    };

    document.addEventListener('focusout', removeTabHandler);
  }
};

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    MobileMenu.init();
  });
}