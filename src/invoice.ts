import { CustomerDataJson, Item } from "./interfaces";
import getStyles from "../src/invoiceStyling";
const PERCENTAGE_FACTOR=0.01;
const gstPercentage:number[]= [1, 5, 10]; // Based on categeory the percentage will be taken
function getItemsTableRow(item:Item,itemDiscountAmount:number,itemAmount:number,itemGst:number){
return(`<tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>₹${item.rate}</td>
          <td>${item.discount}</td>
          <td>${itemDiscountAmount}</td>
          <td>${gstPercentage[item.gstCategory]}</td>
          <td>${itemGst} </td>
          <td>₹${itemAmount}</td>
        </tr>
        `);
}
function getHtmlHeader(){
return(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Invoice</title>
<style>${getStyles()}</style>
</head>
`)
}
function getContactDetails(storeName:string,address:string,customerName:string,phoneNumber:string){
return(`<div class= "Section-1">
      <h3 class="font-bold">${storeName}</h3>
      <p><span class="text-black"> <Address>${address}</Address></span></p>
      <p class="Padd-left"><span class="text-black">Name: </span>${customerName}</p>
      <p class="Padd-left"><span class="text-black">Phone number: </span>${phoneNumber}</p>
      <p class="Padd-left"><span class="text-black">Date : </span>${new Date()}</p>
    </div>`
)
}
function getDeliveryHTML(customerData: CustomerDataJson) {
  let html = `${getHtmlHeader()}
<body>
    ${getContactDetails(customerData.storeName,customerData.address,customerData.name,customerData.phoneNumber)}
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
  let totalAmount = 0,
    totalItemsDiscountAmount = 0,
    totalGst = 0,
    totalItemsPrice = 0;
  for (let item of customerData.items) {
    let itemGst =
      item.qty * (item.rate * PERCENTAGE_FACTOR) * gstPercentage[item.gstCategory];
    totalGst += itemGst;
    let itemDiscountAmount = item.rate * PERCENTAGE_FACTOR * item.discount;
    totalItemsDiscountAmount += itemDiscountAmount;
    let itemPrice = item.qty * item.rate;
    let itemAmount = itemPrice + itemGst - itemDiscountAmount;
    totalItemsPrice += itemPrice;
    totalAmount += itemAmount;
    html += `${getItemsTableRow(item,itemDiscountAmount,itemAmount,itemGst)}`;
  }

  let storeDiscount = 0;
  customerData.storeDiscounts.forEach((item: { cost: number; discount: number }) => {
    if (totalItemsPrice >= item.cost) storeDiscount = item.discount;
  });

  let storeDiscountAmount = totalItemsPrice * PERCENTAGE_FACTOR * storeDiscount;
  totalAmount -= storeDiscountAmount;

  html += `</table>
  </div>
  <div class=" pt-20 pr-10 text-right">
    <p class="text-gray-right">Total price : <span class="text-black">₹${totalItemsPrice}</span></p>
    <p class="text-gray-right">Total GST : <span class="text-black">₹${totalGst}</span></p>
    <p class="text-gray-right">Store Discount(%) : <span class="text-black">${storeDiscount}</span></p>
    <p class="text-gray-right">Store Discount Amount: <span class="text-black">₹${storeDiscountAmount}</span></p>
    <p class="text-gray-right">Total Money Saved: <span class="text-black">₹${
      storeDiscountAmount + totalItemsDiscountAmount
    }</span></p>
    <p class="text-gray-right">Total Amount : <span class="text-black">₹${totalAmount}</span></p>
    <p>Payment method : ${customerData.paymentMethod}</p>
  </div>
</body>
</html>
    `;
  return html;
}

const getInvoice = async function getInvoice(customerData: CustomerDataJson) {
  return new Promise(async (resolve, reject) => {
    try {
      const html = getDeliveryHTML(customerData);
      resolve(html);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = getInvoice;
