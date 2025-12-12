import { useState, createContext, useContext, useId } from 'react';

const AccordionContext = createContext();

export function Accordion({ children, allowMultiple = false }) {
  // TODO: Add state for tracking open items

  // TODO: Create toggleItem function

  // TODO: Create context value object

  return (
    <AccordionContext.Provider value={/* TODO */}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ title, children, index }) {
  // TODO: Get context values

  // TODO: Check if this item is open

  const id = useId();

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        // TODO: Add onClick handler
        // TODO: Add ARIA attributes
      >
        {title}
        <span className="icon">{/* TODO: Show appropriate icon */}</span>
      </button>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`header-${id}`}
        // TODO: Add dynamic className
        // TODO: Add hidden attribute
      >
        {children}
      </div>
    </div>
  );
}

