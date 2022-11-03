import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { fetchServices } from './services/API';
import SelectedServices from './components/SelectedServices';
import ServicesDiscount from './components/ServicesDiscount';
import ServicesList from './components/ServicesList';
import { IPrice, IService } from './types/servicesTypes';
import styles from './styles/App.module.scss';
import SearchServices from './components/SearchServices';

const { container } = styles;

export const App: FC = (): JSX.Element => {
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

  const serviceButtonClickHandler = (
    e: MouseEvent<HTMLButtonElement>
  ): void => {
    const serviceId = (e.target as HTMLButtonElement).id;
    const remainingServices = services.filter(
      service => serviceId !== service.id
    );
    setServices(remainingServices);
    const chosenService = services.find(service => service.id === serviceId);
    if (chosenService) {
      setChosenServices(
        preServices => [...preServices, chosenService] as IService[]
      );
      setPrices(prevPrices => {
        return { ...prevPrices, [chosenService.id]: chosenService.price };
      });
      setShowServicesList(false);
    }
  };

  const inputChangePriceHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value: number = +e.target.value;
    const name: string = e.target.name;

    if (isNaN(value)) {
      alert('Please enter a number');
      return;
    }

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
    const id = (e.currentTarget as HTMLButtonElement).name;
    const remainingServices = chosenServices.filter(
      service => service.id !== id
    );
    const deletedService = chosenServices.filter(service => service.id === id);
    const pricesKey = deletedService[0].id;
    delete prices[pricesKey];
    setServices(prevValue => {
      return [...prevValue, ...deletedService];
    });
    setChosenServices(remainingServices);
  };

  return (
    <div className={container}>
      <SearchServices
        showServicesList={showServicesList}
        setShowServicesList={setShowServicesList}
      />
      {showServicesList && (
        <ul>
          <ServicesList
            services={services}
            buttonClickHandler={serviceButtonClickHandler}
          />
        </ul>
      )}
      {chosenServices.length > 0 && (
        <SelectedServices
          chosenServices={chosenServices}
          inputChangePriceHandler={inputChangePriceHandler}
          inputValue={inputValue}
          deleteButtonClickHandler={deleteButtonClickHandler}
        />
      )}
      <ServicesDiscount chosenServices={chosenServices} prices={prices} />
    </div>
  );
};
