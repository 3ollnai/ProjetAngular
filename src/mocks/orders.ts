import { products } from './data';
import * as OrdersActions from '../app/state/orders/orders.actions';

// Generate mock orders with real product data
export const mockOrders: OrdersActions.Order[] = [
  {
    id: 'ORD-1700000000000-123',
    orderNumber: 'ORD-1700000000000-123',
    status: 'delivered',
    items: [
      {
        product_id: 1,
        product_name: products[0].name,
        quantity: 2,
        price: products[0].price,
      },
      {
        product_id: 2,
        product_name: products[1].name,
        quantity: 1,
        price: products[1].price,
      },
    ],
    address: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33123456789',
      street: '15 Rue de la Paix',
      city: 'Paris',
      zipCode: '75001',
      country: 'France',
    },
    total: 8.9,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: 'TRK123456789',
    carrier: 'Colissimo',
  },
  {
    id: 'ORD-1700100000000-456',
    orderNumber: 'ORD-1700100000000-456',
    status: 'in_transit',
    items: [
      {
        product_id: 12,
        product_name: products[11].name,
        quantity: 1,
        price: products[11].price,
      },
      {
        product_id: 18,
        product_name: products[17].name,
        quantity: 1,
        price: products[17].price,
      },
    ],
    address: {
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@example.com',
      phone: '+33987654321',
      street: '42 Avenue des Champs',
      city: 'Lyon',
      zipCode: '69001',
      country: 'France',
    },
    total: 16.0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: 'TRK987654321',
    carrier: 'Chronopost',
  },
  {
    id: 'ORD-1700200000000-789',
    orderNumber: 'ORD-1700200000000-789',
    status: 'shipped',
    items: [
      {
        product_id: 5,
        product_name: products[4].name,
        quantity: 3,
        price: products[4].price,
      },
      {
        product_id: 6,
        product_name: products[5].name,
        quantity: 2,
        price: products[5].price,
      },
      {
        product_id: 7,
        product_name: products[6].name,
        quantity: 1,
        price: products[6].price,
      },
    ],
    address: {
      firstName: 'Pierre',
      lastName: 'Bernard',
      email: 'pierre.bernard@example.com',
      phone: '+33555666777',
      street: '8 Rue du Commerce',
      city: 'Marseille',
      zipCode: '13001',
      country: 'France',
    },
    total: 6.8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: 'TRK555666777',
    carrier: 'DHL',
  },
];

export const mockTrackingHistory: Record<string, OrdersActions.OrderTracking['trackingHistory']> = {
  'ORD-1700000000000-123': [
    {
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
      location: 'Entrepôt Paris',
      description: 'Commande confirmée et préparée',
    },
    {
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'processing',
      location: 'Entrepôt Paris',
      description: 'Colis en cours de préparation',
    },
    {
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'shipped',
      location: 'Centre de tri Paris',
      description: 'Colis expédié',
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in_transit',
      location: 'En transit',
      description: 'Colis en route vers le centre de distribution',
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'delivered',
      location: 'Paris 75001',
      description: 'Colis livré avec succès',
    },
  ],
  'ORD-1700100000000-456': [
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
      location: 'Entrepôt Lyon',
      description: 'Commande confirmée et préparée',
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'processing',
      location: 'Entrepôt Lyon',
      description: 'Colis en cours de préparation',
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'shipped',
      location: 'Centre de tri Lyon',
      description: 'Colis expédié',
    },
    {
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      status: 'in_transit',
      location: 'En transit',
      description: 'Colis en route vers le centre de distribution',
    },
  ],
  'ORD-1700200000000-789': [
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
      location: 'Entrepôt Marseille',
      description: 'Commande confirmée et préparée',
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'processing',
      location: 'Entrepôt Marseille',
      description: 'Colis en cours de préparation',
    },
    {
      date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'shipped',
      location: 'Centre de tri Marseille',
      description: 'Colis expédié',
    },
  ],
};

