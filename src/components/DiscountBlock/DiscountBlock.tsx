import { FC } from 'react';
import { IDiscountBlockProps } from '../../types/apiType';

const DiscountBlock: FC<IDiscountBlockProps> = ({
  pricesWithDiscount,
}): JSX.Element => {
  return (
    <>
      <h2>Discount</h2>
      <ul>
        {pricesWithDiscount &&
          pricesWithDiscount.map(item => {
            return (
              <li key={item.name}>
                <p>
                  {item.name} {item.discountValue}
                  {item.discount_type}
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default DiscountBlock;
