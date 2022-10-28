import { FC } from 'react';
import { IService, IServicesListProps } from '../../types/apiType';

const ServicesList: FC<IServicesListProps> = ({
  services,
  buttonClickHandler,
}): JSX.Element => {
  return (
    <div>
      {services.map((service: IService) => {
        return (
          <button
            key={service.id}
            id={service.id}
            type="button"
            onClick={buttonClickHandler}
          >
            {service.name}, {service.price} USD
          </button>
        );
      })}
    </div>
  );
};

export default ServicesList;
