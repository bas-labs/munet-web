/**
 * QR Code Generation Utility
 * 
 * Generates QR codes for ticket validation at museum entry
 */

import QRCode from 'qrcode';

export interface QRCodeData {
  orderId: string;
  visitDate: string;
  ticketCount: number;
  customerEmail?: string;
  createdAt?: string;
}

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  color?: {
    dark?: string;
    light?: string;
  };
}

const DEFAULT_OPTIONS: QRCodeOptions = {
  width: 300,
  margin: 2,
  errorCorrectionLevel: 'M',
  color: {
    dark: '#1A1A1A',
    light: '#FFFFFF',
  },
};

/**
 * Generates a QR code as a base64 encoded data URL
 * 
 * @param data - The data to encode in the QR code
 * @param options - Optional QR code generation options
 * @returns Promise with the base64 encoded QR code image
 */
export async function generateQRCode(
  data: QRCodeData,
  options: QRCodeOptions = {}
): Promise<string> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // Create the payload to encode
  const payload = JSON.stringify({
    o: data.orderId,
    d: data.visitDate,
    t: data.ticketCount,
    c: data.createdAt || new Date().toISOString(),
  });

  try {
    // Generate QR code as data URL (base64 PNG)
    const qrCodeDataUrl = await QRCode.toDataURL(payload, {
      width: mergedOptions.width,
      margin: mergedOptions.margin,
      errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
      color: mergedOptions.color,
    });

    return qrCodeDataUrl;
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('QR code generation failed');
  }
}

/**
 * Generates a QR code as a Buffer (PNG image)
 * 
 * @param data - The data to encode in the QR code
 * @param options - Optional QR code generation options
 * @returns Promise with the QR code as a Buffer
 */
export async function generateQRCodeBuffer(
  data: QRCodeData,
  options: QRCodeOptions = {}
): Promise<Buffer> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  // Create the payload to encode
  const payload = JSON.stringify({
    o: data.orderId,
    d: data.visitDate,
    t: data.ticketCount,
    c: data.createdAt || new Date().toISOString(),
  });

  try {
    const qrCodeBuffer = await QRCode.toBuffer(payload, {
      width: mergedOptions.width,
      margin: mergedOptions.margin,
      errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
      color: mergedOptions.color,
    });

    return qrCodeBuffer;
  } catch (error) {
    console.error('Failed to generate QR code buffer:', error);
    throw new Error('QR code buffer generation failed');
  }
}

/**
 * Validates QR code data structure
 * 
 * @param data - The QR code data to validate
 * @returns boolean indicating if the data is valid
 */
export function validateQRCodeData(data: unknown): data is QRCodeData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const qrData = data as Record<string, unknown>;

  return (
    typeof qrData.orderId === 'string' &&
    qrData.orderId.length > 0 &&
    typeof qrData.visitDate === 'string' &&
    qrData.visitDate.length > 0 &&
    typeof qrData.ticketCount === 'number' &&
    qrData.ticketCount > 0
  );
}

/**
 * Decodes a QR code payload back to QRCodeData
 * 
 * @param payload - The JSON payload from a scanned QR code
 * @returns The decoded QR code data or null if invalid
 */
export function decodeQRCodePayload(payload: string): QRCodeData | null {
  try {
    const parsed = JSON.parse(payload);
    
    // Map shortened keys back to full names
    const data: QRCodeData = {
      orderId: parsed.o,
      visitDate: parsed.d,
      ticketCount: parsed.t,
      createdAt: parsed.c,
    };

    if (!validateQRCodeData(data)) {
      return null;
    }

    return data;
  } catch {
    console.error('Failed to decode QR code payload');
    return null;
  }
}
