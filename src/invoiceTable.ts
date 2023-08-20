import { realtedPercentageAmount } from "./calcualtions/percentageAmount";
import { getTotalAmount } from "./calcualtions/totalAmount";
import { Item } from "./interfaces";
import { GST_PERCENTAGE, totalGst, totalItemsDiscountAmount, totalItemsPrice, totalAmount, addToTotalAmountWith, addToTotalItemsDiscountAmountWith, addTototalGstWith, addTotalItemsPriceWith } from "./invoice";

export function getItemsTableRowsWithCaluculations(item: Item): string {
    let itemPrice = item.qty * item.rate;
    let itemGst = realtedPercentageAmount(
      itemPrice,
      GST_PERCENTAGE[item.gstCategory]
    );
    let itemDiscountAmount = realtedPercentageAmount(itemPrice, item.discount);
    let itemAmount = getTotalAmount(itemPrice, itemGst, itemDiscountAmount);
    
    addToTotalAmountWith(itemAmount);
    addToTotalItemsDiscountAmountWith(itemDiscountAmount);
    addTototalGstWith(itemGst);
    addTotalItemsPriceWith(itemPrice)
    // totalGst += itemGst;
    // totalItemsDiscountAmount += itemDiscountAmount;
    // totalItemsPrice += itemPrice;
    // totalAmount += itemAmount;
  
    return `<tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>₹${item.rate}</td>
            <td>${item.discount}</td>
            <td>${itemDiscountAmount}</td>
            <td>${GST_PERCENTAGE[item.gstCategory]}</td>
            <td>${itemGst} </td>
            <td>₹${itemAmount}</td>
          </tr>
          `;
  }