import React from 'react'
import classes from './Input.module.scss'

const input = (props) => {
  let inputElement = null
  let inputClasses = [classes['InputElement']]

  if (props.touched && !props.valid && props.shouldValidate) {
    inputClasses.push(classes['InputElementInvalid'])
    inputClasses = inputClasses.join(' ')
  }

  switch (props.elementType) {
    case ('select'):
      inputElement = (
        <select className={inputClasses}  value={props.value} onChange={props.setElementValue}>
          {props.elementConfig.options.map(option => {
            return <option key={option.display_value} value={option.value}>{option.display_value}</option>
          })}
        </select>
      )
      break;
    case ('input'):
      inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.setElementValue}  />
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.setElementValue} />
      break;
    default:
      inputElement =  <input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.setElementValue}/>
  }

  return (
  <div className={classes['Input']}>
    <label className={classes['Label']}>{props.label}</label>
    {inputElement}
  </div>
  )
}


export default input;