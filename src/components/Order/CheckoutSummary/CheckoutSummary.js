import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.scss'

const checkoutSummary = (props) => {
  return (
    <div className={classes['CheckoutSummary']}>
      <h1>Hope it's tasty!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}></Burger>
        <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
        <Button clicked={props.checkoutContinued} btnType="Success">CONTINUE</Button>
      </div>
    </div>
  )
}

export default checkoutSummary