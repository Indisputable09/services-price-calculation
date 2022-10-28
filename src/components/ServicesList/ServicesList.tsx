import { FC } from 'react';
import { IService, IServicesListProps } from '../../types/apiType';

const ServicesList: FC<IServicesListProps> = ({
  services,
  buttonClickHandler,
}): JSX.Element => {
  return (
    <>
      {services.map((service: IService) => {
        return (
          <li key={service.id}>
            <button id={service.id} type="button" onClick={buttonClickHandler}>
              {service.name}, {service.price} USD
            </button>
          </li>
        );
      })}
    </>
  );
};

export default ServicesList;
