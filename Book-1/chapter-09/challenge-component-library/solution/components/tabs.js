/**
 * Accessible Tabs Component
 * Follows ARIA Authoring Practices Guide
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */

(function() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = tablist.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  // Click handlers
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activateTab(tab);
    });

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      handleTabKeyboard(e, index);
    });
  });

  function activateTab(selectedTab) {
    // Deactivate all tabs
    tabs.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });

    // Hide all panels
    panels.forEach(panel => {
      panel.setAttribute('hidden', '');
    });

    // Activate selected tab
    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.setAttribute('tabindex', '0');

    // Show associated panel
    const panelId = selectedTab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.removeAttribute('hidden');
    }
  }

  function handleTabKeyboard(e, currentIndex) {
    let handled = false;

    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
        handled = true;
        break;

      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        tabs[prevIndex].focus();
        activateTab(tabs[prevIndex]);
        handled = true;
        break;

      case 'Home':
        e.preventDefault();
        tabs[0].focus();
        activateTab(tabs[0]);
        handled = true;
        break;

      case 'End':
        e.preventDefault();
        const lastIndex = tabs.length - 1;
        tabs[lastIndex].focus();
        activateTab(tabs[lastIndex]);
        handled = true;
        break;
    }

    return handled;
  }
})();

