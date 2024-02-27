export function calculateTotalPrice(
  basePrice: number,
  // shippingCost: number,
  // discount: number,
  taxPercentage: number
): number {
  // const discountedPrice = basePrice - discount;
  const taxAmount = (basePrice ?? 1 * taxPercentage??1) / 100;
  const total = Number(basePrice + taxAmount);
  return total;
}
