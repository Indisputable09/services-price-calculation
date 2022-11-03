import { FC } from 'react';
import { IServicesForDiscountListProps } from '../../types/propTypes';
import { IService } from '../../types/servicesTypes';
import styles from '../../styles/ServicesForDiscountList.module.scss';

const { serviceForDiscount__button } = styles;

const ServicesForDiscountList: FC<IServicesForDiscountListProps> = ({
  servicesForDiscount,
  handleServiceForDiscountClick,
}): JSX.Element => {
  return (
    <ul>
      {servicesForDiscount.map((service: IService): JSX.Element => {
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
  );
};

export default ServicesForDiscountList;
