import { FC } from 'react';
import { IService } from '../../types/apiType';

interface IProps {
  services: IService[];
}

const Services: FC<IProps> = ({ services }): JSX.Element => {
  return (
    <>
      <p>Add service</p>
      {services.map((service: IService) => {
        return <p>{service.name}</p>;
      })}

      <label htmlFor="ice-cream-choice">Choose a flavor:</label>
      <input
        list="ice-cream-flavors"
        id="ice-cream-choice"
        name="ice-cream-choice"
      />

      <datalist id="ice-cream-flavors">
        <option value="Chocolate" />
        <option value="Coconut" />
        <option value="Mint" />
        <option value="Strawberry" />
        <option value="Vanilla" />
      </datalist>
    </>
  );
};

export default Services;
