import type { Meta, StoryObj } from '@storybook/angular';
import { ProductDetailsPageComponent } from '../../pages/product-details-page/product-details-page.component';
import { provideStore } from '@ngrx/store';
import { cartReducer } from '../../state/cart/cart.reducer';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Product } from '../../../mocks/data';

const meta: Meta<ProductDetailsPageComponent> = {
  title: 'Shop/ProductDetails',
  component: ProductDetailsPageComponent,
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
type Story = StoryObj<ProductDetailsPageComponent>;

const mockProduct: Product = {
  id: 1,
  name: 'Stylo Bleu Premium',
  price: 2.5,
  created_at: '2025-01-10T10:00:00Z',
  owner_id: 10,
  ratings: [
    { user_id: 2, value: 4 },
    { user_id: 3, value: 5 },
    { user_id: 4, value: 4 },
  ],
};

export const Default: Story = {
  args: {},
};


