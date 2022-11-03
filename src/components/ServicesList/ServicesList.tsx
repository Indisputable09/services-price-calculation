import { FC } from 'react';
import { IService } from '../../types/servicesTypes';
import { IServicesListProps } from '../../types/propTypes';
import styles from '../../styles/ServicesList.module.scss';

const { servicesList__button } = styles;

const ServicesList: FC<IServicesListProps> = ({
  services,
  buttonClickHandler,
}): JSX.Element => {
  return (
    <>
      {services &&
        services
          .sort((a: IService, b: IService) => b.price - a.price)
          .map((service: IService): JSX.Element => {
            return (
              <li key={service.id}>
                <button
                  className={servicesList__button}
                  id={service.id}
                  type="button"
                  name="service-list-button"
                  onClick={buttonClickHandler}
                >
                  {service.name}, {service.price} USD
                </button>
              </li>
            );
          })}
    </>
  );
};

export default ServicesList;
