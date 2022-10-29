import { FC, useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { fetchServices } from '../../services/API';
import { IPrice, IService } from '../../types/apiType';
import SelectedServices from '../SelectedServices';
import ServicesDiscount from '../ServicesDiscount';
import ServicesList from '../ServicesList';

const Services: FC = (): JSX.Element => {
  const [services, setServices] = useState<IService[]>([]);
  const [chosenServices, setChosenServices] = useState<IService[]>([]);
  const [inputValue, setInputValue] = useState<IPrice>({});
  const [showServicesList, setShowServicesList] = useState<boolean>(false);
  const [prices, setPrices] = useState<IPrice>({});

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
      // {1(id): 92(price) }
      setPrices(prevPrices => {
        return { ...prevPrices, [chosenService.id]: chosenService.price };
      });
      setShowServicesList(false);
    }
  };

  const inputChangePriceHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value: number = +e.target.value;
    const name: string = e.target.name;

    // const neededService = chosenServices.find(service => {
    //   return service.id === name;
    // });

    setPrices(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    setInputValue(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const deleteButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLButtonElement).name;
    const remainingServices = chosenServices.filter(
      service => service.id !== id
    );
    const deletedService = chosenServices.filter(service => service.id === id);
    // const remainingPrices = delete prices[deletedService[0].id];
    // console.log('remainingPrices', remainingPrices);
    const pricesKey = deletedService[0].id;
    delete prices[pricesKey];
    setServices(prevValue => {
      return [...prevValue, ...deletedService];
    });
    setChosenServices(remainingServices);
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
        <ul>
          <ServicesList
            services={services}
            buttonClickHandler={buttonClickHandler}
          />
        </ul>
      )}
      {chosenServices.length > 0 && (
        <ul>
          <SelectedServices
            chosenServices={chosenServices}
            inputChangePriceHandler={inputChangePriceHandler}
            inputValue={inputValue}
            deleteButtonClickHandler={deleteButtonClickHandler}
          />
        </ul>
      )}
      {/* <Bill chosenServices={chosenServices} prices={prices} /> */}
      <ServicesDiscount chosenServices={chosenServices} prices={prices} />
    </>
  );
};

export default Services;
