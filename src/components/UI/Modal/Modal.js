import React, { Fragment, Component } from 'react'
import classes from './Modal.module.scss'
import Backdrop from '../Backdrop/Backdrop' 

class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    if((nextProps.modalState !== this.props.modalState) || (nextProps.children !== this.props.children)) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <Fragment>
        <Backdrop close={this.props.modalClose} show={this.props.modalState} />
        <div style={{
          transform: this.props.modalState ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.modalState ? '1' : '0'
        }} className={classes['Modal']}>{this.props.children}</div>
      </Fragment>
    )
  }
}

export default Modal