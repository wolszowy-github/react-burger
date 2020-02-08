import React from 'react'
import classes from './Toolbar.module.scss'
import Logo from '../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'
import Menu from './Menu/Menu'

const toolbar = (props) => (
  <header className={classes['Toolbar']}>
    <Menu openSideDrawer={props.openSideDrawer} />
    <div className={classes['Logo']}>
      <Logo />
    </div>
    <nav>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar