import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from '@ui/Card';

export default {
  title: 'Example/Card',
  component: Card,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const isDark = Template.bind({});
