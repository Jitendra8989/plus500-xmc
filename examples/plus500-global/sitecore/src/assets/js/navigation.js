// Header navigation logic
export const NavigationManager = {
  // Mobile menu state
  isMobileMenuOpen: false,

  // Active submenu state
  activeSubmenu: null,

  // Initialize navigation
  init() {
    this.bindEvents();
  },

  // Bind event listeners
  bindEvents() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-testid="button-mobile-menu"]')) {
        this.toggleMobileMenu();
      }
    });

    // Close mobile menu when clicking navigation items
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-nav-item')) {
        this.closeMobileMenu();
      }
    });

    // Handle desktop dropdown menus
    this.handleDesktopDropdowns();
  },

  // Toggle mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateMobileMenuState();
  },

  // Close mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.updateMobileMenuState();
  },

  // Update mobile menu visual state
  updateMobileMenuState() {
    const mobileMenu = document.querySelector('.mobile-navigation');
    const menuButton = document.querySelector('[data-testid="button-mobile-menu"]');

    if (mobileMenu) {
      if (this.isMobileMenuOpen) {
        mobileMenu.classList.add('max-h-screen', 'opacity-100');
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
      } else {
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-screen', 'opacity-100');
      }
    }

    // Update menu button icon
    if (menuButton) {
      const menuIcon = menuButton.querySelector('.menu-icon');
      const closeIcon = menuButton.querySelector('.close-icon');

      if (menuIcon && closeIcon) {
        menuIcon.style.display = this.isMobileMenuOpen ? 'none' : 'block';
        closeIcon.style.display = this.isMobileMenuOpen ? 'block' : 'none';
      }
    }
  },

  // Handle desktop dropdown menus
  handleDesktopDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', () => {
        const submenuName = trigger.dataset.submenu;
        this.showSubmenu(submenuName);
      });

      trigger.addEventListener('mouseleave', () => {
        this.hideSubmenu();
      });
    });
  },

  // Show submenu
  showSubmenu(submenuName) {
    this.activeSubmenu = submenuName;
    this.updateSubmenuStates();
  },

  // Hide submenu
  hideSubmenu() {
    this.activeSubmenu = null;
    this.updateSubmenuStates();
  },

  // Update submenu visual states
  updateSubmenuStates() {
    const submenus = document.querySelectorAll('.nav-submenu');

    submenus.forEach(submenu => {
      const submenuName = submenu.dataset.submenu;

      if (submenuName === this.activeSubmenu) {
        submenu.classList.add('opacity-100', 'translate-y-0');
        submenu.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
      } else {
        submenu.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
        submenu.classList.remove('opacity-100', 'translate-y-0');
      }
    });
  }
};

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    NavigationManager.init();
  });
}