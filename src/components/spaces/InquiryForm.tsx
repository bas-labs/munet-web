/**
 * InquiryForm Component
 * Venue rental inquiry form with React Hook Form + Zod validation
 * Based on PRD Section 5.9 - Renta de Espacios
 */

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input, Label, FormField, FormError } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { SPACES } from '@/lib/data/spaces'
import { EVENT_TYPES } from '@/lib/types/spaces'
import { submitInquiry } from '@/lib/api/inquiries'
import type { InquiryFormData } from '@/lib/types/spaces'

// Zod validation schema
const inquirySchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  company: z.string().max(100, 'El nombre de empresa es demasiado largo').optional(),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono es demasiado largo')
    .regex(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números'),
  spaceId: z.string().min(1, 'Selecciona un espacio'),
  eventDate: z.string().min(1, 'Selecciona una fecha tentativa'),
  attendees: z
    .number({ message: 'Ingresa un número válido' })
    .min(1, 'Debe haber al menos 1 asistente')
    .max(2000, 'Capacidad máxima excedida'),
  eventType: z.enum(['corporativo', 'social', 'cultural', 'otro'], {
    message: 'Selecciona un tipo de evento',
  }),
  message: z.string().max(1000, 'El mensaje es demasiado largo').optional(),
})

type InquiryFormValues = z.infer<typeof inquirySchema>

interface InquiryFormProps {
  isOpen: boolean
  onClose: () => void
  preselectedSpaceId?: string
}

export function InquiryForm({
  isOpen,
  onClose,
  preselectedSpaceId,
}: InquiryFormProps) {
  const [submitStatus, setSubmitStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = React.useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      spaceId: preselectedSpaceId || '',
      eventDate: '',
      attendees: undefined,
      eventType: undefined,
      message: '',
    },
  })

  // Update spaceId when preselectedSpaceId changes
  React.useEffect(() => {
    if (preselectedSpaceId) {
      setValue('spaceId', preselectedSpaceId)
    }
  }, [preselectedSpaceId, setValue])

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const onSubmit = async (data: InquiryFormValues) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      await submitInquiry(data as InquiryFormData)
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Error al enviar la solicitud. Por favor intenta de nuevo.'
      )
    }
  }

  const handleClose = () => {
    if (submitStatus === 'success') {
      reset()
      setSubmitStatus('idle')
    }
    onClose()
  }

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
            <h2 className="font-display text-xl font-bold">
              Solicitar Cotización
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6">
            {/* Success State */}
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  ¡Gracias por tu interés!
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Nos pondremos en contacto contigo pronto.
                </p>
                <Button variant="primary" onClick={handleClose}>
                  Cerrar
                </Button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <FormField>
                  <Label htmlFor="name">
                    Nombre completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    {...register('name')}
                    className={cn(errors.name && 'border-destructive')}
                  />
                  {errors.name && (
                    <FormError>{errors.name.message}</FormError>
                  )}
                </FormField>

                {/* Company */}
                <FormField>
                  <Label htmlFor="company">Empresa / Organización</Label>
                  <Input
                    id="company"
                    placeholder="Nombre de tu empresa (opcional)"
                    {...register('company')}
                  />
                </FormField>

                {/* Email & Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField>
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      {...register('email')}
                      className={cn(errors.email && 'border-destructive')}
                    />
                    {errors.email && (
                      <FormError>{errors.email.message}</FormError>
                    )}
                  </FormField>

                  <FormField>
                    <Label htmlFor="phone">
                      Teléfono <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="55 1234 5678"
                      {...register('phone')}
                      className={cn(errors.phone && 'border-destructive')}
                    />
                    {errors.phone && (
                      <FormError>{errors.phone.message}</FormError>
                    )}
                  </FormField>
                </div>

                {/* Space Selection */}
                <FormField>
                  <Label htmlFor="spaceId">
                    Espacio de interés <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="spaceId"
                    {...register('spaceId')}
                    className={cn(
                      'flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20',
                      errors.spaceId && 'border-destructive'
                    )}
                  >
                    <option value="">Selecciona un espacio</option>
                    {SPACES.map((space) => (
                      <option key={space.id} value={space.id}>
                        {space.name} ({space.capacity})
                      </option>
                    ))}
                  </select>
                  {errors.spaceId && (
                    <FormError>{errors.spaceId.message}</FormError>
                  )}
                </FormField>

                {/* Date & Attendees */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField>
                    <Label htmlFor="eventDate">
                      Fecha tentativa <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="eventDate"
                      type="date"
                      min={getMinDate()}
                      {...register('eventDate')}
                      className={cn(errors.eventDate && 'border-destructive')}
                    />
                    {errors.eventDate && (
                      <FormError>{errors.eventDate.message}</FormError>
                    )}
                  </FormField>

                  <FormField>
                    <Label htmlFor="attendees">
                      Número de asistentes{' '}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="attendees"
                      type="number"
                      placeholder="100"
                      min={1}
                      {...register('attendees', { valueAsNumber: true })}
                      className={cn(errors.attendees && 'border-destructive')}
                    />
                    {errors.attendees && (
                      <FormError>{errors.attendees.message}</FormError>
                    )}
                  </FormField>
                </div>

                {/* Event Type */}
                <FormField>
                  <Label htmlFor="eventType">
                    Tipo de evento <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="eventType"
                    {...register('eventType')}
                    className={cn(
                      'flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20',
                      errors.eventType && 'border-destructive'
                    )}
                  >
                    <option value="">Selecciona el tipo de evento</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <FormError>{errors.eventType.message}</FormError>
                  )}
                </FormField>

                {/* Message */}
                <FormField>
                  <Label htmlFor="message">Mensaje adicional</Label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Cuéntanos más sobre tu evento..."
                    {...register('message')}
                    className="flex w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
                  />
                </FormField>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
