/**
 * Accessible Dropdown Menu Component
 * Follows ARIA Authoring Practices Guide
 * https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
 */

(function() {
  const trigger = document.getElementById('dropdown-trigger');
  const menu = document.getElementById('dropdown-menu');

  if (!trigger || !menu) return;

  const menuItems = menu.querySelectorAll('[role="menuitem"]');
  let currentIndex = -1;

  // Toggle menu on trigger click
  trigger.addEventListener('click', () => {
    toggleMenu();
  });

  // Keyboard handler for trigger
  trigger.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'Enter':
      case ' ': // Space
      case 'ArrowDown':
        e.preventDefault();
        openMenu();
        focusMenuItem(0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        openMenu();
        focusMenuItem(menuItems.length - 1);
        break;
    }
  });

  // Keyboard handler for menu
  menu.addEventListener('keydown', (e) => {
    handleMenuKeyboard(e);
  });

  // Click handlers for menu items
  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      closeMenu();
    });

    item.addEventListener('focus', () => {
      currentIndex = index;
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  function toggleMenu() {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    trigger.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('hidden');
  }

  function closeMenu() {
    trigger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('hidden', '');
    trigger.focus();
    currentIndex = -1;
  }

  function handleMenuKeyboard(e) {
    switch(e.key) {
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;

      case 'ArrowDown':
        e.preventDefault();
        focusNextItem();
        break;

      case 'ArrowUp':
        e.preventDefault();
        focusPreviousItem();
        break;

      case 'Home':
        e.preventDefault();
        focusMenuItem(0);
        break;

      case 'End':
        e.preventDefault();
        focusMenuItem(menuItems.length - 1);
        break;

      case 'Tab':
        e.preventDefault();
        closeMenu();
        break;
    }
  }

  function focusMenuItem(index) {
    if (index >= 0 && index < menuItems.length) {
      currentIndex = index;
      menuItems[index].focus();
    }
  }

  function focusNextItem() {
    const nextIndex = (currentIndex + 1) % menuItems.length;
    focusMenuItem(nextIndex);
  }

  function focusPreviousItem() {
    const prevIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
    focusMenuItem(prevIndex);
  }
})();

