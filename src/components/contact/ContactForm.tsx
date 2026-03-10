/**
 * ContactForm Component
 * Contact form with React Hook Form + Zod validation
 * Based on PRD Section 5.11 - Contacto
 */

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input, Label, FormField, FormError } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Subject options as per PRD
const ASUNTO_OPTIONS = [
  { value: 'informacion-general', label: 'Información General' },
  { value: 'visitas-grupales', label: 'Visitas Grupales' },
  { value: 'renta-espacios', label: 'Renta de Espacios' },
  { value: 'prensa', label: 'Prensa' },
  { value: 'otro', label: 'Otro' },
] as const

// Zod validation schema
const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  asunto: z.enum(
    ['informacion-general', 'visitas-grupales', 'renta-espacios', 'prensa', 'otro'],
    { message: 'Selecciona un asunto' }
  ),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es demasiado largo'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export interface ContactFormData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = React.useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      email: '',
      asunto: undefined,
      mensaje: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      // TODO: Replace with actual API call
      // await submitContactForm(data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log('Contact form submitted:', data)
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Error al enviar el mensaje. Por favor intenta de nuevo.'
      )
    }
  }

  const handleReset = () => {
    reset()
    setSubmitStatus('idle')
    setErrorMessage('')
  }

  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 shadow-sm', className)}>
      <h2 className="font-display text-xl font-bold">Envíanos un Mensaje</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Completa el formulario y te responderemos a la brevedad.
      </p>

      {/* Success State */}
      {submitStatus === 'success' ? (
        <div className="mt-8 flex flex-col items-center py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">¡Mensaje Enviado!</h3>
          <p className="mb-6 text-muted-foreground">
            Gracias por contactarnos. Te responderemos pronto.
          </p>
          <Button variant="outline" onClick={handleReset}>
            Enviar otro mensaje
          </Button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Nombre */}
          <FormField>
            <Label htmlFor="nombre">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nombre"
              placeholder="Tu nombre completo"
              {...register('nombre')}
              className={cn(errors.nombre && 'border-destructive')}
            />
            {errors.nombre && <FormError>{errors.nombre.message}</FormError>}
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

          {/* Asunto */}
          <FormField>
            <Label htmlFor="asunto">
              Asunto <span className="text-destructive">*</span>
            </Label>
            <select
              id="asunto"
              {...register('asunto')}
              className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm transition-all duration-200 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20',
                errors.asunto && 'border-destructive'
              )}
            >
              <option value="">Selecciona un asunto</option>
              {ASUNTO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.asunto && <FormError>{errors.asunto.message}</FormError>}
          </FormField>

          {/* Mensaje */}
          <FormField>
            <Label htmlFor="mensaje">
              Mensaje <span className="text-destructive">*</span>
            </Label>
            <textarea
              id="mensaje"
              rows={5}
              placeholder="¿En qué podemos ayudarte?"
              {...register('mensaje')}
              className={cn(
                'flex w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20',
                errors.mensaje && 'border-destructive'
              )}
            />
            {errors.mensaje && <FormError>{errors.mensaje.message}</FormError>}
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
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
