import './App.css';
import axios from 'axios';
import Button from './components/button/Button'
import Search from './components/search/search'
import React, {useState} from 'react'
import Displaycard from './components/displaycard/Displaycard';
//TODO useeffect hook
function App() {
  const [inputValue, setInputValue] = useState('')
  const [drink, setDrink] = useState(``)
  let drinkCard
  const onChange=(event)=>{
    setInputValue(event.target.value)
  }
  const drinkClick = () =>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res =>{
        let {drinks} = res.data
        let item = drinks.pop()
        console.log(item)
        setDrink(item)
    })
  }
  if(drink.length ===0){
  }else{
    drinkCard = <Displaycard drink={drink}/>
  }
  const onSubmit = (event)=>{
    event.preventDefault()
    let searchTerm = inputValue.replace(` `, `+`)
    console.log(searchTerm)
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`).then(res=>{
      let {drinks} = res.data
      let item = drinks[Math.floor(Math.random()*(drinks.length-1))]
      console.log(item)
      setDrink(item)
    })
  }
  return (
    <>
    <Search inputValue={inputValue} onChange={onChange} onSubmit={onSubmit}/>
    <Button onClick={drinkClick} id={`test`} text={`Big Drink button`}/>
    {drinkCard}
    </>
  );
}

export default App;
