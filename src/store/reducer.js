import * as actionTypes from './actionTypes'

const PRICES = {
  meat: 0.7,
  cheese: 0.5,
  salad: 0.1,
  bacon: 0.6,
};

const initalState = {
  ingredients: {
    meat: 0,
    cheese: 0,
    salad: 0,
    bacon: 0,
  },
  totalPrice: 4
};

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.ADD:
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] + 1,
                    },
                    totalPrice: Math.round((state.totalPrice + PRICES[action.ingredient]) * 100) / 100
                }
        case actionTypes.DELETE:
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] - 1,
                    },
                    totalPrice: Math.round((state.totalPrice - PRICES[action.ingredient]) * 100) / 100 
                }                
        default:
            return state
    }   
}

export default reducer