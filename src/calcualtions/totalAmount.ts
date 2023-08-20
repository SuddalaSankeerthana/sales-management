export function getTotalAmount(price: number, gst: number, discount: number): number {
    return price + gst - discount;
  }