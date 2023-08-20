import { totalAmount, totalGst, totalItemsDiscountAmount, totalItemsPrice } from "./invoice";
export function getSummaryHTML(
    storeDiscount: number,
    storeDiscountAmount: number,
    paymentMethod: String
  ) {
    return `
    <div class=" pt-20 pr-10 text-right">
      <p class="text-black">SUMMERY</p>
      <p class="text-gray-right">Total price : <span class="text-black">₹${totalItemsPrice}</span></p>
      <p class="text-gray-right">Total GST : <span class="text-black">₹${totalGst}</span></p>
      <p class="text-gray-right">Store Discount(%) : <span class="text-black">${storeDiscount}</span></p>
      <p class="text-gray-right">Store Discount Amount: <span class="text-black">₹${storeDiscountAmount}</span></p>
      <p class="text-gray-right">Total Money Saved: <span class="text-black">₹${
        storeDiscountAmount + totalItemsDiscountAmount
      }</span></p>
      <p class="text-gray-right">Total Amount : <span class="text-black">₹${totalAmount}</span></p>
      <p>Payment method : ${paymentMethod}</p>
    </div>
  </body>
  </html>`;
  }