import { FC, useEffect, useState } from 'react';
import {
  IBillProps,
  IDiscountPrices,
  IPriceWithDiscount,
  IService,
} from '../../types/apiType';

const Bill: FC<IBillProps> = ({
  chosenServices,
  prices,
  servicesForDiscount,
  getPriceForTotal,
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
    const percentDiscount = `${discount_type}(${
      (Number(prices[id]) * Number(discountValue)) / 100
    } USD) = ${resultWithPercent || resultWithPercent.toFixed(2)}`;
    const currencyDiscount = `= ${
      resultWithCurrency || resultWithCurrency.toFixed(2)
    }`;

    return (
      <span key={name}>
        -{discountValue}{' '}
        {discount_type === '%' ? `${percentDiscount}` : `${currencyDiscount}`}
      </span>
    );
  };

  useEffect(() => {
    const servicesWithDiscount = servicesForDiscount.filter(item => {
      const chosenService = chosenServices.filter(service => {
        return service.id === item.id;
      });
      if (chosenService) {
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
    const values = Object.values(pricesWithDiscount);
    const result = values.reduce((acc, value) => {
      return (acc += value);
    }, 0);
    getPriceForTotal(result);
  }, [getPriceForTotal, pricesWithDiscount]);

  return (
    <>
      <h2>Bill</h2>
      <ul>
        {chosenServices.map((service: IService): JSX.Element => {
          return (
            <li key={service.id}>
              <p>
                {service.name}{' '}
                <span>{prices[service.id] === 0 ? 0 : prices[service.id]}</span>{' '}
                {servicesForDiscount &&
                  servicesForDiscount
                    .filter(item => item.id === service.id)
                    .map(item => {
                      return handleDiscountCount(item);
                    })}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Bill;
