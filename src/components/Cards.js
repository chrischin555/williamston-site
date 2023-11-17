import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
      <h1>Community News</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
            <ul className="cards__items">
            <CardItem
              src='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-06/Grimace-mcdonalds-mc-230608-731819.jpg'
              text='Generic News Comment'
              label='Grimace'
              path='/services'
            />
            <CardItem
              src='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-06/Grimace-mcdonalds-mc-230608-731819.jpg'
              text='Grimace Strikes Again'
              label='Grimace'
              path='/services'
            />
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
