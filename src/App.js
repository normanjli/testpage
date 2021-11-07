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
  let drinkCard =[]
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
    })
  }
  console.log(drink)
  if(drink.length === undefined){
    drinkCard.push(<Displaycard drink={drink}/>)
  }else{
    for(let i=0;i<drink.length;i++){
      drinkCard.push(<Displaycard drink={drink[i]}/>)
    }
  }
  return (
    <>
    <Search inputValue={inputValue} onChange={onChange} onSubmit={onSubmit}/>
    <Button onClick={drinkClick} id={`test`} text={`Big Drink button`}/>
    <div className='drink-container'>{drinkCard}</div>
    </>
  );
}

export default App;
