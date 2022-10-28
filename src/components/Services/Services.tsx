import { FC, useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { fetchServices } from '../../services/API';
import { IPrice, IService } from '../../types/apiType';
import SelectedServices from '../SelectedServices';
import ServicesList from '../ServicesList';

const Services: FC = (): JSX.Element => {
  const [services, setServices] = useState<IService[]>([]);
  const [chosenServices, setChosenServices] = useState<IService[]>([]);
  const [inputValue, setInputValue] = useState<IPrice>({});
  const [showServicesList, setShowServicesList] = useState<boolean>(false);

  useEffect(() => {
    async function getServices(): Promise<void> {
      try {
        const result = await fetchServices();
        (result as IService[]).map((service: IService) => {
          const prices = { [service.id]: service.price };
          // return prices;
          return setInputValue(prevState => {
            return {
              ...prevState,
              ...prices,
            };
          });
        });
        setServices(result as IService[]);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    getServices();
  }, []);

  const inputEventsHandler = {
    onFocus: (): void => setShowServicesList(true),
    // onBlur: () => setShowServicesList(false),
    onChange: (e: ChangeEvent<HTMLInputElement>): void => {
      console.log(e.target.value);
      console.log(e.target);
    },
  };

  const buttonClickHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    const serviceId = (e.target as HTMLButtonElement).id;
    const remainingServicess = services.filter(
      service => serviceId !== service.id
    );
    setServices(remainingServicess);
    const chosenService = services.find(service => service.id === serviceId);
    if (chosenService) {
      setChosenServices(
        preServices => [...preServices, chosenService] as IService[]
      );
      setShowServicesList(false);
    }
  };

  const inputChangePriceHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const name = e.target.name;

    setInputValue(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <>
      <p>Add service</p>
      <input
        type="text"
        id="services"
        name="services"
        placeholder="Choose a service"
        {...inputEventsHandler}
      />
      {showServicesList && (
        <ServicesList
          services={services}
          buttonClickHandler={buttonClickHandler}
        />
      )}
      {chosenServices.length > 0 && (
        <SelectedServices
          chosenServices={chosenServices}
          inputChangePriceHandler={inputChangePriceHandler}
          inputValue={inputValue}
        />
      )}
    </>
  );
};

export default Services;
