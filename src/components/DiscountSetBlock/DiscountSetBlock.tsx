import { FC } from 'react';
import styles from '../../styles/DiscountSetBlock.module.scss';
import { IDiscountSetBlock } from '../../types/propTypes';

const {
  inputs__block,
  chooseService__input,
  chooseDiscount__block,
  chooseDiscount__input,
  discount__button__list,
  discount__button__item,
  discount__button,
  active,
} = styles;

const DiscountSetBlock: FC<IDiscountSetBlock> = ({
  discountServiceTitle,
  handleServicesForDiscountInputFocus,
  discountValue,
  handleDiscountValueInputChange,
  handleDiscountTypeClick,
  discountType,
}): JSX.Element => {
  return (
    <div className={inputs__block}>
      <input
        className={chooseService__input}
        type="text"
        id="services-for-discount"
        name="services-for-discount"
        placeholder="Choose a service"
        readOnly
        value={discountServiceTitle}
        onFocus={handleServicesForDiscountInputFocus}
      />
      <div className={chooseDiscount__block}>
        <input
          className={chooseDiscount__input}
          type="text"
          id="discount"
          name="discount"
          value={discountValue}
          onChange={handleDiscountValueInputChange}
        />
        <ul className={discount__button__list}>
          <li className={discount__button__item}>
            <button
              type="button"
              name="USD"
              onClick={handleDiscountTypeClick}
              className={
                discountType === 'USD'
                  ? `${discount__button} ${active}`
                  : discount__button
              }
            >
              $
            </button>
          </li>
          <li className={discount__button__item}>
            <button
              type="button"
              name="%"
              onClick={handleDiscountTypeClick}
              className={
                discountType === '%'
                  ? `${discount__button} ${active}`
                  : discount__button
              }
            >
              %
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DiscountSetBlock;
