import { FC } from 'react';
import { IBillProps, IService } from '../../types/apiType';

const Bill: FC<IBillProps> = ({ chosenServices, prices }): JSX.Element => {
  return (
    <>
      <h2>Bill</h2>
      {chosenServices.map((service: IService) => {
        return (
          <li key={service.id}>
            <p>
              {service.name}{' '}
              <span>{prices[service.id] === 0 ? 0 : prices[service.id]}</span>
            </p>
          </li>
        );
      })}
    </>
  );
};

export default Bill;
