import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'
import { Route } from 'react-router-dom'

class Checkout extends Component {
  
  state = {
    ingredients: {
      meat: 0,
      salad: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 0
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data')
  }

  setCurrentIngredients = (queryIngredients) => {
    this.setState({
      ingredients: queryIngredients
    })
  } 

  getBurgerIngredientsAsParams(){
    let params = new URLSearchParams(this.props.history.location.search)

    let queryIngredients = {}
    
    for(let param of params.entries()) {
      if (param[0] === 'totalPrice') {
        this.setState({totalPrice: +param[1]})
      } else {
        queryIngredients[param[0]] = +param[1]      
      }
    }
    this.setCurrentIngredients(queryIngredients)
  }

  componentDidMount() {
    this.getBurgerIngredientsAsParams()
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.url + '/contact-data'} 
          render={(props) => (
          <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>
        )}></Route> 
      </div>
    )
  }
}

export default Checkout