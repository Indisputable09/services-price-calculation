import { FC } from 'react';
import { IBillProps, IService } from '../../types/apiType';

const Bill: FC<IBillProps> = ({
  chosenServices,
  prices,
  pricesWithDiscount,
}): JSX.Element => {
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
                pricesWithDiscount.map(item => {
                  if (item.name !== service.name) {
                    return false;
                  }
                  return (
                    <span key={item.name}>
                      -{item.discountValue}
                      {item.discount_type === '%'
                        ? `${item.discount_type}(${
                            (Number(prices[service.id]) *
                              Number(item.discountValue)) /
                            100
                          } USD) = ${
                            Number(prices[service.id]) -
                            (Number(prices[service.id]) *
                              Number(item.discountValue)) /
                              100
                          }`
                        : `= ${
                            Number(prices[service.id]) -
                            Number(item.discountValue)
                          }`}
                    </span>
                  );
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
