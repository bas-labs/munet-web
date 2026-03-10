/**
 * OrderLookupPage - /mis-boletos
 *
 * Allows customers to look up their orders by email and confirmation code
 * Displays order details and QR code for museum entry
 */

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';
import { PageLayout } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QRTicket } from '@/components/tickets/QRTicket';
import { TextClipReveal } from '@/components/ui/gsap-primitives';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Validation schema
const lookupSchema = z.object({
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  orderId: z.string().min(1, 'Por favor ingresa tu número de confirmación'),
});

type LookupFormData = z.infer<typeof lookupSchema>;

// Mock order data for demonstration - will be replaced with API call
interface OrderTicket {
  type: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  visitDate: string;
  tickets: OrderTicket[];
  totalAmount: number;
  status: string;
  qrCodeDataUrl: string;
  createdAt: string;
}

export function OrderLookupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const qrTicketRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LookupFormData>({
    resolver: zodResolver(lookupSchema),
  });

  // Form card scale-in on mount
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!formCardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(formCardRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Success state animations - fire when order is found
  useEffect(() => {
    if (!order) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // QR ticket scales in from left
      if (qrTicketRef.current) {
        gsap.from(qrTicketRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      }

      // Order details slide from right
      if (detailsRef.current) {
        gsap.from(detailsRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.5,
          delay: 0.15,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [order]);

  // Error state animation - shake on error
  useEffect(() => {
    if (!error) return;
    if (prefersReducedMotion()) return;
    if (!errorRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(errorRef.current, {
        x: -10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [error]);

  const onSubmit = async (data: LookupFormData) => {
    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock order data - replace with actual API response
      const mockOrder: Order = {
        orderId: data.orderId.toUpperCase(),
        customerName: 'Visitante MUNET',
        customerEmail: data.email,
        visitDate: 'Sábado, 15 de Marzo 2026',
        tickets: [
          { type: 'General', quantity: 2, unitPrice: 120, subtotal: 240 },
          { type: 'Niño (3-12)', quantity: 1, unitPrice: 60, subtotal: 60 },
        ],
        totalAmount: 300,
        status: 'confirmed',
        qrCodeDataUrl:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        createdAt: '2026-03-10T12:00:00Z',
      };

      // For demo: Check if orderId starts with "MUN-" to simulate valid order
      if (data.orderId.toUpperCase().startsWith('MUN-')) {
        setOrder(mockOrder);
      } else {
        setError(
          'No encontramos una orden con esos datos. Verifica tu correo electrónico y número de confirmación.'
        );
      }
    } catch {
      setError(
        'Ocurrió un error al buscar tu orden. Por favor intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download functionality
    alert('Descarga de PDF próximamente disponible');
  };

  const totalTickets = order?.tickets.reduce((sum, t) => sum + t.quantity, 0) || 0;

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <TextClipReveal>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">
                Mis Boletos
              </h1>
            </TextClipReveal>
            <p className="text-lg text-muted-foreground">
              Ingresa tu correo electrónico y número de confirmación para ver
              tus boletos
            </p>
          </div>
        </Container>
      </section>

      {/* Lookup Form */}
      <section ref={containerRef} className="py-12 md:py-16">
        <Container className="max-w-4xl">
          {!order ? (
            <Card ref={formCardRef} className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Buscar mi orden</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@correo.com"
                      {...register('email')}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="orderId"
                      className="text-sm font-medium text-foreground"
                    >
                      Número de confirmación
                    </label>
                    <Input
                      id="orderId"
                      type="text"
                      placeholder="MUN-XXXXXX-XXXX"
                      {...register('orderId')}
                      className={errors.orderId ? 'border-destructive' : ''}
                    />
                    {errors.orderId && (
                      <p className="text-sm text-destructive">
                        {errors.orderId.message}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div
                      ref={errorRef}
                      className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg"
                    >
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Buscando...
                      </span>
                    ) : (
                      'Buscar mis boletos'
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-muted-foreground">
                    ¿No encuentras tu número de confirmación?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Revisa el correo electrónico que recibiste al momento de tu
                    compra.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Order Found - Display Ticket */
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* QR Ticket */}
              <div ref={qrTicketRef}>
                <QRTicket
                  qrCodeDataUrl={order.qrCodeDataUrl}
                  orderId={order.orderId}
                  visitDate={order.visitDate}
                  ticketCount={totalTickets}
                  tickets={order.tickets.map((t) => ({
                    type: t.type,
                    quantity: t.quantity,
                  }))}
                />
              </div>

              {/* Order Details */}
              <div ref={detailsRef} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Orden Confirmada
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Comprador
                      </p>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerEmail}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Desglose de boletos
                      </p>
                      <div className="space-y-2">
                        {order.tickets.map((ticket, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {ticket.type} x{ticket.quantity}
                            </span>
                            <span className="font-medium">
                              ${ticket.subtotal.toFixed(2)} MXN
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total</span>
                          <span className="text-accent">
                            ${order.totalAmount.toFixed(2)} MXN
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleDownloadPDF}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Descargar PDF
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setOrder(null)}
                  >
                    Buscar otra orden
                  </Button>
                </div>

                {/* Important Info */}
                <Card className="bg-primary/5 border-0">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Información importante
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Presenta tu código QR en la entrada</li>
                      <li>• Llega 15 minutos antes de tu hora de visita</li>
                      <li>• Los boletos son válidos solo para la fecha indicada</li>
                      <li>• Última entrada: 17:00 hrs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </section>
    </PageLayout>
  );
}

export default OrderLookupPage;
