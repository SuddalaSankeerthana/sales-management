import { CustomerDataJson, Item } from "./interfaces";
import { getInvoiceHeader } from "./invoiceHeader";
import { getSummaryHTML } from "./summery";

export const  PERCENTAGE_FACTOR = 0.01;
export const GST_PERCENTAGE = { essential: 1, luxery: 5, default: 10 }; // Based on categeory the percentage will be taken

export var totalAmount = 0,
  totalItemsDiscountAmount = 0,
  totalGst = 0,
  totalItemsPrice = 0;
export function addToTotalAmountWith(itemAmount:number){
  totalAmount+=itemAmount;
}

export function addToTotalItemsDiscountAmountWith(discountAmount:number){
  totalItemsDiscountAmount+=discountAmount;
}
export function addTototalGstWith(gst:number){
  totalGst+=gst;
}
export function addTotalItemsPriceWith(itemPrice:number){
  totalItemsPrice+=itemPrice;
}
function getItemsTableRowsWithCaluculations(item: Item): string {
  let itemPrice = item.qty * item.rate;
  let itemGst = realtedPercentageAmount(
    itemPrice,
    GST_PERCENTAGE[item.gstCategory]
  );
  let itemDiscountAmount = realtedPercentageAmount(itemPrice, item.discount);
  let itemAmount = getTotalAmount(itemPrice, itemGst, itemDiscountAmount);

  totalGst += itemGst;
  totalItemsDiscountAmount += itemDiscountAmount;
  totalItemsPrice += itemPrice;
  totalAmount += itemAmount;

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

function realtedPercentageAmount(
  itemPrice: number,
  percentage: number
): number {
  return itemPrice * PERCENTAGE_FACTOR * percentage;
}

function getContactDetails(
  storeName: string,
  address: string,
  customerName: string,
  phoneNumber: string
) {
  return `<div class= "Section-1">
      <h3 class="font-bold">${storeName}</h3>
      <p><span class="text-black"> <Address>${address}</Address></span></p>
      <p class="Padd-left"><span class="text-black">Name: </span>${customerName}</p>
      <p class="Padd-left"><span class="text-black">Phone number: </span>${phoneNumber}</p>
      <p class="Padd-left"><span class="text-black">Date : </span>${new Date()}</p>
    </div>`;
}

function getTotalAmount(price: number, gst: number, discount: number): number {
  return price + gst - discount;
}

function getAllCalulationsPeformedOnTable(customerData: CustomerDataJson) {
  let html = ``;
  for (let item of customerData.items) {
    let itemPrice = item.qty * item.rate;

    let itemGst = realtedPercentageAmount(
      itemPrice,
      GST_PERCENTAGE[item.gstCategory]
    );
    let itemDiscountAmount = realtedPercentageAmount(itemPrice, item.discount);
    let itemAmount = getTotalAmount(itemPrice, itemGst, itemDiscountAmount);

    totalGst += itemGst;
    totalItemsDiscountAmount += itemDiscountAmount;
    totalItemsPrice += itemPrice;
    totalAmount += itemAmount;

    html += `${getItemsTableRowsWithCaluculations(item)}`;
  }
  return html;
}


function getStoreDiscountCaluculation(storeDiscounts:[]){
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
  totalAmount -= storeDiscountAmount;
  return({storeDiscount,storeDiscountAmount})
}
function getDeliveryHTML(customerData: CustomerDataJson): string {
  let html = `${getInvoiceHeader()}
<body>
    ${getContactDetails(
      customerData.storeName,
      customerData.address,
      customerData.name,
      customerData.phoneNumber
    )}
    <div class="Section-2">
      <table>
        <tr class="text-black">
          <td>Item</td>
          <td>quantity</td>
          <td>Price</td>
          <td>Discount(%)</td>
          <td>Discount Amount</td>
          <td>GST(%)</td>
          <td>GST Amount</td>
          <td>Item Amount</td>
        </tr>
        ${getAllCalulationsPeformedOnTable(customerData)}
      </table>
  </div>`;
  let{storeDiscount,storeDiscountAmount}=getStoreDiscountCaluculation(customerData.storeDiscounts)
  html+=`
   ${getSummaryHTML(
    storeDiscount,
    storeDiscountAmount,
    customerData.paymentMethod
  )}
    `;
  return html;
}

const getInvoice = function getInvoice(customerData: CustomerDataJson): string {
  let html = getDeliveryHTML(customerData);
  totalAmount = 0,
  totalItemsDiscountAmount = 0,
  totalGst = 0,
  totalItemsPrice = 0;
  return html;
};

module.exports = getInvoice;
