import React, { Fragment } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

  return (
    <Fragment>
      <Backdrop 
        close={props.closeSideDrawer}
        show={props.show}
      />
      <div className={[classes['SideDrawer'], props.show ? classes['Open'] : classes['Close']].join(' ')}>
        <div className={classes['Logo']}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  )
}

export default sideDrawer