import React, { Fragment, Component } from 'react';
import classes from './Layout.module.scss'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

  state = {
    sideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      sideDrawer: false
    })
  }

  sideDrawerOpenHandler = () => {
    this.setState({
      sideDrawer: true
    })
  }

  render() {
    return  (
      <Fragment>
        <Toolbar 
          openSideDrawer={this.sideDrawerOpenHandler}
        />
        <SideDrawer 
        show={this.state.sideDrawer}
        closeSideDrawer={this.sideDrawerClosedHandler}
        />
        <main className={classes['Content']}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout