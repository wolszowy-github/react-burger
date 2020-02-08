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
    let burgerParams = new URLSearchParams()
    for (let key in this.state.ingredients) {
      burgerParams.set(key, this.state.ingredients[key])
    } 
    return burgerParams
  }
  
  setTotalPriceAsQueryParam = () => {
    let param = new URLSearchParams()
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

    let found = Object.keys(ingrCpy).find(ingr => ingrCpy[ingr] !== 0)
    if(found) {
      this.setState({
        purchasable: true
      })
    } else {
      this.setState({
        purchasable: false
      })
    }
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
    let ingredientsCpy = {...this.state.ingredients} 
    ingredientsCpy[ingrType]++

    let priceCpy = this.state.totalPrice

    let newPrice = Math.round((priceCpy + PRICES[ingrType]) * 100) / 100

    
    this.setState({
      ingredients: ingredientsCpy,
      totalPrice: newPrice
    })

    this.updatePurchaseState(ingredientsCpy)

  }

  deleteIngredientHandler = (ingrType) => {

    let ingredientsCpy = {...this.state.ingredients} 
    let priceCpy = this.state.totalPrice

    let newPrice = null
    if (ingredientsCpy[ingrType] !== 0) {
      ingredientsCpy[ingrType]--
      newPrice = Math.round((priceCpy - PRICES[ingrType]) * 100) / 100
    }

    this.setState(() => {
      if (newPrice !== null) {
        return {
          ingredients: ingredientsCpy,
          totalPrice: newPrice
        }
      } else {
        return {
          ingredients: ingredientsCpy,
        }
      }
    })
    this.updatePurchaseState(ingredientsCpy)
  }

  render () {
    let modalContent = <OrderSummary
            totalPrice={this.state.totalPrice} 
            ingredients={this.state.ingredients}
            modalClose={this.purchaseOffHandler}
            continuePurchase={this.purchaseContinueHandler}
          />

     if(this.state.loading || !this.state.ingredients) {
       modalContent = <Spinner />
     }   
     
     let burger = null

     if(this.state.ingredients === null) {
       burger = <Spinner />
     } else {
       burger = (
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

    return (
      <Fragment>
        {burger}
        <Modal 
          modalState={this.state.purchasing}
          modalClose={this.purchaseOffHandler}
          loading={this.state.loading}
        >
         {modalContent}
        </Modal>
      </Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)