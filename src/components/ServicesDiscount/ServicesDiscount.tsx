import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { IPriceWithDiscount, IService } from '../../types/servicesTypes';
import { IServiceDiscountProps } from '../../types/propTypes';
import Bill from '../Bill';
import DiscountBlock from '../DiscountBlock';
import styles from '../../styles/ServicesDiscount.module.scss';

const {
  inputs__block,
  chooseService__input,
  chooseDiscount__input,
  chooseDiscount__block,
  discount__button,
  discount__button__list,
  discount__button__item,
  serviceForDiscount__button,
  apply__button,
  totalWithoutDiscount,
  active,
} = styles;

const ServicesDiscount: FC<IServiceDiscountProps> = ({
  chosenServices,
  prices,
}): JSX.Element => {
  const [sum, setSum] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
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
  const [deleteDiscountId, setDeleteDiscountId] = useState<string>('');
  // console.log('discountServiceId', discountServiceId);
  // console.log('servicesForDiscount', servicesForDiscount);

  useEffect(() => {
    const values = Object.values(prices);
    const result = values.reduce((acc, value) => {
      return (acc += value);
    }, 0);
    setSum(result);
  }, [prices, chosenServices]);

  useEffect(() => {
    const servicesForDiscountList = chosenServices.filter(service => {
      const [serviceToRemove] = servicesWithDiscount.filter(item => {
        return item.name === service.name;
      });
      if (!serviceToRemove) {
        return chosenServices;
      }
      return service.name !== serviceToRemove.name;
    });
    setServicesForDiscount(servicesForDiscountList);
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
    const value = +(e.target as HTMLInputElement).value;
    if (isNaN(value)) {
      alert('Please enter a number');
      return;
    }
    // console.log('discountType ', discountType);
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
    // (e.target as HTMLButtonElement).classList.add('active');
    setDiscountType((e.target as HTMLButtonElement).name);
  };

  const handleApplyClick = (): void => {
    const chosenServiceForDiscount = servicesForDiscount.find(
      service => service.id === discountServiceId
    );

    // if (chosenServiceForDiscount) {
    if (
      (discountType === '%' && discountValue > 100) ||
      (discountType === 'USD' &&
        discountValue > chosenServiceForDiscount!.price)
    ) {
      alert('Discount cannot be more than 100% of price');
      return;
    }
    // }
    console.log('chosenServiceForDiscount', chosenServiceForDiscount);
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

  const getPriceForTotalDiscount = (res: number): void => {
    setTotalDiscount(res);
  };

  const getIdToDeleteDiscount = (res: string): void => {
    setDeleteDiscountId(res);
    const result = servicesWithDiscount.filter(service => {
      return service.id !== res;
    });
    // console.log('result', result);
    setServicesWithDiscount(result);
    // setDeleteDiscountId('');
  };

  const resetDeleteDiscountId = () => {
    setDeleteDiscountId('');
  };

  return (
    <>
      {chosenServices.length > 0 && (
        <>
          <Bill
            chosenServices={chosenServices}
            prices={prices}
            servicesForDiscount={servicesWithDiscount}
            getPriceForTotalDiscount={getPriceForTotalDiscount}
            deleteDiscountId={deleteDiscountId}
            resetDeleteDiscountId={resetDeleteDiscountId}
          />
          <label onClick={handleShowDiscountBlockClick}>Add Discount</label>
          {servicesWithDiscount.length > 0 && (
            <DiscountBlock
              pricesWithDiscount={servicesWithDiscount}
              getIdToDeleteDiscount={getIdToDeleteDiscount}
            />
          )}
        </>
      )}

      {showDiscountsBlock && (
        <div className={inputs__block}>
          <input
            className={chooseService__input}
            type="text"
            id="services-for-discount"
            name="services-for-discount"
            placeholder="Choose a service"
            readOnly
            value={discountServiceTitle}
            {...inputEventsHandler}
          />
          {/* )} */}
          <div className={chooseDiscount__block}>
            <input
              className={chooseDiscount__input}
              type="text"
              id="discount"
              name="discount"
              placeholder="0"
              max="99"
              value={discountValue}
              onChange={handleInputChange}
            />
            <ul className={discount__button__list}>
              <li className={discount__button__item}>
                <button
                  type="button"
                  name="USD"
                  onClick={handleDiscountTypeClick}
                  className={
                    discountType === 'USD'
                      ? `${discount__button} ${active}`
                      : discount__button
                  }
                >
                  $
                </button>
              </li>
              <li className={discount__button__item}>
                <button
                  type="button"
                  name="%"
                  onClick={handleDiscountTypeClick}
                  className={
                    discountType === '%'
                      ? `${discount__button} ${active}`
                      : discount__button
                  }
                >
                  %
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {showServicesForDiscount && showDiscountsBlock && (
        <ul>
          {servicesForDiscount.map((service: IService) => {
            return (
              <li key={service.id}>
                <button
                  className={serviceForDiscount__button}
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

      <button
        type="button"
        onClick={handleApplyClick}
        className={apply__button}
        disabled={!discountType || !discountValue || !discountServiceTitle}
      >
        Apply discount
      </button>
      <p className={totalWithoutDiscount}>Without discount: {sum} USD</p>
      <p>Total with discount: {sum - totalDiscount} USD</p>
    </>
  );
};

export default ServicesDiscount;
