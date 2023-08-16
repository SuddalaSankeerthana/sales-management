import { CustomerDataJson } from "./interfaces";
function getDeliveryHTML(options:CustomerDataJson) {
  let data= `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style> 
    </style>
</head>
<body>
    <div class= "Section-1">
    <h3 class="font-bold">${options.storeName}</h3>
    <p>Name : ${options.name}</p>
    <p>${options.address}</p>
    <p>Phone number:${options.phoneNumber}</p>
    <p>Date:${new Date()}</p>
    </div>
    <p>**********************</p>
    <div class="Section-2">
    <table>
    <tr>
    <td width=10%>Item</td>
    <td width=10%>quantity</td>
    <td width=10%>Price</td>
    <td width=10%>GSTPercentage</td>
    <td width=10%>Total GST</td>
    <td width=10%>Item Amount</td>
    </tr>`
  let totalAmount=0;
  let totalGst=0;
  for (let item of options.items) {
    let itemAmount=item.qty*item.rate;
    let itemGst=item.qty*(item.rate*0.01);
     totalAmount+=itemAmount
     totalGst+=itemGst
    data += `
    <tr>
        <td width=10%>${item.name}</td>
        <td width=10%>${item.qty}</td>
        <td width=10%>₹${item.rate}</td>
        <td width=10%>${item.GSTPercentage}</td>
        <td width=10%>${totalGst} </td>
        <td width=10%>₹${itemAmount}</td>
    </tr>
    `; 
  }
  data+=
  `</table>
  <div class=" pt-20 pr-10 text-right">
    <p class="text-gray">Total price : <span class="text-black">₹${totalAmount}</span></p>
    <p class="text-gray">Total GST : <span class="text-black">₹${totalGst}</span></p>
    <p class="text-gray">Total Amount : <span class="text-black">₹${totalAmount+totalGst}</span></p>
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
