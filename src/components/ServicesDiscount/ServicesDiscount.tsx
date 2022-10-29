import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IService, IServiceDiscountProps } from '../../types/apiType';
// import ServicesList from '../ServicesList';

const ServicesDiscount: FC<IServiceDiscountProps> = ({
  chosenServices,
  prices,
}): JSX.Element => {
  const [sum, setSum] = useState<number>(0);
  const [showDiscountsBlock, setShowDiscountsBlock] = useState<boolean>(false);
  const [showServicesForDiscount, setShowServicesForDiscount] =
    useState<boolean>(false);
  const [discountValue, setDiscountValue] = useState<string>('');

  useEffect(() => {
    const values = Object.values(prices);
    const result = values.reduce((acc, value) => {
      return (acc += value);
    }, 0);
    setSum(result);
  }, [prices, chosenServices]);

  const handleShowDiscountBlockClick = (): void => {
    setShowDiscountsBlock(!showDiscountsBlock);
  };

  const inputEventsHandler = {
    onFocus: (): void => setShowServicesForDiscount(true),
    onBlur: (): void => setShowServicesForDiscount(false),
    // onChange: (e: ChangeEvent<HTMLInputElement>): void => {
    //   console.log(e.target.value);
    //   console.log(e.target);
    // },
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscountValue((e.target as HTMLInputElement).value);
  };

  return (
    <>
      {chosenServices.length > 0 && (
        <>
          <h2>Add Discount</h2>
          <button type="button" onClick={handleShowDiscountBlockClick}>
            Add
          </button>
        </>
      )}
      {showDiscountsBlock && (
        <input
          type="text"
          id="services-for-discount"
          name="services-for-discount"
          placeholder="Choose a service"
          {...inputEventsHandler}
        />
      )}
      <div>
        <input
          type="text"
          id="discount"
          name="discount"
          placeholder="0"
          value={discountValue}
          onChange={handleInputChange}
        />
        <button type="button" name="USD">
          USD
        </button>
        <button type="button" name="percents">
          %
        </button>
      </div>
      <button type="button">Apply discount</button>
      {showServicesForDiscount && (
        <ul>
          {chosenServices.map((service: IService) => {
            return (
              <li key={service.id}>
                <p>{service.name}</p>
              </li>
            );
          })}
        </ul>
      )}
      <p>Sum: {sum}</p>
      <p>Total: </p>
    </>
  );
};

export default ServicesDiscount;
