import fs from "fs";
import { CustomerDataJson } from "./interfaces";
import { getInvoiceHTML } from "./invoice";

const jsonString = fs.readFileSync("./data/customerData-1.json", "utf-8");
const jsonString2 = fs.readFileSync("./data/customerData-2.json", "utf-8");
const jsonFileData: CustomerDataJson = JSON.parse(jsonString);
const jsonFileData2: CustomerDataJson = JSON.parse(jsonString2);

let html = getInvoiceHTML(jsonFileData);
let html1 = getInvoiceHTML(jsonFileData2);

fs.writeFileSync("build/invoice.html", html);
console.log("File generated");

fs.writeFileSync("build/invoice1.html", html1);
console.log("File generated");
