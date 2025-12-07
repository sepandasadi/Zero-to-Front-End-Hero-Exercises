# Complete Dashboard Styles

All CSS styles for the Debugging Dashboard components.

---

## Error Dashboard Styles

```css
/* src/components/dashboard/ErrorDashboard.css */
.error-dashboard {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.error-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.error-filters button {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;
}

.error-filters button:hover {
  background: #e9ecef;
  color: #333;
}

.error-filters button.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.error-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
}

.error-item {
  background: #f8f9fa;
  border-left: 4px solid #e74c3c;
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.error-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-item-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.error-type {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.error-type.react_error {
  background: #e74c3c;
  color: white;
}

.error-type.unhandled_error {
  background: #e67e22;
  color: white;
}

.error-type.unhandled_rejection {
  background: #f39c12;
  color: white;
}

.error-time {
  margin-left: auto;
  color: #999;
  font-size: 0.9rem;
}

.error-message {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.error-url {
  font-size: 0.85rem;
  color: #666;
  font-family: 'Monaco', monospace;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-header button:hover {
  background: #f8f9fa;
  color: #333;
}

.modal-body {
  padding: 2rem;
}

.modal-body section {
  margin-bottom: 2rem;
}

.modal-body section:last-child {
  margin-bottom: 0;
}

.modal-body h4 {
  margin: 0 0 1rem 0;
  color: #667eea;
  font-size: 1.1rem;
}

.modal-body pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
  font-family: 'Monaco', 'Courier New', monospace;
}

.breadcrumbs-list {
  max-height: 300px;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
}

.breadcrumb-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 4px;
  font-size: 0.85rem;
}

.breadcrumb-category {
  padding: 0.25rem 0.5rem;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.breadcrumb-message {
  flex: 1;
  color: #333;
}

.breadcrumb-time {
  color: #999;
  font-size: 0.75rem;
}
```

---

## Performance Dashboard Styles

```css
/* src/components/dashboard/PerformanceDashboard.css */
.performance-dashboard {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.performance-dashboard h2 {
  margin-bottom: 2rem;
  color: #333;
}

.performance-dashboard h3 {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 1.3rem;
}

.web-vitals {
  margin-bottom: 3rem;
}

.vitals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.vital-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.vital-card.good {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.vital-card.needs-improvement {
  background: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
}

.vital-card.poor {
  background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
}

.vital-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.vital-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.vital-description {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.vital-rating {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metrics-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.metric-name {
  flex: 1;
  font-weight: 500;
  color: #333;
}

.metric-value {
  font-weight: 600;
  color: #667eea;
  font-family: 'Monaco', monospace;
}

.metric-rating {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.metric-rating.good {
  background: #d4edda;
  color: #155724;
}

.metric-rating.needs-improvement {
  background: #fff3cd;
  color: #856404;
}

.metric-rating.poor {
  background: #f8d7da;
  color: #721c24;
}
```

---

## Breadcrumb Dashboard Styles

```css
/* src/components/dashboard/BreadcrumbDashboard.css */
.breadcrumb-dashboard {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.breadcrumb-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.breadcrumb-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.breadcrumb-filters button {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;
}

.breadcrumb-filters button:hover {
  background: #e9ecef;
  color: #333;
}

.breadcrumb-filters button.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.breadcrumb-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.breadcrumb-timeline::-webkit-scrollbar {
  width: 8px;
}

.breadcrumb-timeline::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.breadcrumb-timeline::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.breadcrumb-timeline::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.breadcrumb-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  transition: all 0.2s;
}

.breadcrumb-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.breadcrumb-item.error {
  border-left-color: #e74c3c;
  background: #fff5f5;
}

.breadcrumb-item.success {
  border-left-color: #2ecc71;
}

.breadcrumb-index {
  min-width: 32px;
  height: 32px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.85rem;
}

.breadcrumb-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.breadcrumb-content {
  flex: 1;
  min-width: 0;
}

.breadcrumb-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.breadcrumb-category {
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.breadcrumb-type {
  padding: 0.25rem 0.75rem;
  background: #e9ecef;
  color: #666;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.breadcrumb-time {
  margin-left: auto;
  color: #999;
  font-size: 0.85rem;
  font-family: 'Monaco', monospace;
}

.breadcrumb-message {
  color: #333;
  font-weight: 500;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.breadcrumb-data {
  margin-top: 0.5rem;
}

.breadcrumb-data summary {
  cursor: pointer;
  color: #667eea;
  font-size: 0.85rem;
  font-weight: 600;
  user-select: none;
  padding: 0.25rem 0;
}

.breadcrumb-data summary:hover {
  color: #5568d3;
}

.breadcrumb-data pre {
  margin-top: 0.5rem;
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  overflow-x: auto;
  font-family: 'Monaco', monospace;
}
```

---

## Network Dashboard Styles

```css
/* src/components/dashboard/NetworkDashboard.css */
.network-dashboard {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.network-dashboard h2 {
  margin-bottom: 2rem;
  color: #333;
}

.network-dashboard h3 {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 1.3rem;
}

.network-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.network-stats .stat-card.error .stat-value {
  color: #e74c3c;
}

.network-requests {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.network-request-group {
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  border-left: 4px solid #2ecc71;
  transition: all 0.2s;
}

.network-request-group:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.network-request-group.error {
  border-left-color: #e74c3c;
}

.request-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
}

.request-summary:hover {
  background: #f8f9fa;
}

.status-indicator {
  font-size: 1.2rem;
  line-height: 1;
}

.request-method {
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  min-width: 50px;
  text-align: center;
}

.request-url {
  flex: 1;
  font-family: 'Monaco', monospace;
  font-size: 0.85rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.request-duration {
  padding: 0.25rem 0.75rem;
  background: #f8f9fa;
  color: #666;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Monaco', monospace;
}

.request-count {
  padding: 0.25rem 0.75rem;
  background: #e9ecef;
  color: #666;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.expand-icon {
  color: #999;
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.request-summary[aria-expanded="true"] .expand-icon {
  transform: rotate(90deg);
}

.request-details {
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
  padding: 0.5rem 1rem 1rem 1rem;
}

.request-event {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.event-time {
  color: #999;
  font-family: 'Monaco', monospace;
  font-size: 0.75rem;
}

.event-type {
  padding: 0.25rem 0.75rem;
  background: #e9ecef;
  color: #666;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.event-status {
  padding: 0.25rem 0.75rem;
  background: #2ecc71;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.event-duration {
  margin-left: auto;
  color: #667eea;
  font-weight: 600;
  font-family: 'Monaco', monospace;
}
```

---

## Responsive Design

```css
/* Responsive styles for all dashboards */
@media (max-width: 768px) {
  .app-header {
    padding: 1.5rem 1rem;
  }

  .app-header h1 {
    font-size: 1.8rem;
  }

  .app-main {
    padding: 1rem;
  }

  .tab-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-nav button {
    flex: 0 0 auto;
    min-width: 120px;
  }

  .error-stats,
  .network-stats,
  .breadcrumb-stats {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .vitals-grid {
    grid-template-columns: 1fr;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .request-summary {
    flex-wrap: wrap;
    font-size: 0.85rem;
  }

  .request-url {
    width: 100%;
    order: 10;
  }
}
```

---

**All styles are now complete and ready to use!** 🎨

