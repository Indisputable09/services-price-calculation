import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import {
  IPriceWithDiscount,
  IService,
  IServiceDiscountProps,
} from '../../types/apiType';
import Bill from '../Bill';
import DiscountBlock from '../DiscountBlock';
// import ServicesList from '../ServicesList';

const ServicesDiscount: FC<IServiceDiscountProps> = ({
  chosenServices,
  prices,
}): JSX.Element => {
  const [sum, setSum] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [showDiscountsBlock, setShowDiscountsBlock] = useState<boolean>(false);
  const [servicesForDiscount, setServicesForDiscount] = useState<IService[]>(
    []
  );
  const [showServicesForDiscount, setShowServicesForDiscount] =
    useState<boolean>(false);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountServiceTitle, setDiscountServiceTitle] = useState<string>('');
  const [discountServiceId, setDiscountServiceId] = useState<string>('');
  const [discountType, setDiscountType] = useState<string>('');
  const [servicesWithDiscount, setServicesWithDiscount] = useState<
    IPriceWithDiscount[]
  >([]);

  useEffect(() => {
    const values = Object.values(prices);
    const result = values.reduce((acc, value) => {
      return (acc += value);
    }, 0);
    setSum(result);
  }, [prices, chosenServices]);

  useEffect(() => {
    const test = chosenServices.filter(service => {
      const [serviceToRemove] = servicesWithDiscount.filter(item => {
        return item.name === service.name;
      });
      if (!serviceToRemove) {
        return chosenServices;
      }
      return service.name !== serviceToRemove.name;
    });
    setServicesForDiscount(test);
  }, [chosenServices, servicesWithDiscount]);

  const handleShowDiscountBlockClick = (): void => {
    setShowDiscountsBlock(!showDiscountsBlock);
  };

  const inputEventsHandler = {
    onFocus: (): void => setShowServicesForDiscount(true),
    // onBlur: (): void => setShowServicesForDiscount(false),
    // onChange: (e: ChangeEvent<HTMLInputElement>): void => {
    //   console.log(e.target.value);
    //   console.log(e.target);
    // },
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDiscountValue(+(e.target as HTMLInputElement).value);
  };

  const handleServiceForDiscountClick = (
    e: MouseEvent<HTMLButtonElement>
  ): void => {
    setDiscountServiceTitle((e.target as HTMLButtonElement).name);
    setDiscountServiceId((e.target as HTMLButtonElement).id);
    setShowServicesForDiscount(false);
  };

  const handleDiscountTypeClick = (e: MouseEvent<HTMLButtonElement>): void => {
    setDiscountType((e.target as HTMLButtonElement).name);
  };

  const handleApplyClick = (): void => {
    setServicesWithDiscount(prevState => {
      return [
        ...prevState,
        {
          discountValue,
          discount_type: discountType,
          name: discountServiceTitle,
          id: discountServiceId,
        },
      ];
    });
    setDiscountServiceTitle('');
    setDiscountServiceId('');
    setDiscountValue(0);
    setDiscountType('');
  };

  const getPriceForTotal = (res: number): void => {
    setTotal(res);
  };

  return (
    <>
      {chosenServices.length > 0 && (
        <>
          <Bill
            chosenServices={chosenServices}
            prices={prices}
            servicesForDiscount={servicesWithDiscount}
            getPriceForTotal={getPriceForTotal}
          />
          <h2>Add Discount</h2>
          {servicesWithDiscount.length > 0 && (
            <DiscountBlock pricesWithDiscount={servicesWithDiscount} />
          )}
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
          readOnly
          value={discountServiceTitle}
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
        <button type="button" name="USD" onClick={handleDiscountTypeClick}>
          USD
        </button>
        <button type="button" name="%" onClick={handleDiscountTypeClick}>
          %
        </button>
        <b>{discountType}</b>
      </div>
      {showServicesForDiscount && (
        <ul>
          {servicesForDiscount.map((service: IService) => {
            return (
              <li key={service.id}>
                <button
                  onClick={handleServiceForDiscountClick}
                  type="button"
                  name={service.name}
                  id={service.id}
                >
                  {service.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" onClick={handleApplyClick}>
        Apply discount
      </button>
      <p>Sum: {sum}</p>
      <p>Total: {total}</p>
    </>
  );
};

export default ServicesDiscount;
