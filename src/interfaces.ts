export type Item = {
  name: string;
  qty: number;
  rate: number;
  gstCategory:"luxery"|"essential"|"default";
  discount: number;
};
export interface CustomerDataJson {
  name: string;
  storeName: string;
  address: string;
  phoneNumber: string;
  GSTNumber: string;
  dateTime: Date;
  paymentMethod: string;
  items: Item[];
  storeDiscounts: [];
}
