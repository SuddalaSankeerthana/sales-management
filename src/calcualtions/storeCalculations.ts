import { addToTotalAmountWith, subToTotalAmountWith, totalItemsPrice } from "../invoice";
import { realtedPercentageAmount } from "./percentageAmount";

export function getStoreDiscountCaluculation(storeDiscounts:[]){
    let storeDiscount = 0;
    storeDiscounts.forEach(
      (item: { cost: number; discount: number }) => {
        if (totalItemsPrice >= item.cost) storeDiscount = item.discount;
      }
    );
  
    let storeDiscountAmount = realtedPercentageAmount(
      totalItemsPrice,
      storeDiscount
    );
    // totalAmount -= storeDiscountAmount;
    subToTotalAmountWith(storeDiscountAmount)
    return({storeDiscount,storeDiscountAmount})
  }