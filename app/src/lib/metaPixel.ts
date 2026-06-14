/**
 * Dispara os eventos de conversão (Contact e Lead) no Meta Pixel.
 */
export const handleConversionClick = () => {
  if (typeof window !== 'undefined' && typeof (window as any).fbq !== 'undefined') {
    (window as any).fbq('track', 'Contact');
    (window as any).fbq('track', 'Lead');
  }
};
