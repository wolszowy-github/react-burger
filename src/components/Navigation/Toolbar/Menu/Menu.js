import React from 'react'
import classes from './Menu.module.scss'

const menu = (props) => (
  <div className={classes['Menu']}
    onClick={props.openSideDrawer}
  >
    <div className={classes['Line']}></div>
  </div>
)

export default menu