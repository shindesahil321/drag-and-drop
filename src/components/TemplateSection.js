import React from 'react';
import './TemplateSection.css'; // Ensure this path is correct

const templates = [
  { id: 1, src: '/images/template1.png', alt: 'Template 1' },
  { id: 2, src: '/images/template2.png', alt: 'Template 2' },
  { id: 3, src: '/images/template3.png', alt: 'Template 3' }
];

const TemplateSection = () => {
  return (
    <div className="template-section">
      <h3>Templates</h3>
      <div className="template-grid">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <img src={template.src} alt={template.alt} className="template-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSection;
