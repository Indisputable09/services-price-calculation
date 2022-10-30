import { FC } from 'react';
import { IBillProps, IPriceWithDiscount, IService } from '../../types/apiType';

const Bill: FC<IBillProps> = ({
  chosenServices,
  prices,
  pricesWithDiscount,
}): JSX.Element => {
  const handleDiscountCount = (
    { id }: IService,
    { discountValue, discount_type, name }: IPriceWithDiscount
  ): JSX.Element => {
    const resultWithPercent =
      Number(prices[id]) - (Number(prices[id]) * Number(discountValue)) / 100;

    const resultWithCurrency = Number(prices[id]) - Number(discountValue);

    const percentDiscount = `${discount_type}(${
      (Number(prices[id]) * Number(discountValue)) / 100
    } USD) = ${resultWithPercent}`;

    const currencyDiscount = `= ${resultWithCurrency}`;

    return (
      <span key={name}>
        -{discountValue}{' '}
        {discount_type === '%' ? `${percentDiscount}` : `${currencyDiscount}`}
      </span>
    );
  };

  return (
    <>
      <h2>Bill</h2>
      {chosenServices.map((service: IService): JSX.Element => {
        return (
          <li key={service.id}>
            <p>
              {service.name}{' '}
              <span>{prices[service.id] === 0 ? 0 : prices[service.id]}</span>{' '}
              {pricesWithDiscount &&
                pricesWithDiscount
                  .filter(item => item.id === service.id)
                  .map(item => {
                    return handleDiscountCount(service, item);
                  })}
            </p>
          </li>
        );
      })}
    </>
  );
};

export default Bill;

/*{item.discount_type === '%'
                        ? `${
                            Number(prices[service.id]) -
                            (Number(prices[service.id]) *
                              Number(item.discountValue)) /
                              100
                          }`
                        : Number(prices[service.id]) -
                          Number(item.discountValue)} */
