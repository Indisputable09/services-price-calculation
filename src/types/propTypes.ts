import { ChangeEvent, MouseEvent } from 'react';
import { IPrice, IPriceWithDiscount, IService } from './servicesTypes';

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

export interface IServiceDiscountProps {
  chosenServices: IService[];
  prices: IPrice;
}

export interface IBillProps {
  chosenServices: IService[];
  prices: IPrice;
  servicesForDiscount: IPriceWithDiscount[];
  getPriceForTotalDiscount: (res: number) => void;
  deleteDiscountId: string;
  resetDeleteDiscountId: () => void;
}

export interface IDiscountBlockProps {
  pricesWithDiscount: IPriceWithDiscount[];
  getIdToDeleteDiscount: (res: string) => void;
}
