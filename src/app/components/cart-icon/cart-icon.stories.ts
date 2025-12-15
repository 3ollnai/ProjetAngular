import type { Meta, StoryObj } from '@storybook/angular';
import { CartIconComponent } from './cart-icon.component';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../state/cart/cart.reducer';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

const meta: Meta<CartIconComponent> = {
  title: 'Shop/CartIcon',
  component: CartIconComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideStore({ cart: cartReducer }),
        importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot([])),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<CartIconComponent>;

export const Empty: Story = {};

export const WithItems: Story = {
  decorators: [
    applicationConfig({
      providers: [
        provideStore({
          cart: cartReducer,
        }),
        importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot([])),
      ],
    }),
  ],
};


