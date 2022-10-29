import { ChangeEvent, MouseEvent } from 'react';

export interface IService {
  name: string;
  price: number;
  id: string;
}

export interface ISelectedServicesProps {
  chosenServices: IService[];
  inputChangePriceHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: {};
  deleteButtonClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IServicesListProps {
  services: IService[];
  buttonClickHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IPrice {
  [key: number]: number;
}

export interface IServiceDiscountProps {
  chosenServices: IService[];
  prices: IPrice;
}

export interface IBillProps {
  chosenServices: IService[];
  prices: IPrice;
}
