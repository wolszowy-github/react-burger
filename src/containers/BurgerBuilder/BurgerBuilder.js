import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const PRICES = {
  meat: 0.7,
  cheese: 0.5,
  salad: 0.1,
  bacon: 0.6
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    totalPrice: 4,
    loading: false
  }

  setBurgerIngredientsAsParams = () => {
    const burgerParams = new URLSearchParams()
    for (const key in this.state.ingredients) {
      burgerParams.set(key, this.state.ingredients[key])
    } 
    return burgerParams
  }
  
  setTotalPriceAsQueryParam = () => {
    const param = new URLSearchParams()
    param.set('totalPrice', this.state.totalPrice)
    return param
  }

  componentDidMount() {
    axios.get('/ingredients.json')
    .then(response => {
        this.setState({ingredients: response.data})
    })
  }

  updatePurchaseState (ingrCpy) {
    const isPurchaseble = Object.values(ingrCpy)
    .find(value => value !== 0)

    this.setState({
      purchasable: !!isPurchaseble,
    });
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseOffHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {    
    this.props.history.push({
      pathname: '/checkout',
      search: `?${this.setBurgerIngredientsAsParams()}&${this.setTotalPriceAsQueryParam()}`
    })
  }

  addIngredientHandler = (ingrType) => {
    const ingredientsCpy = {...this.state.ingredients} 
    ingredientsCpy[ingrType]++

    this.setState({
      ingredients: ingredientsCpy,
      totalPrice: Math.round((this.state.totalPrice + PRICES[ingrType]) * 100) / 100
    })

    this.updatePurchaseState(ingredientsCpy)
  }

  deleteIngredientHandler = (ingrType) => {
    const ingredientsCpy = {...this.state.ingredients} 
    let newPrice = null
    let setValues = {
      ingredients: ingredientsCpy
    }

    if (ingredientsCpy[ingrType] !== 0) {
      ingredientsCpy[ingrType]--
      newPrice = Math.round((this.state.totalPrice - PRICES[ingrType]) * 100) / 100
    }

    if (newPrice !== null) {
      setValues.totalPrice = newPrice
    }

    this.setState(() => setValues)
    this.updatePurchaseState(ingredientsCpy)
  }

  renderOrderSummary() {
    return this.state.loading || !this.state.ingredients ? (
      <Spinner />
    ) : (
      <OrderSummary
        totalPrice={this.state.totalPrice}
        ingredients={this.state.ingredients}
        modalClose={this.purchaseOffHandler}
        continuePurchase={this.purchaseContinueHandler}
      />
    );
  }

  renderBurger() {
    return this.state.ingredients === null ? (
      <Spinner />
    ): (
      <Fragment>
           <Burger ingredients={this.state.ingredients}></Burger>
           <BuildControls 
             ingredients={this.state.ingredients}
             addIngr={this.addIngredientHandler}
             deleteIngr={this.deleteIngredientHandler}
             price={this.state.totalPrice}
             purchasable={this.state.purchasable}
             purchaseSwitch={this.purchaseHandler} 
             />
        </Fragment>
    )
  }

  render () {
    return (
      <Fragment>
        {this.renderBurger()}
        <Modal 
          modalState={this.state.purchasing}
          modalClose={this.purchaseOffHandler}
          loading={this.state.loading}
        >
         {this.renderOrderSummary()}
        </Modal>
      </Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)