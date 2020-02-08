import React from 'react'
import burgerLogo from '../../assets/burger-logo.png'
import classes from './Logo.module.scss';

const logo = (props) => (
  <div className={classes['Logo']}>
    <img src={burgerLogo} alt="logo"/>
  </div>
)

export default logo