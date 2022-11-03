import { FC, MouseEvent } from 'react';
import { IDiscountBlockProps } from '../../types/propTypes';
import sprite from '../../Icons/svg/sprite.svg';
import styles from '../../styles/DiscountBlock.module.scss';

const {
  services__item__deleteButton,
  services__item__deleteButtonIcon,
  service__item__block,
  discounts__block,
  discounts__text,
  discounts__title,
} = styles;

const DiscountBlock: FC<IDiscountBlockProps> = ({
  pricesWithDiscount,
  getIdToDeleteDiscount,
}): JSX.Element => {
  const deleteDiscountHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const id = (e.currentTarget as HTMLButtonElement).name;
    getIdToDeleteDiscount(id);
  };

  return (
    <div className={discounts__block}>
      <h4 className={discounts__title}>Discount</h4>
      <ul>
        {pricesWithDiscount &&
          pricesWithDiscount.map((item): JSX.Element => {
            return (
              <li key={item.name} className={service__item__block}>
                <button
                  type="button"
                  name={String(item.id)}
                  onClick={deleteDiscountHandler}
                  className={services__item__deleteButton}
                >
                  <svg className={services__item__deleteButtonIcon}>
                    <use href={sprite + '#cross'}></use>
                  </svg>
                </button>
                <p className={discounts__text}>
                  {item.name} {item.discountValue} {item.discount_type}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DiscountBlock;
