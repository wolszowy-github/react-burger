import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.scss'
import PropTypes from 'prop-types'

const burger = (props) => {


let userIngredients = Object.keys(props.ingredients)
    .reduce((arr, ingr) => {      
      let newArr = [...Array(props.ingredients[ingr])]
      .map(() => ingr)

      return arr.concat(newArr)
    }, [])

    .map(ingr => (
    <BurgerIngredient 
      key={ingr + (Math.random() * 100000).toFixed()} 
      type={ingr}/>
    ))

  //MOJE ROZWIĄZANIE
  // userIngredients = Object.keys(props.ingredients)
  // .reduce((arr, ingr) => {
  //   let helperArr = []
  //   for (let i = 0; i < props.ingredients[ingr]; i++) {
  //     helperArr.push(ingr)
  //   }
  //   return arr.concat(helperArr)
  // }, [])
  // .map(ingr => (
  // <BurgerIngredient 
  //   key={ingr + (Math.random() * 100000).toFixed()} 
  //   type={ingr}/>
  // ))

  if(!userIngredients.length) {
    userIngredients = <p>Please add ingredient</p>
  }

  return (
    <div className={classes['Burger']}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {userIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  )
} 

 burger.propTypes = {
   ingredients: PropTypes.object.isRequired
 } 

export default burger