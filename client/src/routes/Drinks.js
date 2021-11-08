import React, {useState} from 'react';
import axios from 'axios';
import Displaycard from '../components/displaycard/Displaycard';
import Search from '../components/search/search';
import Button from '../components/button/Button'

const Drinks = () => {
    const [inputValue, setInputValue] = useState('')
    const [drink, setDrink] = useState(``)
    let drinkCard =[]
    let message = ``
    const onChange=(event)=>{
      setInputValue(event.target.value)
    }
    const drinkClick = () =>{
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then(res =>{
          let {drinks} = res.data
          let item = drinks.pop()
          setDrink(item)
      })
    }
    const onSubmit = (event)=>{
      event.preventDefault()
      let searchTerm = inputValue.replace(` `, `+`)
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`).then(res=>{
        let {drinks} = res.data
        setDrink(drinks)
      }).catch(err=>console.log(err))
    }
    if(drink===null){
      message = `${inputValue} did not return any results try gin and tonic`
    }
    else if(drink.length === undefined){
      drinkCard.push(<Displaycard drink={drink}/>)
    }else{
      for(let i=0;i<drink.length;i++){
        drinkCard.push(<Displaycard drink={drink[i]}/>)
      }
    }
    return (
      <>
      <Search inputValue={drink===null?message:inputValue} onChange={onChange} onSubmit={onSubmit}/>
      <Button onClick={drinkClick} id={`test`} text={`Big Drink button`}/>
      <div className='drink-container'>{drinkCard}</div>
      </>
    )
};

export default Drinks;