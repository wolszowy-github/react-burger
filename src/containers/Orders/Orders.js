import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

  state = {
    orders: [],
    loading: false
  }

  fetchAllOrders() {
    this.setState({loading: true})
    axios.get('/orders.json')
    .then(response => {
      let fetchedData = []
      for (let key in response.data) {
        fetchedData.push({
          ...response.data[key],
          id: key
        })
      }

      this.setState({
        orders: fetchedData
      }, this.setState({loading: false}))
    })
    .catch(error => {
      this.setState({loading: false})
    })
  }

  componentDidMount() {
    this.fetchAllOrders()
  }

  render () {
    let content = null

    if (this.state.loading) {
      content = <Spinner />
    } else {
    content = this.state.orders
      .map(order => (
        <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={order.price}
          />
      ))
    }

    return (
      content
    )
  }
}

export default withErrorHandler(Orders, axios)