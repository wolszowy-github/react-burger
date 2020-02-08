import React from 'react'
import classes from './NavigationItems.module.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {

  let navigationItems = [
    {
      name: 'Burger Builder',
      link: '/'
    },
    {
      name: 'Orders',
      link: '/orders'
    }
  ]

 return (
    <ul className={[classes['NavigationItems'], props.fromToolbar ? classes['fromToolbar'] : null].join(' ')}>
      {
        navigationItems.map((item, index) => (
          <NavigationItem key={index+item.name} link={item.link}>{item.name}</NavigationItem>
        ))
      }
    </ul>
  )
}

export default navigationItems