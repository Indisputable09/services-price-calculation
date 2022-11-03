import { FC } from 'react';
import styles from '../../styles/SearchServices.module.scss';
import sprite from '../../Icons/svg/sprite.svg';
import { ISearchServicesProps } from '../../types/propTypes';

const {
  services__input,
  services__label,
  services__label__arrowIcon,
  searchServices__block,
  arrow__button,
  active,
} = styles;

const SearchServices: FC<ISearchServicesProps> = ({
  showServicesList,
  setShowServicesList,
}): JSX.Element => {
  const inputEventsHandler = {
    onFocus: (): void => setShowServicesList(true),
  };

  const arrowButtonClickHandler = (): void => {
    setShowServicesList(!showServicesList);
  };
  return (
    <div className={searchServices__block}>
      <label className={services__label} onClick={arrowButtonClickHandler}>
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
  );
};

export default SearchServices;
