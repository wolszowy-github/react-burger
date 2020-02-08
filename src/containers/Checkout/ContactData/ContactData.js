import React, { Component } from 'react'
import classes from './ContactData.module.scss' 
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          // minLength: 6,
          // maxLength: 6,
          zipCheck: /\d{2}-\d{3}/g
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
          {
            value: 'fastest',
            display_value: 'Fastest'
          },
          {
            value: 'cheapest',
            display_value: 'Cheapest'
          }
        ]
        },
        value: 'fastest',
        touched: false
      },
    },
    formIsValid: false,
    loading: false
  }

  checkValidity(value, rules){
    let isValid = true

    if (rules && rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    // if (rules.minLength) {
    //   isValid = value.length >= rules.minLength && isValid
    // }

    // if (rules.maxLength) {
    //   isValid = value.length <= rules.maxLength && isValid
    // }

    if (rules && rules.zipCheck) {
      isValid = rules.zipCheck.test(value) && isValid
    }

    return isValid
  }

  isFormValid = () => {
    let isValid = true
    for (let key in this.state.orderForm) {
      let orderItem = this.state.orderForm[key]
      if (orderItem.hasOwnProperty('valid') && !orderItem.valid) {
        isValid = false
      } 
    }
    this.setState({
      formIsValid: isValid
    })
  }


  setElementValueHandler = (e, elementName) => {
    let currentElementName = Object.keys(this.state.orderForm).find(el => el === elementName)
    let newOrderForm = { ...this.state.orderForm }
    let newFormElement = {...newOrderForm[currentElementName]}
    newFormElement.value = e.target.value
    newFormElement.valid = this.checkValidity(newFormElement.value, newFormElement.validation)

    if (!this.state.orderForm.touched) {
      newFormElement.touched = true
    }
    newOrderForm[currentElementName] = newFormElement
    this.setState({
      orderForm: newOrderForm
    }, this.isFormValid)
  }

  orderHandler = (e) => {
    e.preventDefault();

    let formData = {}

    for(let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }

    formData.ingredients = this.props.ingredients
    formData.price = this.props.totalPrice
    
    this.setState({
      loading: true
    })

    axios.post('/orders.json', formData)
    .then(response => {
      this.setState({
        loading: false
      }, () => {
        this.props.history.push('/')
      })
    })
    .catch(err => {
      this.setState({
        loading: false
      })
    })


  }

  render() {
    let content = null
    if (this.state.loading) {
      content = <Spinner/>
    } else {
      content = (
        <form onSubmit={this.orderHandler}>
          {Object.keys(this.state.orderForm).map((orderItem, index) => (
            <Input
              key={index}
              touched={this.state.orderForm[orderItem].touched}
              elementType={this.state.orderForm[orderItem].elementType} 
              elementConfig={this.state.orderForm[orderItem].elementConfig} 
              value={this.state.orderForm[orderItem].value}
              valid={this.state.orderForm[orderItem].valid}
              shouldValidate={this.state.orderForm[orderItem].validation}
              setElementValue={(e) => {this.setElementValueHandler(e, orderItem)}} 
            />
          ))}
          <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>  
        </form>
      )
    }
    
    return (
      <div className={classes['ContactData']}>
        <h4>Enter contact data</h4>
        {content}
      </div>
    )
  }
}

export default ContactData