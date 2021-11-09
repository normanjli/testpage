import React, {useState} from 'react';
import axios from 'axios';
import Displaycard from '../components/displaycard/Displaycard';
import Search from '../components/search/search';
import Button from '../components/button/Button'


const Drinks = () => {
  const [searchDrinkVal, setSearchDrinkVal] = useState('')
  const [searchIngVal, setSearchIngVal] = useState('')
  const [drink, setDrink] = useState(``)
  let drinkCard =[]
  const [sent, setSent] = useState('')
  const onChangeDrink=(event)=>{
    setSearchDrinkVal(event.target.value)
    setSent(false)
  }
  const onChangeIng=(event)=>{
    setSearchIngVal(event.target.value)
    setSent(false)
  }
  const drinkClick = () =>{
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res =>{
      let {drinks} = res.data
      drinks?setDrink(drinks):setSent(true)
      console.log(drinks)
    })
  }
  const onSubmitDrink = (event)=>{
    event.preventDefault()
    let searchTerm = searchDrinkVal.replace(` `, `+`)
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`).then(res=>{
      let {drinks} = res.data
      drinks?setDrink(drinks):setSent(true)
    }).catch(err=>console.log(err))
  }
  const onSubmitIngredient = (event)=>{
    event.preventDefault()
    let ingredientsArr = searchIngVal.split(`,`)
    if (ingredientsArr.length===1){
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsArr[0].trim()}`)
      .then(res=>{
        let {drinks} = res.data
        drinks?setDrink(drinks):setSent(true)
      }).catch(err=>console.log(err))
    }
    else{
      let drinksArr =[]
      for (let i of ingredientsArr){
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${i.trim()}`)
        .then( res=>{
          let {drinks}=res.data
          if (drinks){
            drinksArr.push(...drinks)
            if (i === ingredientsArr[ingredientsArr.length-1]){
              let ans = []
              drinksArr.forEach((element,index)=>{
                for(let j = index+1; j<drinksArr.length;j++){
                  if(element.strDrink===drinksArr[j].strDrink){
                    ans.push(element)
                  }
                }
                })
            setDrink(ans)
            setSent(false)
            }
          }else{
            setSent(true)
          }
        }).catch(err=>console.log(err))
      }
    };
  }
  const [searchType, setSearchType] = useState(`ingredient`)
  
  
  let drinkSearch =  <Search searchType={searchType} placeholder='Enter a search term' inputValue={searchDrinkVal} onChange={onChangeDrink} onSubmit={onSubmitDrink} sent={sent} key='drinksearch' text={`Search by Drink name`}/>
  let ingredientSearch = <Search searchType={searchType} placeholder='Enter comma separated ingredients' inputValue={searchIngVal} onChange={onChangeIng} onSubmit={onSubmitIngredient} sent={sent} key='ingsearch' text={`Search by Ingredients`}/>
  if(drink!==`` && !drink.includes(undefined)){
    for(let i=0;i<drink.length;i++){
      let key = drink[i].idDrink
      drinkCard.push(<Displaycard drink={drink[i]} key={key}/>)
    }
  }
  return (
    <>
    <div className='searchtypebtn'>
    <Button className='searchbtn' onClick={()=>{
      setSearchType(`drink`);
      setSearchDrinkVal('')
      }} id={`searchdrink`} text={`Search by Drink name`}/>
    <Button className='searchbtn' onClick={()=>{
      setSearchType(`ingredient`);
      setSearchIngVal('')
      }} id={`searchingredient`} text={`Search by Ingredients`}/>
    </div>
    {searchType===`drink`?drinkSearch:ingredientSearch}
    <Button onClick={drinkClick} id={`test`} text={`Find a random Drink`}/>
    <div className='drink-container'>{drinkCard}</div>
    </>
  )
};

export default Drinks;