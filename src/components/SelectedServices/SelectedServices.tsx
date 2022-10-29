import { FC } from 'react';
import { ISelectedServicesProps, IService } from '../../types/apiType';

const SelectedServices: FC<ISelectedServicesProps> = ({
  chosenServices,
  inputChangePriceHandler,
  inputValue,
  deleteButtonClickHandler,
}): JSX.Element => {
  return (
    <>
      {chosenServices.map((service: IService) => {
        return (
          <li key={service.id}>
            <button
              onClick={deleteButtonClickHandler}
              type="button"
              name={service.id}
            >
              Delete
            </button>
            <p>
              {service.name}
              <span>Price, USD</span>
              <input
                name={service.id}
                type="number"
                value={
                  inputValue[service.id] === 0 ? '' : inputValue[service.id]
                }
                onChange={inputChangePriceHandler}
              />
            </p>
          </li>
        );
      })}
    </>
  );
};

export default SelectedServices;
