import type { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { LoginFormComponent } from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
  title: 'Shop/LoginForm',
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    error: { control: 'text' },
    submit: { action: 'submit' },
  },
};

export default meta;
type Story = StoryObj<LoginFormComponent>;

export const Default: Story = {
  args: {
    loading: false,
    error: null,
    submit: action('submit'),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
    submit: action('submit'),
  },
};

export const WithError: Story = {
  args: {
    loading: false,
    error: 'Invalid credentials',
    submit: action('submit'),
  },
};

