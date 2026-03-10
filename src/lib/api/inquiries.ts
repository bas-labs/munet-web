/**
 * Inquiry API - Stub for venue rental inquiries
 * TODO: Implement AWS Lambda integration in checkout flow
 */

import type { InquiryFormData } from '@/lib/types/spaces'

export async function submitInquiry(data: InquiryFormData): Promise<void> {
  // TODO: Replace with actual API Gateway call
  console.log('Submitting inquiry:', data)
  
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // For now, just log the data
  // In production, this would call the Lambda endpoint
  return
}
