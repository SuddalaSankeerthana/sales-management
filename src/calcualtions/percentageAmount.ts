import { PERCENTAGE_FACTOR } from "../invoice";

export function realtedPercentageAmount(
    itemPrice: number,
    percentage: number
  ): number {
    return itemPrice * PERCENTAGE_FACTOR * percentage;
  }
  