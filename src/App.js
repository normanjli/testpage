import './App.css';
import axios from 'axios';
import Button from './components/button/Button'
import Input from './components/input/input'
import React, {useState} from 'react'
import Displaycard from './components/displaycard/Displaycard';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [drink, setDrink] = useState(``)
  console.log(drink.length)
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
    console.log(`test`)
  }else{
    drinkCard = <Displaycard drink={drink}/>
  }

  return (
    <>
    <Input inputValue={inputValue} onChange={onChange}/>
    <Button onClick={drinkClick} id={`test`} text={`Big Drink button`}/>
    {drinkCard}
    </>
  );
}

export default App;
