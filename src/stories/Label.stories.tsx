import { ComponentStory, ComponentMeta } from '@storybook/react';
import Label from '../ui/Label';

export default {
  title: 'Example/Label',
  component: Label,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const isDark = Template.bind({});

isDark.args = {
  children: '',
};
