import { CustomerDataJson, Item } from "./interfaces";
import getStyles from "../src/invoiceStyling";

const PERCENTAGE_FACTOR = 0.01;
const GST_PERCENTAGE = { essential: 1, luxery: 5, default: 10 }; // Based on categeory the percentage will be taken
function getItemsTableRow(
  item: Item,
  itemDiscountAmount: number,
  itemAmount: number,
  itemGst: number
):string {
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

function getInvoiceHeader():string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice</title>
<style>${getStyles()}</style>
</head>
`;
}

function realtedPercentageAmount(itemPrice: number, percentage: number):number {
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

function getTotalAmount(price: number, gst: number, discount: number):number {
  return price + gst - discount;
}
function getAllCalulationsPeformed(customerData:CustomerDataJson){
  let itemsTable=``;
  let totalAmount = 0,
  totalItemsDiscountAmount = 0,
  totalGst = 0,
  totalItemsPrice = 0;

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

  itemsTable += `${getItemsTableRow(
    item,
    itemDiscountAmount,
    itemAmount,
    itemGst
  )}`;
}

let storeDiscount = 0;
customerData.storeDiscounts.forEach(
  (item: { cost: number; discount: number }) => {
    if (totalItemsPrice >= item.cost) storeDiscount = item.discount;
  }
);

let storeDiscountAmount = realtedPercentageAmount(totalItemsPrice,storeDiscount);
totalAmount -= storeDiscountAmount;
return(
  {totalAmount,totalItemsDiscountAmount,totalGst,totalItemsPrice,storeDiscount,storeDiscountAmount,itemsTable})
}

function getSummaryHTML(
  totalAmount: number,
  totalItemsDiscountAmount: number,
  totalGst: number,
  totalItemsPrice: number,
  storeDiscount: number,
  storeDiscountAmount: number,
  paymentMethod: String
) {
  return(`
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
</html>`);
}

function getDeliveryHTML(customerData: CustomerDataJson):string {
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
        `;
  let{totalAmount,totalItemsDiscountAmount,totalGst,totalItemsPrice,storeDiscount,storeDiscountAmount,itemsTable}=getAllCalulationsPeformed(customerData)
  html+=itemsTable;
  html += `</table>
  </div>
  ${getSummaryHTML(
    totalAmount,
    totalItemsDiscountAmount,
    totalGst,
    totalItemsPrice,
    storeDiscount,
    storeDiscountAmount,
    customerData.paymentMethod)}
    `;
  return html;
}

const getInvoice = function getInvoice(customerData: CustomerDataJson):string {
  let html = getDeliveryHTML(customerData);
  return html;
};

module.exports = getInvoice;
