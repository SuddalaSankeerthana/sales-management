import fs from "fs";
import { CustomerDataJson } from "./interfaces";

const getInvoiceFunction = require("./invoice");

const jsonString = fs.readFileSync("./data/customerData.json", "utf-8");

const jsonFileData: CustomerDataJson = JSON.parse(jsonString);

let html = getInvoiceFunction(jsonFileData);
fs.writeFileSync("invoice.html", html);
console.log("File generated");
