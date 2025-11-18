import type { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from './products-list.component';

const meta: Meta<ProductsListComponent> = {
  component: ProductsListComponent,
  title: 'Shop/Products List',
  args: { products: [{ id: 1, name: 'A', price: 1 }, { id: 2, name: 'B', price: 2 }] },
};

export default meta;
export const Default: StoryObj<ProductsListComponent> = {};
