import { CustomerDataJson } from "./interfaces";
import { getDeliveryHTML } from "./invoiceHtml";

export const PERCENTAGE_FACTOR = 0.01;
export const GST_PERCENTAGE = { essential: 1, luxery: 5, default: 10 };

export var totalAmount = 0,
  totalItemsDiscountAmount = 0,
  totalGst = 0,
  totalItemsPrice = 0;

export function addToTotalAmountWith(amount: number) {
  totalAmount += amount;
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

const getInvoice = function getInvoice(customerData: CustomerDataJson): string {
  (totalAmount = 0),
    (totalItemsDiscountAmount = 0),
    (totalGst = 0),
    (totalItemsPrice = 0);
  let html = getDeliveryHTML(customerData);
  return html;
};

module.exports = getInvoice;
