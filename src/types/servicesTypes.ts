export interface IService {
  name: string;
  price: number;
  id: string;
}

export interface IPrice {
  [key: number]: number;
}

export interface IPriceWithDiscount {
  [key: string]: number | string;
}

export interface IDiscountPrices {
  [key: string]: number;
}
