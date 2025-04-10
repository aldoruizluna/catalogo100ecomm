// Simple component loader
const loadComponents = async () => {
  // Get all component placeholders
  const components = document.querySelectorAll('[data-component]');
  
  // Load each component
  for (const component of components) {
    const name = component.dataset.component;
    try {
      const response = await fetch(`components/${name}.html`);
      if (response.ok) {
        component.innerHTML = await response.text();
      } else {
        console.error(`Failed to load component: ${name}`);
      }
    } catch (error) {
      console.error(`Error loading component ${name}:`, error);
    }
  }
};

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
