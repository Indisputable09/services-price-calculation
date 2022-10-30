import { FC } from 'react';
import { IBillProps, IPriceWithDiscount, IService } from '../../types/apiType';

const Bill: FC<IBillProps> = ({
  chosenServices,
  prices,
  servicesWithDiscount,
  // getPriceForTotal,
}): JSX.Element => {
  // const [pricesWithDiscount, setPricesWithDiscount] =
  //   useState<IPriceWithDiscount>({});
  // const [test, setTest] = useState<boolean>(false);

  // useEffect(() => {
  //   if (pricesWithDiscount) {
  //     getPriceForTotal(pricesWithDiscount);
  //   }
  // }, [getPriceForTotal, pricesWithDiscount]);

  // const handleDiscountsSet = (
  //   { id }: IService,
  //   { discountValue, discount_type, name }: IPriceWithDiscount
  // ) => {
  //   const resultWithPercent =
  //     Number(prices[id]) - (Number(prices[id]) * Number(discountValue)) / 100;
  //   const resultWithCurrency = Number(prices[id]) - Number(discountValue);
  //   // const percentDiscount = `${discount_type}(${
  //   //   (Number(prices[id]) * Number(discountValue)) / 100
  //   // } USD) = ${resultWithPercent.toFixed(2)}`;
  //   // const currencyDiscount = `= ${resultWithCurrency.toFixed(2)}`;

  //   switch (discount_type) {
  //     case '%':
  //       console.log('%');
  //       setPricesWithDiscount(prevState => {
  //         return { ...prevState, [id]: resultWithPercent };
  //       });
  //       break;
  //     default:
  //       console.log('USD');
  //       setPricesWithDiscount(prevState => {
  //         return { ...prevState, [id]: resultWithCurrency };
  //       });
  //   }
  // };

  const handleDiscountCount = (
    { id }: IService,
    { discountValue, discount_type, name }: IPriceWithDiscount
  ): JSX.Element => {
    const resultWithPercent =
      Number(prices[id]) - (Number(prices[id]) * Number(discountValue)) / 100;
    const resultWithCurrency = Number(prices[id]) - Number(discountValue);
    const percentDiscount = `${discount_type}(${
      (Number(prices[id]) * Number(discountValue)) / 100
    } USD) = ${resultWithPercent.toFixed(2)}`;
    const currencyDiscount = `= ${resultWithCurrency.toFixed(2)}`;

    // switch (discount_type) {
    //   case '%':
    //     setPricesWithDiscount(prevState => {
    //       return { ...prevState, [id]: resultWithPercent };
    //     });
    //     break;
    //   default:
    //     setPricesWithDiscount(prevState => {
    //       return { ...prevState, [id]: resultWithCurrency };
    //     });
    // }

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
              {servicesWithDiscount &&
                servicesWithDiscount
                  .filter(item => item.id === service.id)
                  .map(item => {
                    // handleDiscountsSet(service, item);
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

// if (discount_type === '%') {
//   setPricesWithDiscount(prevState => {
//     return { ...prevState, [id]: resultWithPercent };
//   });
// } else {
//   setPricesWithDiscount(prevState => {
//     return { ...prevState, [id]: resultWithCurrency };
//   });
// }
// switch (discount_type) {
//   case '%':
// setPricesWithDiscount(prevState => {
//   return { ...prevState, [id]: resultWithPercent };
// });
//     break;
//   default:
// setPricesWithDiscount(prevState => {
//   return { ...prevState, [id]: resultWithCurrency };
// });
// }

/*
if (discount_type === '%') {
    } else if (discount_type === 'USD') {
      return currencyDiscount;
    } */
