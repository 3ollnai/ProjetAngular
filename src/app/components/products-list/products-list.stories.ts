import type { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from './products-list.component';
import { Product } from '../../../mocks/data';

const meta: Meta<ProductsListComponent> = {
  component: ProductsListComponent,
  title: 'Shop/ProductsList',
  tags: ['autodocs'],
  argTypes: {
    products: { control: 'object' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ProductsListComponent>;

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 2, value: 4 }],
  },
  {
    id: 2,
    name: 'Cahier A5',
    price: 3.9,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user_id: 3, value: 5 }],
  },
  {
    id: 3,
    name: 'Classeur Rouge',
    price: 4.5,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user_id: 4, value: 3 }],
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    products: [],
    loading: false,
  },
};

