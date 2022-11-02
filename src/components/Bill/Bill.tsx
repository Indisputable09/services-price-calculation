import { FC, useEffect, useState } from 'react';
import {
  IDiscountPrices,
  IPriceWithDiscount,
  IService,
} from '../../types/servicesTypes';
import { IBillProps } from '../../types/propTypes';
import styles from '../../styles/Bill.module.scss';

const {
  bill__block,
  bill__text,
  bill__block__item,
  bill__price__block,
  bill__price__noDiscount,
} = styles;

const Bill: FC<IBillProps> = ({
  chosenServices,
  prices,
  servicesForDiscount,
  getPriceForTotal,
  deleteDiscountId,
  resetDeleteDiscountId,
}): JSX.Element => {
  const [pricesWithDiscount, setPricesWithDiscount] = useState<IDiscountPrices>(
    {}
  );

  const handleDiscountCount = ({
    discountValue,
    discount_type,
    name,
    id,
  }: IPriceWithDiscount): JSX.Element => {
    const resultWithPercent =
      Number(prices[id]) - (Number(prices[id]) * Number(discountValue)) / 100;
    const resultWithCurrency = Number(prices[id]) - Number(discountValue);
    const percentDiscount = `${discount_type} (${
      (Number(prices[id]) * Number(discountValue)) / 100
    } USD) = ${resultWithPercent || resultWithPercent.toFixed(2)} USD`;
    const currencyDiscount = ` ${discount_type} = ${
      resultWithCurrency || resultWithCurrency.toFixed(2)
    } USD`;

    return (
      <p key={name}>
        -{discountValue}
        {discount_type === '%' ? `${percentDiscount}` : `${currencyDiscount}`}
      </p>
    );
  };

  useEffect(() => {
    const servicesWithDiscount = servicesForDiscount.filter(item => {
      const chosenService = chosenServices.filter(service => {
        return service.id === item.id;
      });
      if (chosenService.length > 0) {
        return item.id === chosenService[0].id;
      } else {
        return false;
      }
    });
    if (servicesWithDiscount.length === 0) {
      return;
    }
    servicesWithDiscount.forEach(({ id, discountValue, discount_type }) => {
      const resultWithPercent =
        Number(prices[id]) - (Number(prices[id]) * Number(discountValue)) / 100;
      const resultWithCurrency = Number(prices[id]) - Number(discountValue);
      switch (discount_type) {
        case '%':
          setPricesWithDiscount(prevState => {
            return { ...prevState, [id]: +resultWithPercent.toFixed(2) };
          });
          break;
        default:
          setPricesWithDiscount(prevState => {
            return { ...prevState, [id]: +resultWithCurrency.toFixed(2) };
          });
      }
    });
  }, [chosenServices, prices, servicesForDiscount]);

  useEffect(() => {
    if (deleteDiscountId) {
      delete pricesWithDiscount[deleteDiscountId];
      resetDeleteDiscountId();
      setPricesWithDiscount(pricesWithDiscount);
    }
    const values = Object.values(pricesWithDiscount);
    const result = values.reduce((acc, value) => {
      return (acc += value);
    }, 0);
    getPriceForTotal(result);
  }, [
    deleteDiscountId,
    getPriceForTotal,
    pricesWithDiscount,
    resetDeleteDiscountId,
  ]);

  return (
    <div className={bill__block}>
      <h4 className={bill__text}>Bill</h4>
      <ul>
        {chosenServices.map((service: IService): JSX.Element => {
          return (
            <li key={service.id} className={bill__block__item}>
              <p>{service.name}</p>
              <div className={bill__price__block}>
                <p className={bill__price__noDiscount}>
                  {prices[service.id] === 0 ? 0 : prices[service.id]} USD
                </p>
                {servicesForDiscount &&
                  servicesForDiscount
                    .filter(item => item.id === service.id)
                    .map(item => {
                      return handleDiscountCount(item);
                    })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Bill;
