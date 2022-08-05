import React from 'react'
import { decrement, increment } from '../../../features/basket/basketSlice'
import { useAppDispatch } from '../../../Store/hooks';

interface ICounter {
  count: number,
  id: number,
}

const Counters = (props: ICounter) => {
  const { count, id } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="cart__modal__product__card__right__count">
      <button
        className="decr"
        type='button'
        onClick={() => dispatch(decrement({ id }))}
        disabled={count < 2}
      >
        -
      </button>
      <span className="cart__modal__product__card__right__count__total">{count}</span>
      <button
        className="incr"
        type='button'
        onClick={() => dispatch(increment({ id }))}
        disabled={count > 99}
      >
        +
      </button>
    </div>
  )
}

export default Counters