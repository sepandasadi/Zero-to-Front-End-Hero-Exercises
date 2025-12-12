import { useState, createContext, useContext, useId } from 'react';
import './Accordion.css';

const AccordionContext = createContext();

export function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  function toggleItem(index) {
    if (allowMultiple) {
      setOpenItems(openItems.includes(index)
        ? openItems.filter(i => i !== index)
        : [...openItems, index]
      );
    } else {
      setOpenItems(openItems.includes(index) ? [] : [index]);
    }
  }

  const value = {
    openItems,
    toggleItem
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ title, children, index }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const id = useId();
  const isOpen = openItems.includes(index);

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => toggleItem(index)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`header-${id}`}
      >
        {title}
        <span className="icon">{isOpen ? '▼' : '►'}</span>
      </button>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`header-${id}`}
        className={`accordion-content ${isOpen ? 'open' : 'closed'}`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}

