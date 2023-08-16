import fs from "fs";
import { CustomerDataJson } from "./interfaces";
const getInvoiceFunction =require("./invoice");
const jsonString = fs.readFileSync(
    "/Users/sankeerthana/Documents/sales-management/data/customerData.json",
  "utf-8"
);
const jsonFileData: CustomerDataJson = JSON.parse(jsonString);
console.log(jsonFileData);
console.log(getInvoiceFunction)
getInvoiceFunction(jsonFileData).then((html:string)=>{
    fs.writeFileSync("invoice.html", html);
    console.log("File generated");
});