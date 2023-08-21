import { realtedPercentageAmount } from "../calcualtions/percentageAmount";
import { getInvoiceHeader } from "../invoiceSections/invoiceHeader";
import { getStyles } from "../invoiceSections/invoiceStyling";

test("test for Header part of invoice", () => {
  expect(typeof getInvoiceHeader()).toBe("string");
  expect(typeof getStyles()).toBe("string");
});
test("test for percentage amount caluculations",()=>{
    expect(realtedPercentageAmount(100,10)).toEqual(10);
})
