import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.scss'
console.log(classes, 'hahah')

const navigationItem = (props) => (
  <li className={classes['NavigationItem']}>
    <NavLink activeClassName={classes['active']} exact to={props.link}>{props.children}</NavLink>
  </li>
)

export default navigationItem