/**
 * Checkout API client for MUNET ticket purchases
 * 
 * Integrates with AWS API Gateway + Lambda backend for Stripe checkout
 */

// Types
export interface TicketItem {
  type: string;
  quantity: number;
  price: number; // Price in MXN centavos
}

export interface CreateCheckoutSessionRequest {
  tickets: TicketItem[];
  date: string; // ISO date string (YYYY-MM-DD)
  email: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface CheckoutError {
  error: string;
}

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Creates a Stripe Checkout session for ticket purchase
 * 
 * @param orderData - Order details including tickets, date, and email
 * @returns Checkout session with redirect URL
 * @throws Error if the API request fails
 */
export async function createCheckoutSession(
  orderData: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> {
  // Validate input
  if (!orderData.tickets || orderData.tickets.length === 0) {
    throw new Error('No tickets selected');
  }

  const paidTickets = orderData.tickets.filter(t => t.quantity > 0 && t.price > 0);
  if (paidTickets.length === 0) {
    throw new Error('No paid tickets selected');
  }

  if (!orderData.date) {
    throw new Error('Visit date is required');
  }

  if (!orderData.email || !orderData.email.includes('@')) {
    throw new Error('Valid email is required');
  }

  // Make API request
  const response = await fetch(`${API_URL}/api/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data as CheckoutError;
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  return data as CreateCheckoutSessionResponse;
}

/**
 * Redirects user to Stripe Checkout
 * 
 * @param orderData - Order details
 */
export async function redirectToCheckout(
  orderData: CreateCheckoutSessionRequest
): Promise<void> {
  const { url } = await createCheckoutSession(orderData);
  window.location.href = url;
}

// Ticket type configuration (must match Lambda config)
export const TICKET_TYPES = {
  general: { 
    name: 'Entrada General', 
    price: 12000, 
    description: 'Adulto' 
  },
  estudiante: { 
    name: 'Estudiante', 
    price: 6000, 
    description: 'Con credencial vigente' 
  },
  maestro: { 
    name: 'Maestro', 
    price: 6000, 
    description: 'Con credencial vigente' 
  },
  inapam: { 
    name: 'INAPAM', 
    price: 6000, 
    description: 'Adulto mayor' 
  },
  nino: { 
    name: 'Niño (3-12 años)', 
    price: 6000, 
    description: '3 a 12 años' 
  },
  nino_gratis: { 
    name: 'Niño (<3 años)', 
    price: 0, 
    description: 'Menores de 3 años' 
  },
} as const;

export type TicketType = keyof typeof TICKET_TYPES;

/**
 * Formats price from centavos to MXN display string
 */
export function formatPrice(centavos: number): string {
  if (centavos === 0) return 'Gratis';
  return `$${(centavos / 100).toFixed(0)} MXN`;
}

/**
 * Calculates total price for an order
 */
export function calculateTotal(tickets: TicketItem[]): number {
  return tickets.reduce((sum, ticket) => {
    return sum + (ticket.price * ticket.quantity);
  }, 0);
}

/**
 * Validates that order has at least one paid ticket
 */
export function hasValidPaidTickets(tickets: TicketItem[]): boolean {
  return tickets.some(t => t.quantity > 0 && t.price > 0);
}
