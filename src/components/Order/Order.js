import React from 'react'
import classes from './Order.module.scss'

const order = (props) => {
  if( !props.ingredients) {
    return null
  }
  let ingredients = Object.keys(props.ingredients).map(ingredient => {
    return (
    <span key={ingredient}>{ingredient}({props.ingredients[ingredient]})&nbsp;</span>
    )
  })
  return (
    <div className={classes['Order']}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>{props.price}</strong></p>
    </div>
  )
}


export default order