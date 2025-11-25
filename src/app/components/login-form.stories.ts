import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
  title: 'Shop/Login Form',
};

export default meta;

export const Default: StoryObj<LoginFormComponent> = {
  render: (args) => ({ 
    props: { 
      ...args, 
      submitForm: (data: any) => console.log('Login submitted:', data) 
    } 
  }),
};
