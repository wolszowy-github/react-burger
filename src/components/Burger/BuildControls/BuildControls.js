import React from 'react'
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}  
]

const buildControls = (props) => (
  <div className={classes['BuildControls']}>
    <p>Current price: {props.price.toFixed(2)}$</p>
    {controls.map((ingr, index) => (
      <BuildControl
        activated={props.ingredients[ingr.type]} 
        label={ingr.label}
        addIngr={props.addIngr.bind(this, ingr.type)}
        deleteIngr={props.deleteIngr.bind(this, ingr.type)}
        key={ingr.type+index}
      />
    ))}
    <button 
      disabled={!props.purchasable} 
      className={classes['OrderButton']}
      onClick={props.purchaseSwitch}
      >
        ORDER NOW
      </button>
  </div>
)
export default buildControls