import './App.css';
import Button from './components/button/Button'
import Input from './components/input/input'
import React, {useState} from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const onChange = (event) =>{
    setInputValue(event.target.value)
  }
  const onClick = (event) =>{
    console.log(inputValue)
  }
    let array = []
    for(let i = 0;i<=4;i++){
      array.push(<Button onClick={onClick} key={i} id={`test${+i}`}/>)
    }

  return (
    <>
    <div id='scring' style={{display: 'flex', backgroundColor:'blue',justifyContent:'space-around'}}>{array}</div>
    <Input inputValue={inputValue} onChange={onChange}/>
    </>
  );
}

export default App;
