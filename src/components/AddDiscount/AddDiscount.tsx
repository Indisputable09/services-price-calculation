import { FC } from 'react';
import { IAddDiscountProps } from '../../types/propTypes';
import styles from '../../styles/AddDiscount.module.scss';
import sprite from '../../Icons/svg/sprite.svg';

const { addDiscount__label } = styles;

const AddDiscount: FC<IAddDiscountProps> = ({
  handleShowDiscountsBlockClick,
  showDiscountsBlock,
}): JSX.Element => {
  return (
    <label
      onClick={handleShowDiscountsBlockClick}
      className={addDiscount__label}
    >
      <svg width={18} height={18}>
        <use
          href={showDiscountsBlock ? sprite + '#cross' : sprite + '#plus'}
        ></use>
      </svg>
      Add Discount
    </label>
  );
};

export default AddDiscount;
