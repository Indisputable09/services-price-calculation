import { FC, useEffect, useState } from 'react';
import { IServiceDiscountProps } from '../../types/apiType';

const ServicesDiscount: FC<IServiceDiscountProps> = ({
  chosenServices,
  prices,
}): JSX.Element => {
  const [sum, setSum] = useState<number>(0);
  useEffect(() => {
    const values = Object.values(prices);
    const result = values.reduce((acc, value) => {
      return (acc += value);
    }, 0);
    setSum(result);
  }, [prices, chosenServices]);

  return (
    <>
      {chosenServices.length > 0 && <h2>Add Discount</h2>}
      <p>Sum: {sum}</p>
      <p>Total: </p>
    </>
  );
};

export default ServicesDiscount;
