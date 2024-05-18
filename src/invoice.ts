import { getStoreDiscountCaluculation } from "./calcualtions/storeCalculations";
import { CustomerDataJson } from "./interfaces";
import { getContactDetails } from "./invoiceSections/invoiceContact";
import { getInvoiceHeader } from "./invoiceSections/invoiceHeader";
import { getSummaryHTML } from "./invoiceSections/invoiceSummery";
import { getItemsTable } from "./invoiceSections/itemsTable/invoiceTable";

export const PERCENTAGE_FACTOR = 0.01;
export const GST_PERCENTAGE = { essential: 1, luxery: 5, default: 10 };

export var totalAmount = 0,
  totalItemsDiscountAmount = 0,
  totalGst = 0,
  totalItemsPrice = 0;

export function addToTotalAmountWith(amount: number) {
  totalAmount += amount;
}

export function initialize(){
  totalAmount = 0,
  totalItemsDiscountAmount = 0,
  totalGst = 0,
  totalItemsPrice = 0;
}

export function addToTotalItemsDiscountAmountWith(discountAmount: number) {
  totalItemsDiscountAmount += discountAmount;
}
export function addTototalGstWith(gst: number) {
  totalGst += gst;
}
export function addTotalItemsPriceWith(itemPrice: number) {
  totalItemsPrice += itemPrice;
}
export function subToTotalAmountWith(amount: number) {
  totalAmount -= amount;
}
export function subToTotalItemPriceWith(amount: number) {
  totalItemsPrice -= amount;
}

export function getInvoiceHTML(customerData: CustomerDataJson): string {
  initialize()
  let html = `${getInvoiceHeader()}
  <body>
    ${getContactDetails(
      customerData.storeName,
      customerData.address,
      customerData.name,
      customerData.phoneNumber
  )}
    ${getItemsTable(customerData)}`;
  let { storeDiscount, storeDiscountAmount } = getStoreDiscountCaluculation(
      customerData.storeDiscounts
  );
  html += `
   ${getSummaryHTML(
      storeDiscount,
      storeDiscountAmount,
      customerData.paymentMethod
  )}
    `;
  return html;
}