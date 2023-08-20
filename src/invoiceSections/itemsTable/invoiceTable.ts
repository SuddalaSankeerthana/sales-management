
import { CustomerDataJson } from "../../interfaces";
import { getItemsTableRowsWithCaluculations } from "./invoiceTableRowsData";

export function getItemsTable(customerData: CustomerDataJson) {
  let html = `<div class="Section-2">
      <table>
        <tr class="text-black">
          <td>Item</td>
          <td>quantity</td>
          <td>Price</td>
          <td>Discount(%)</td>
          <td>Discount Amount</td>
          <td>GST(%)</td>
          <td>GST Amount</td>
          <td>Item Amount</td>
        </tr>`;
  for (let item of customerData.items) {
    html += `${getItemsTableRowsWithCaluculations(item)}`;
  }
  html += `</table>
    </div>`;
  return html;
}
