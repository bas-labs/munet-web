/**
 * Inquiry API Functions
 * Handles venue rental inquiry submissions
 * Based on PRD Section 5.9 - Renta de Espacios
 */

import type { InquiryFormData, InquirySubmission } from '@/lib/types/spaces'

// API Gateway endpoint (placeholder - will be configured via environment variable)
const API_ENDPOINT =
  import.meta.env.VITE_API_ENDPOINT || 'https://api.munet.mx/v1'

interface SubmitInquiryResponse {
  success: boolean
  inquiryId?: string
  message?: string
}

/**
 * Submit a venue rental inquiry
 * @param formData - The inquiry form data
 * @returns Promise resolving to the submission response
 * @throws Error if the submission fails
 */
export async function submitInquiry(
  formData: InquiryFormData
): Promise<SubmitInquiryResponse> {
  try {
    const response = await fetch(`${API_ENDPOINT}/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `Error ${response.status}: Error al enviar la solicitud`
      )
    }

    const data: SubmitInquiryResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'No se pudo conectar con el servidor. Por favor verifica tu conexión e intenta de nuevo.'
      )
    }
    throw error
  }
}

/**
 * Get inquiry status by ID (for admin/tracking purposes)
 * @param inquiryId - The inquiry ID
 * @returns Promise resolving to the inquiry details
 */
export async function getInquiryStatus(
  inquiryId: string
): Promise<InquirySubmission | null> {
  try {
    const response = await fetch(`${API_ENDPOINT}/inquiries/${inquiryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Error al obtener el estado`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar con el servidor.')
    }
    throw error
  }
}
