import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';

const meta: Meta<ProductCardComponent> = {
  component: ProductCardComponent,
  title: 'Shop/ProductCard',
  tags: ['autodocs'],
  argTypes: {
    productId: { control: 'number' },
    name: { control: 'text' },
    price: { control: 'number' },
    image: { control: 'text' },
    avgRating: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {
  args: {
    productId: 1,
    name: 'Stylo Bleu Premium',
    price: 2.5,
    image: 'https://images.unsplash.com/photo-1583484963886-cce2f1c1b6b0?w=400&h=400&fit=crop',
    avgRating: 4.0,
  },
};

export const WithoutRating: Story = {
  args: {
    productId: 2,
    name: 'Cahier A5',
    price: 3.9,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    avgRating: null,
  },
};

export const HighRating: Story = {
  args: {
    productId: 12,
    name: 'Trousse Bleue',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1628191010213-4cbb33e8e0e1?w=400&h=400&fit=crop',
    avgRating: 5.0,
  },
};

