// Example Storybook Stories for Button Component
// Place this in your Storybook stories directory

import './button.css';
import '../tokens/tokens.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    label: {
      control: 'text',
      description: 'Button text content',
      table: {
        type: { summary: 'string' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Primary UI component for user actions. Use buttons for actions like save, submit, or triggering modals.',
      },
    },
  },
};

// Template function for creating button HTML
const Template = ({ variant = 'primary', size = 'medium', disabled, loading, label, fullWidth }) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'btn--loading',
    fullWidth && 'btn--full-width',
  ].filter(Boolean).join(' ');

  return `
    <button
      class="${classes}"
      ${disabled ? 'disabled' : ''}
      ${loading ? 'aria-busy="true"' : ''}
    >
      ${loading ? '<span class="btn__spinner"></span>' : ''}
      ${label}
    </button>
  `;
};

// Default/Primary story
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Primary Button',
};
Primary.parameters = {
  docs: {
    description: {
      story: 'Primary button for main actions. Use sparingly - typically one per page.',
    },
  },
};

// Secondary variant
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'medium',
  label: 'Secondary Button',
};
Secondary.parameters = {
  docs: {
    description: {
      story: 'Secondary button for less important actions.',
    },
  },
};

// Outline variant
export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  size: 'medium',
  label: 'Outline Button',
};

// Ghost variant
export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  size: 'medium',
  label: 'Ghost Button',
};

// Danger variant
export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  size: 'medium',
  label: 'Delete',
};
Danger.parameters = {
  docs: {
    description: {
      story: 'Danger button for destructive actions. Always confirm before proceeding.',
    },
  },
};

// All variants showcase
export const AllVariants = () => `
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <button class="btn btn--primary btn--medium">Primary</button>
    <button class="btn btn--secondary btn--medium">Secondary</button>
    <button class="btn btn--outline btn--medium">Outline</button>
    <button class="btn btn--ghost btn--medium">Ghost</button>
    <button class="btn btn--danger btn--medium">Danger</button>
  </div>
`;
AllVariants.parameters = {
  docs: {
    description: {
      story: 'All available button variants. Choose based on importance and context.',
    },
  },
};

// All sizes showcase
export const AllSizes = () => `
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <button class="btn btn--primary btn--small">Small</button>
    <button class="btn btn--primary btn--medium">Medium</button>
    <button class="btn btn--primary btn--large">Large</button>
  </div>
`;
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Button sizes. Use medium (default) for most cases.',
    },
  },
};

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Disabled Button',
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'Disabled button prevents interaction. Use when an action is temporarily unavailable.',
    },
  },
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Loading...',
  loading: true,
};
Loading.parameters = {
  docs: {
    description: {
      story: 'Loading state shows a spinner. Use for async operations to prevent double-submission.',
    },
  },
};

// Full width
export const FullWidth = Template.bind({});
FullWidth.args = {
  variant: 'primary',
  size: 'medium',
  label: 'Full Width Button',
  fullWidth: true,
};
FullWidth.parameters = {
  docs: {
    description: {
      story: 'Full width button spans the container. Common in mobile layouts and forms.',
    },
  },
};

// Button group example
export const ButtonGroup = () => `
  <div style="display: flex; gap: 12px;">
    <button class="btn btn--ghost btn--medium">Cancel</button>
    <button class="btn btn--primary btn--medium">Save Changes</button>
  </div>
`;
ButtonGroup.parameters = {
  docs: {
    description: {
      story: 'Common button group pattern. Place primary action on the right.',
    },
  },
};

// With icons (example)
export const WithIcon = () => `
  <button class="btn btn--primary btn--medium">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
      <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z"/>
    </svg>
    Favorite
  </button>
`;
WithIcon.parameters = {
  docs: {
    description: {
      story: 'Button with icon. Place icon before text for better readability.',
    },
  },
};

