/**
 * Accessible Accordion Component
 * Follows ARIA Authoring Practices Guide
 * https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */

(function() {
  // Initialize all accordions on the page
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    initializeAccordion(accordion);
  });

  function initializeAccordion(accordion) {
    const headers = accordion.querySelectorAll('.accordion-header');

    headers.forEach(header => {
      // Click handler
      header.addEventListener('click', () => {
        toggleAccordion(header);
      });

      // Keyboard handler
      header.addEventListener('keydown', (e) => {
        handleKeyboard(e, header, headers);
      });
    });
  }

  function toggleAccordion(header) {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    const contentId = header.getAttribute('aria-controls');
    const content = document.getElementById(contentId);

    if (!content) return;

    // Toggle state
    header.setAttribute('aria-expanded', !isExpanded);

    if (isExpanded) {
      content.hidden = true;
    } else {
      content.hidden = false;
    }
  }

  function handleKeyboard(e, currentHeader, allHeaders) {
    let handled = false;

    switch(e.key) {
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        toggleAccordion(currentHeader);
        handled = true;
        break;

      case 'ArrowDown':
        e.preventDefault();
        focusNextHeader(currentHeader, allHeaders);
        handled = true;
        break;

      case 'ArrowUp':
        e.preventDefault();
        focusPreviousHeader(currentHeader, allHeaders);
        handled = true;
        break;

      case 'Home':
        e.preventDefault();
        allHeaders[0].focus();
        handled = true;
        break;

      case 'End':
        e.preventDefault();
        allHeaders[allHeaders.length - 1].focus();
        handled = true;
        break;
    }

    return handled;
  }

  function focusNextHeader(currentHeader, allHeaders) {
    const currentIndex = Array.from(allHeaders).indexOf(currentHeader);
    const nextIndex = (currentIndex + 1) % allHeaders.length;
    allHeaders[nextIndex].focus();
  }

  function focusPreviousHeader(currentHeader, allHeaders) {
    const currentIndex = Array.from(allHeaders).indexOf(currentHeader);
    const prevIndex = currentIndex === 0 ? allHeaders.length - 1 : currentIndex - 1;
    allHeaders[prevIndex].focus();
  }
})();

