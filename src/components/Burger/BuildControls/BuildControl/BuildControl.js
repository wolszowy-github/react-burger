import React from 'react'
import classes from './BuildControl.module.scss'

const buildControl = (props) => (
  <div className={classes['BuildControl']}>
    <div className={classes['Label']}>{props.label}</div>
    <button disabled={props.activated === 0} className={classes['Less']} onClick={props.deleteIngr}>Less</button>
    <button className={classes['More']} onClick={props.addIngr}>More</button>
  </div>
)
export default buildControl