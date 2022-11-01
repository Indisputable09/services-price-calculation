import { FC } from 'react';
import { ISelectedServicesProps, IService } from '../../types/apiType';
import styles from '../../styles/SelectedServices.module.scss';
import sprite from '../../Icons/svg/sprite.svg';

const {
  services__text,
  chosenServices__block,
  chosenServices__item,
  chosenServices__item__input,
  chosenServices__item__serviceName,
  chosenServices__item__block,
  chosenServices__item__deleteButton,
  chosenServices__item__deleteButtonIcon,
} = styles;

const SelectedServices: FC<ISelectedServicesProps> = ({
  chosenServices,
  inputChangePriceHandler,
  inputValue,
  deleteButtonClickHandler,
}): JSX.Element => {
  return (
    <div className={chosenServices__block}>
      <p className={services__text}>Client's services</p>
      {chosenServices.map((service: IService) => {
        return (
          <li key={service.id} className={chosenServices__item}>
            <div className={chosenServices__item__block}>
              <button
                onClick={deleteButtonClickHandler}
                type="button"
                name={service.id}
                className={chosenServices__item__deleteButton}
              >
                <svg className={chosenServices__item__deleteButtonIcon}>
                  <use href={sprite + '#cross'}></use>
                </svg>
              </button>
              <p className={chosenServices__item__serviceName}>
                {service.name}
              </p>
            </div>

            <div className={chosenServices__item__block}>
              <p>Price, USD</p>
              <input
                className={chosenServices__item__input}
                name={service.id}
                type="number"
                value={
                  inputValue[service.id] === 0 ? '' : inputValue[service.id]
                }
                onChange={inputChangePriceHandler}
              />
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default SelectedServices;