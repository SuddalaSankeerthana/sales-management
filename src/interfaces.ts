export type Item = {
    name: string;
    qty: number;
    rate: number;
    gstCategory: number;
  };
  export interface CustomerDataJson {
    name: string;
    storeName: string;
    address: string;
    phoneNumber: string;
    GSTNumber: string;
    dateTime: Date;
    items: Item[];
  }