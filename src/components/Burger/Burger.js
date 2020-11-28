import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.scss'
import PropTypes from 'prop-types'

const burger = (props) => {

  let userIngredients = Object.keys(props.ingredients)
    .reduce((arr, ingr) => {
      
      //Here an array of empty values in number of single ingredient value is created        
      let newArr = [...Array(props.ingredients[ingr])]

      //Later it is mapped to replace the emplty values with ingredient key name strings
      .map(() => ingr)

      return arr.concat(newArr)
    }, [])

    .map(ingr => (
    <BurgerIngredient 
      key={ingr + (Math.random() * 100000).toFixed()} 
      type={ingr}/>
    ))

  return (
    <div className={classes["Burger"]}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {userIngredients.length ? userIngredients : <p>Please add ingredient</p>}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
} 

 burger.propTypes = {
   ingredients: PropTypes.object.isRequired
 } 

export default burger