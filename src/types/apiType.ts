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
}

export interface IServicesListProps {
  services: IService[];
  buttonClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface IPrice {
  [key: number]: number;
}
