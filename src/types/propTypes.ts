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

export interface ISearchServicesProps {
  showServicesList: boolean;
  setShowServicesList: (e: boolean) => void;
  handleChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface IAddDiscountProps {
  handleShowDiscountsBlockClick: () => void;
  showDiscountsBlock: boolean;
}

export interface IDiscountSetBlock {
  discountServiceTitle: string;
  handleServicesForDiscountInputFocus: () => void;
  discountValue: number;
  handleDiscountValueInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDiscountTypeClick: (e: MouseEvent<HTMLButtonElement>) => void;
  discountType: string;
}

export interface IServicesForDiscountListProps {
  servicesForDiscount: IService[];
  handleServiceForDiscountClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IApplyDiscount {
  handleApplyClick: () => void;
  discountType: string;
  discountValue: number;
  discountServiceTitle: string;
  sum: number;
  totalDiscount: number;
}
