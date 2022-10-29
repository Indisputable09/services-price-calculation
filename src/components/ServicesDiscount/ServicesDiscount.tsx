import { FC } from 'react';
import { IServiceDiscountProps } from '../../types/apiType';

const ServicesDiscount: FC<IServiceDiscountProps> = ({
  chosenServices,
  //   sum,
}): JSX.Element => {
  return (
    <>
      {chosenServices.length > 0 && <h2>Add Discount</h2>}
      <p>
        Sum:
        {/* {chosenServices.reduce((acc, item) => {
          return (acc += item.price);
        }, 0)} */}
      </p>
      <p>Total: </p>
    </>
  );
};

export default ServicesDiscount;
