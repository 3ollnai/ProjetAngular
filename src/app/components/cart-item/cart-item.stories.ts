import type { Meta, StoryObj } from '@storybook/angular';
import { CartItemComponent } from './cart-item.component';
import { CartItem } from '../../state/cart/cart.actions';
import { Product } from '../../../mocks/data';

const meta: Meta<CartItemComponent> = {
  title: 'Shop/CartItem',
  component: CartItemComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CartItemComponent>;

const mockProduct: Product = {
  id: 1,
  name: 'Stylo Bleu',
  price: 2.5,
  created_at: '2025-01-10T10:00:00Z',
  owner_id: 10,
  ratings: [{ user_id: 2, value: 4 }],
};

const mockCartItem: CartItem = {
  product: mockProduct,
  quantity: 2,
};

export const Default: Story = {
  args: {
    item: mockCartItem,
  },
};

export const SingleItem: Story = {
  args: {
    item: {
      ...mockCartItem,
      quantity: 1,
    },
  },
};

export const MultipleItems: Story = {
  args: {
    item: {
      ...mockCartItem,
      quantity: 5,
    },
  },
};


