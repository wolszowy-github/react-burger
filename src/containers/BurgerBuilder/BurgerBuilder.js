import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  // componentDidMount() {
  //   axios.get('/ingredients.json')
  //   .then(response => {
  //       this.setState({ingredients: response.data})
  //   })
  // }

  purchasable() {
    return Object.values(this.props.ingredients).find((value) => value !== 0);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseOffHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  renderOrderSummary() {
    return this.state.loading || !this.props.ingredients ? (
      <Spinner />
    ) : (
      <OrderSummary
        totalPrice={this.props.totalPrice}
        ingredients={this.props.ingredients}
        modalClose={this.purchaseOffHandler}
        continuePurchase={this.purchaseContinueHandler}
      />
    );
  }

  renderBurger() {
    return this.props.ingredients === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <Burger ingredients={this.props.ingredients}></Burger>
        <BuildControls
          ingredients={this.props.ingredients}
          addIngr={this.props.addIngredient}
          deleteIngr={this.props.deleteIngredient}
          price={this.props.totalPrice}
          purchasable={this.purchasable()}
          purchaseSwitch={this.purchaseHandler}
        />
      </Fragment>
    );
  }

  render() {
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
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredient) => dispatch({type: 'ADD', ingredient}),
    deleteIngredient: (ingredient) => dispatch({type: 'DELETE', ingredient}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))