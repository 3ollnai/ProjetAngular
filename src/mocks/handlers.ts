/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { products } from './data';
import { paginate, avgRating } from './utils';
import { mockOrders, mockTrackingHistory } from './orders';

const API = '/api';

export const handlers = [
  // Auth: POST /api/auth/token/ -> { access, refresh }
  http.post(`${API}/auth/token/`, async () => {
    // Ici on accepte tout payload pour valider l'intégration front.
    return HttpResponse.json(
      {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      },
      { status: 200 },
    );
  }),

  // Auth refresh: POST /api/auth/token/refresh/ -> { access }
  http.post(`${API}/auth/token/refresh/`, async () => {
    return HttpResponse.json({ access: 'mock-access-token-refreshed' }, { status: 200 });
  }),

  // Products list: GET /api/products/?page=&page_size=&min_rating=&ordering=
  http.get(`${API}/products/`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const page_size = Number(url.searchParams.get('page_size') || '10');
    const min_rating = Number(url.searchParams.get('min_rating') || '0');
    const ordering = url.searchParams.get('ordering') || '-created_at';

    const rows = products
      .map((p) => ({ ...p, _avg: avgRating(p.ratings) }))
      .filter((p) => p._avg >= min_rating);

    const sign = ordering.startsWith('-') ? -1 : 1;
    const key = ordering.replace(/^-/, '');
    rows.sort((a: any, b: any) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * sign);

    const { count, results } = paginate(rows, page, page_size);
    return HttpResponse.json({ count, next: null, previous: null, results }, { status: 200 });
  }),

  // Product rating: GET /api/products/:id/rating/
  http.get(`${API}/products/:id/rating/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);
    if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(
      { product_id: id, avg_rating: avgRating(p.ratings), count: p.ratings.length },
      { status: 200 },
    );
  }),

  // Product details: GET /api/products/:id/
  http.get(`${API}/products/:id/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);
    if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(p, { status: 200 });
  }),

  // Cart validation: POST /api/cart/validate/
  http.post(`${API}/cart/validate/`, async ({ request }) => {
    const body = (await request.json()) as { items?: Array<{ product_id: number; quantity: number }> };
    const total = body?.items?.reduce((sum: number, item: any) => {
      const product = products.find((p) => p.id === item.product_id);
      return sum + (product?.price || 0) * (item.quantity || 0);
    }, 0) || 0;

    return HttpResponse.json(
      {
        subtotal: total,
        shipping: 0,
        total: total,
        valid: true,
      },
      { status: 200 }
    );
  }),

  // Order: POST /api/order/
  http.post(`${API}/order/`, async ({ request }) => {
    const body = (await request.json()) as any;
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const trackingNumber = `TRK${Math.floor(Math.random() * 1000000)}`;
    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return HttpResponse.json(
      {
        orderNumber,
        status: 'confirmed',
        message: 'Order placed successfully',
        trackingNumber,
        carrier: 'Colissimo',
        estimatedDelivery,
      },
      { status: 201 }
    );
  }),

  // Get order: GET /api/orders/:orderNumber/
  http.get(`${API}/orders/:orderNumber/`, async ({ params }) => {
    const orderNumber = params['orderNumber'] as string;
    const order = mockOrders.find((o) => o.orderNumber === orderNumber);
    if (!order) {
      return HttpResponse.json({ detail: 'Order not found.' }, { status: 404 });
    }
    return HttpResponse.json(order, { status: 200 });
  }),

  // Get order tracking: GET /api/orders/:orderNumber/tracking/
  http.get(`${API}/orders/:orderNumber/tracking/`, async ({ params }) => {
    const orderNumber = params['orderNumber'] as string;
    const order = mockOrders.find((o) => o.orderNumber === orderNumber);
    if (!order) {
      return HttpResponse.json({ detail: 'Order not found.' }, { status: 404 });
    }

    const trackingHistory = mockTrackingHistory[orderNumber] || [];
    return HttpResponse.json(
      {
        orderNumber,
        status: order.status,
        trackingNumber: order.trackingNumber,
        carrier: order.carrier,
        estimatedDelivery: order.estimatedDelivery,
        trackingHistory,
      },
      { status: 200 }
    );
  }),

  // Get user orders: GET /api/orders/
  http.get(`${API}/orders/`, async () => {
    return HttpResponse.json(mockOrders, { status: 200 });
  }),
];
