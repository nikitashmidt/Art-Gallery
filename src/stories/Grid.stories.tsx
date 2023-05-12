import { ComponentStory, ComponentMeta } from '@storybook/react';

import Grid from '@ui/Grid';

export default {
  title: 'Example/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const isDark = Template.bind({});
