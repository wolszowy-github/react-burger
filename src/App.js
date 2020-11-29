import React, { Component, Fragment } from 'react';
import  { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import reducer from './store/reducer'

const store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Layout>
              <Switch>
                <Route path="/checkout" component={Checkout}></Route>
                <Route path="/orders" component={Orders}></Route>
                <Route path="/" component={BurgerBuilder}></Route>
              </Switch>
            </Layout>
          </Fragment>
        </BrowserRouter>
      </Provider>  
    );
  }
}

export default App;
