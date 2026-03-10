/**
 * EventRegistrationForm Component
 * Registration form for activities with React Hook Form + Zod validation
 * Based on PRD Section 5.6 - Actividades
 */

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, Users, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input, Label, FormField, FormError } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { MunetEvent } from '@/lib/types/events'

// Zod validation schema
const registrationSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono es demasiado largo')
    .regex(/^[0-9+\-\s()]+$/, 'El teléfono solo puede contener números'),
  participants: z
    .number({ message: 'Ingresa un número válido' })
    .min(1, 'Debe haber al menos 1 participante')
    .max(10, 'Máximo 10 participantes por registro'),
})

type RegistrationFormValues = z.infer<typeof registrationSchema>

interface EventRegistrationFormProps {
  event: MunetEvent
  onSuccess?: () => void
  className?: string
}

export function EventRegistrationForm({
  event,
  onSuccess,
  className,
}: EventRegistrationFormProps) {
  const [submitStatus, setSubmitStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = React.useState('')

  const maxParticipants = Math.min(event.spotsRemaining, 10)
  const isFull = event.spotsRemaining === 0

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(
      registrationSchema.refine(
        (data) => data.participants <= maxParticipants,
        {
          message: `Solo hay ${maxParticipants} lugares disponibles`,
          path: ['participants'],
        }
      )
    ),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      participants: 1,
    },
  })

  const participantCount = watch('participants') || 1

  const totalPrice = event.price !== null ? event.price * participantCount : 0

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      // Simulate API call - in production, this would call the Lambda function
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For now, we'll simulate a successful registration
      console.log('Registration submitted:', {
        eventId: event.id,
        ...data,
      })

      setSubmitStatus('success')
      onSuccess?.()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Error al procesar el registro. Por favor intenta de nuevo.'
      )
    }
  }

  const handleReset = () => {
    reset()
    setSubmitStatus('idle')
    setErrorMessage('')
  }

  if (isFull) {
    return (
      <div className={cn('rounded-lg border border-border bg-muted/50 p-6', className)}>
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          <div>
            <p className="font-semibold">Evento lleno</p>
            <p className="text-sm">
              No hay lugares disponibles. Te invitamos a explorar otras actividades.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Success State
  if (submitStatus === 'success') {
    return (
      <div className={cn('rounded-lg border border-green-200 bg-green-50 p-6', className)}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-green-800">
            ¡Registro Confirmado!
          </h3>
          <p className="mb-4 text-green-700">
            Hemos enviado un correo de confirmación con los detalles de tu registro.
          </p>
          <div className="mb-6 rounded-md bg-white p-4 text-left text-sm">
            <p className="font-semibold text-foreground">{event.title}</p>
            <p className="text-muted-foreground">
              {new Date(event.date + 'T00:00:00').toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}{' '}
              • {event.startTime} - {event.endTime}
            </p>
            <p className="text-muted-foreground">{event.location}</p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            Registrar a alguien más
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <h3 className="mb-4 font-display text-xl font-bold">Registrarse</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>

        {/* Email */}
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
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        {/* Phone */}
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
          {errors.phone && <FormError>{errors.phone.message}</FormError>}
        </FormField>

        {/* Participants */}
        <FormField>
          <Label htmlFor="participants">
            Número de participantes <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="participants"
              type="number"
              min={1}
              max={maxParticipants}
              {...register('participants', { valueAsNumber: true })}
              className={cn('w-24', errors.participants && 'border-destructive')}
            />
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              Máx. {maxParticipants}
            </span>
          </div>
          {errors.participants && (
            <FormError>{errors.participants.message}</FormError>
          )}
        </FormField>

        {/* Price Summary */}
        {event.price !== null && (
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {participantCount} participante{participantCount > 1 ? 's' : ''} × $
                {event.price.toLocaleString('es-MX')}
              </span>
              <span className="text-xl font-bold text-primary">
                ${totalPrice.toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>
        )}

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
              Procesando...
            </>
          ) : event.price !== null ? (
            `Confirmar Registro ($${totalPrice.toLocaleString('es-MX')})`
          ) : (
            'Confirmar Registro'
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Al registrarte, aceptas recibir información sobre esta actividad por correo electrónico.
        </p>
      </form>
    </div>
  )
}
