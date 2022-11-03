import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { IPriceWithDiscount, IService } from '../../types/servicesTypes';
import { IServiceDiscountProps } from '../../types/propTypes';
import Bill from '../Bill';
import DiscountBlock from '../DiscountBlock';
import AddDiscount from '../AddDiscount';
import DiscountSetBlock from '../DiscountSetBlock/DiscountSetBlock';
import ServicesForDiscountList from '../ServicesForDiscountList';
import ApplyDiscount from '../ApplyDiscount';

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

  const handleShowDiscountsBlockClick = (): void => {
    setShowDiscountsBlock(!showDiscountsBlock);
  };

  const handleServicesForDiscountInputFocus = (): void => {
    setShowServicesForDiscount(true);
  };

  const handleDiscountValueInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const value = +(e.target as HTMLInputElement).value;
    if (isNaN(value)) {
      alert('Please enter a number');
      return;
    }
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
    if (prices[discountServiceId] === 0) {
      alert('You cannot apply discount to 0 USD price');
      return;
    } else if (
      (discountType === '%' && discountValue > 100) ||
      (discountType === 'USD' && discountValue > prices[discountServiceId])
    ) {
      alert('Discount cannot be more than 100% of the price');
      return;
    }

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
    setServicesWithDiscount(result);
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
          <AddDiscount
            handleShowDiscountsBlockClick={handleShowDiscountsBlockClick}
            showDiscountsBlock={showDiscountsBlock}
          />
          {servicesWithDiscount.length > 0 && (
            <DiscountBlock
              pricesWithDiscount={servicesWithDiscount}
              getIdToDeleteDiscount={getIdToDeleteDiscount}
            />
          )}
        </>
      )}

      {showDiscountsBlock && (
        <DiscountSetBlock
          discountServiceTitle={discountServiceTitle}
          handleServicesForDiscountInputFocus={
            handleServicesForDiscountInputFocus
          }
          discountValue={discountValue}
          handleDiscountValueInputChange={handleDiscountValueInputChange}
          handleDiscountTypeClick={handleDiscountTypeClick}
          discountType={discountType}
        />
      )}
      {showServicesForDiscount && showDiscountsBlock && (
        <ServicesForDiscountList
          servicesForDiscount={servicesForDiscount}
          handleServiceForDiscountClick={handleServiceForDiscountClick}
        />
      )}
      <ApplyDiscount
        handleApplyClick={handleApplyClick}
        discountType={discountType}
        discountValue={discountValue}
        discountServiceTitle={discountServiceTitle}
        sum={sum}
        totalDiscount={totalDiscount}
      />
    </>
  );
};

export default ServicesDiscount;
