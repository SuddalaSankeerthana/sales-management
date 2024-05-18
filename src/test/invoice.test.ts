
import fs from "fs";
import { getInvoiceHeader } from "../invoiceSections/invoiceHeader";
import { getStyles } from "../invoiceSections/invoiceStyling";
import { getContactDetails } from "../invoiceSections/invoiceContact";

const jsonString = fs.readFileSync("./data/customerData-1.json", "utf-8");
const customerData=JSON.parse(jsonString);
test("test for Header part of invoice", () => {
  expect(typeof getInvoiceHeader()).toBe("string");
  expect(typeof getStyles()).toBe("string");
});
test("test for invoice section-1",()=>{
    expect(typeof getContactDetails( customerData.storeName,
        customerData.address,
        customerData.name,
        customerData.phoneNumber)).toBe("string");
});
