import React, { Component, Fragment } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    
    constructor() {
      super()

      this.state = {
        error: null
      }

      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      })

      this.responseInterceptor = axios.interceptors.response.use(resp => resp,
      err => {
        this.setState({error: err})
        return Promise.reject(err)
      })
    }

    closeErrorModal = () => {
      this.setState({error: null})
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.response.eject(this.responseInterceptor)
    }


    render() {
      return (
        <Fragment>
          <Modal modalClose={this.closeErrorModal} modalState={this.state.error}>{this.state.error ? this.state.error.message : null}</Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      )
    }
  }
}

export default withErrorHandler