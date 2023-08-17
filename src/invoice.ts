import { CustomerDataJson } from "./interfaces";
import getStyles from "../src/invoiceStyling"

const gstPercentage=[1,5,10]// Based on categeory the percentage will be taken

function getDeliveryHTML(options:CustomerDataJson) {
  let data= `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <style>${getStyles()}</style>
  </head>
<body>
    <div class= "Section-1">
    <h3 class="font-bold">${options.storeName}</h3>
    <p><span class="text-black"> <Address>${options.address}</Address></span></p>
    <p class="Padd-left"><span class="text-black">Name : </span>${options.name}</p>
    <p class="Padd-left"><span class="text-black">Phone number : </span>${options.phoneNumber}</p>
    <p class="Padd-left"><span class="text-black">Date : </span>${new Date()}</p>
    </div>
    <div class="Section-2">
    <table>
    <tr class="text-black">
    <td >Item</td>
    <td >quantity</td>
    <td >Price</td>
    <td >GST(%)</td>
    <td >GST Amount</td>
    <td >Item Amount</td>
    </tr>`
  let totalAmount=0;
  let totalGst=0;
  for (let item of options.items) {
    let itemAmount=item.qty*item.rate;
    let itemGst=item.qty*(item.rate*0.01)*gstPercentage[item.gstCategory];
     totalAmount+=itemAmount
     totalGst+=itemGst
    data += `
    <tr>
        <td >${item.name}</td>
        <td >${item.qty}</td>
        <td >₹${item.rate}</td>
        <td >${gstPercentage[item.gstCategory]}</td>
        <td >${itemGst} </td>
        <td >₹${itemAmount}</td>
    </tr>
    `; 
  }
  data+=
  `</table>
  <div class=" pt-20 pr-10 text-right">
    <p class="text-gray-right">Total price : <span class="text-black">₹${totalAmount}</span></p>
    <p class="text-gray-right">Total GST : <span class="text-black">₹${totalGst}</span></p>
    <p class="text-gray-right">Total Amount : <span class="text-black">₹${totalAmount+totalGst}</span></p>
    <p>Payment method : ${options.paymentMethod}</p>
  </div>
</body>
</html>
    `;
    return data;
}

const getInvoice=async function getInvoice(options:CustomerDataJson) {
  return new Promise(async (resolve, reject) => {
    try {
      const html = getDeliveryHTML(options);
      resolve(html);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = 
getInvoice
