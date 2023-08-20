import { getStoreDiscountCaluculation } from "./calcualtions/storeCalculations";
import { CustomerDataJson } from "./interfaces";
import { getContactDetails } from "./invoiceSections/invoiceContact";
import { getInvoiceHeader } from "./invoiceSections/invoiceHeader";
import { getSummaryHTML } from "./invoiceSections/invoiceSummery";
import { getItemsTable } from "./invoiceSections/itemsTable/invoiceTable";

export function getDeliveryHTML(customerData: CustomerDataJson): string {
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