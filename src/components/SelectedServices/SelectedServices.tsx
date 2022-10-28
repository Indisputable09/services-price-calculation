import { FC } from 'react';
import { ISelectedServicesProps, IService } from '../../types/apiType';

const SelectedServices: FC<ISelectedServicesProps> = ({
  chosenServices,
  inputChangePriceHandler,
  inputValue,
}): JSX.Element => {
  return (
    <>
      {chosenServices.map((service: IService) => {
        return (
          <p key={service.id}>
            {service.name}
            <span>Price, USD</span>
            <input
              name={service.id}
              type="number"
              value={inputValue[service.id]}
              onChange={inputChangePriceHandler}
            />
          </p>
        );
      })}
    </>
  );
};

export default SelectedServices;
