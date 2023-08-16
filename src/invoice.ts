import { CustomerDataJson } from "./interfaces";
const gstPercentage=[1,5,10]// Based on categeory the percentage will be taken
function getStyles(){
  return(`
      .text-bold-black{color: black;  font-weight: bold;}
      .text-gray-right{
      color:gray;
      text-align: left;
      }
      .text-black{
      color:black;
      font-weight: bold;
      }
      .Section-1{
      border-top: 1px solid;
      border-bottom: 1px solid;
      }
      .Section-2{
      text-align: left;
      justify-content: left;
    }
    .Padd-left{
      text-align: left;
    }
    table, td {
     width: fit-content;
     justify-content:center;
    }
    body{
    display: flex;
    width: fit-content;
    align-items: right;
    justify-content: center;
    flex-direction: column;
    font-family:monospace;
    border: solid;
    }
    h3{
      text-align: center;
    }
    `);
}
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
    <tr>
    <td class="text-black" width=10%>Item</td>
    <td class="text-black" width=10%>quantity</td>
    <td class="text-black" width=10%>Price</td>
    <td class="text-black" width=10%>GST(%)</td>
    <td class="text-black" width=10%>GST Amount</td>
    <td class="text-black" width=10%>Item Amount</td>
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
        <td width=10%>${gstPercentage[item.gstCategory]}</td>
        <td width=10%>${itemGst} </td>
        <td width=10%>₹${itemAmount}</td>
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
