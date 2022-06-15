import React from 'react'
import './_style.scss'
export default function ModalCounter() {
  const [count, setCount] = React.useState(1);
  const plusHandle =()=> {
    setCount(count + 1)
  }
  const minusHandle =()=> {
    setCount(count - 1)
    if(count === 0){
      setCount(0) 
    }
  }
  return (
    <>
    <div className='counter_block'>
      <div className="counter_flex_box">
      <button onClick={minusHandle}>
        -
      </button>
      <div className="counter_content">{count}</div>
      <button onClick={plusHandle}>
        +
      </button>
      </div>
    </div>
    </>
  )
}
