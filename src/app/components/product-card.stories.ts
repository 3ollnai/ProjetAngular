import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';

const meta: Meta<ProductCardComponent> = {
  component: ProductCardComponent,
  title: 'Shop/Product Card',
  args: { id: 1, name: 'Stylo Bleu', price: 2.5, created_at: '2025-01-10', avgRating: 4 },
};

export default meta;

export const Default: StoryObj<ProductCardComponent> = {};
