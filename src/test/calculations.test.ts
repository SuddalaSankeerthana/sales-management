import { realtedPercentageAmount } from "../calcualtions/percentageAmount";
import { getStoreDiscountCaluculation } from "../calcualtions/storeCalculations";
import { getTotalAmount } from "../calcualtions/totalAmount";
import { addTotalItemsPriceWith } from "../invoice";
import fs from "fs";

test("test for percentage amount caluculations",()=>{
    expect(realtedPercentageAmount(100,10)).toEqual(10);
});
test("test for storeCaluculations",()=>{
    const jsonString = fs.readFileSync("./data/customerData-1.json", "utf-8");
    const customerData=JSON.parse(jsonString);
    addTotalItemsPriceWith(5000);
    expect(getStoreDiscountCaluculation(customerData.storeDiscounts)).toEqual({storeDiscount: 5,
        storeDiscountAmount: 250
    })
});
test("test for total amount calculations",()=>{
    expect(getTotalAmount(1000,200,100)).toEqual(1100);
})
