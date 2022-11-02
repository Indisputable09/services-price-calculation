import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import SelectedServices from './components/SelectedServices';
import ServicesDiscount from './components/ServicesDiscount';
import ServicesList from './components/ServicesList';
import { fetchServices } from './services/API';
import { IPrice, IService } from './types/servicesTypes';
import styles from './styles/App.module.scss';
import sprite from './Icons/svg/sprite.svg';

const {
  container,
  services__input,
  services__label,
  services__label__arrowIcon,
  searchServices__block,
  arrow__button,
  active,
} = styles;

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

  const inputEventsHandler = {
    onFocus: (): void => setShowServicesList(true),
  };

  const buttonClickHandler = (e: MouseEvent<HTMLButtonElement>): void => {
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
    // const remainingPrices = delete prices[deletedService[0].id];
    // console.log('remainingPrices', remainingPrices);
    const pricesKey = deletedService[0].id;
    delete prices[pricesKey];
    setServices(prevValue => {
      return [...prevValue, ...deletedService];
    });
    setChosenServices(remainingServices);
  };

  const arrowButtonClickHandler = () => {
    setShowServicesList(!showServicesList);
  };

  return (
    <div className={container}>
      <div className={searchServices__block}>
        <label
          // htmlFor="services"
          className={services__label}
          onClick={arrowButtonClickHandler}
        >
          <svg width={18} height={18}>
            <use
              href={showServicesList ? sprite + '#cross' : sprite + '#plus'}
            ></use>
          </svg>
          Add service
        </label>
        <input
          className={services__input}
          type="text"
          id="services"
          name="services"
          placeholder="Choose a service"
          {...inputEventsHandler}
        />
        {/* <svg className={services__label__arrowIcon}>
          <use href={sprite + '#triangle-down'}></use>
        </svg> */}
        {/* </label> */}
        <button
          name="arrow-button"
          onClick={arrowButtonClickHandler}
          type="button"
          className={arrow__button}
        >
          <svg
            className={
              showServicesList
                ? `${services__label__arrowIcon} ${active}`
                : services__label__arrowIcon
            }
          >
            <use href={sprite + '#triangle-down'}></use>
          </svg>
        </button>
      </div>

      {showServicesList && (
        <ul>
          <ServicesList
            services={services}
            buttonClickHandler={buttonClickHandler}
          />
        </ul>
      )}
      {chosenServices.length > 0 && (
        // <ul>
        <SelectedServices
          chosenServices={chosenServices}
          inputChangePriceHandler={inputChangePriceHandler}
          inputValue={inputValue}
          deleteButtonClickHandler={deleteButtonClickHandler}
        />
        // </ul>
      )}
      {/* <Bill chosenServices={chosenServices} prices={prices} /> */}
      <ServicesDiscount chosenServices={chosenServices} prices={prices} />
    </div>
  );
};
