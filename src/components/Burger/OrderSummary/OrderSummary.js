import React, { Fragment } from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const summary = Object.keys(props.ingredients)
  .map((ingKey, index) => {
    return (
      <li key={ingKey+index}>{ingKey} : {props.ingredients[ingKey]}</li>
    )
  })

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>
        {summary}
      </ul>
      <p>Your order's total price is: {props.totalPrice.toFixed(2)}$</p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.modalClose}>CANCEL</Button>
      <Button btnType='Success' clicked={props.continuePurchase}>CONTINUE</Button>  
    </Fragment>
  )
}

export default orderSummary