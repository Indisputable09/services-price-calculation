import { FC } from 'react';
import { IApplyDiscount } from '../../types/propTypes';
import styles from '../../styles/ApplyDiscount.module.scss';

const { apply__button, totalWithoutDiscount } = styles;

const ApplyDiscount: FC<IApplyDiscount> = ({
  handleApplyClick,
  discountType,
  discountValue,
  discountServiceTitle,
  sum,
  totalDiscount,
}): JSX.Element => {
  return (
    <>
      <button
        type="button"
        onClick={handleApplyClick}
        className={apply__button}
        disabled={!discountType || !discountValue || !discountServiceTitle}
      >
        Apply discount
      </button>
      <p className={totalWithoutDiscount}>Without discount: {sum} USD</p>
      <p>
        Total with discount: {totalDiscount > sum ? 0 : sum - totalDiscount} USD
      </p>
    </>
  );
};

export default ApplyDiscount;
