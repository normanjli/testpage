import React, {useState} from 'react';
import axios from 'axios';
import Displaycard from '../components/displaycard/Displaycard';
import Search from '../components/search/search';
import Button from '../components/button/Button'


const Drinks = () => {
  const [searchDrinkVal, setSearchDrinkVal] = useState('')
  const [searchIngVal, setSearchIngVal] = useState('')
  const [drinkArr, setDrink] = useState(``)
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
  const onSubmitIngredient = async (event)=>{
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
      let ans = []
      for (let i of ingredientsArr){
        let searchTerm = i.trim().replace(` `,`+`)
        var res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
        let {drinks}=res.data
        if (drinks){
          drinksArr.push(...drinks)
        }else{
          setSent(true)
        }
      }
      let drinkDict ={}
      for (let currentDrink of drinksArr){
        if (drinkDict[currentDrink.idDrink]===undefined){
          drinkDict[currentDrink.idDrink] = [currentDrink,1]
        }else{
          let a , count
          [a, count] = drinkDict[currentDrink.idDrink]
          drinkDict[currentDrink.idDrink] = [a,++count]
        }
      }
      var drinksObjArr = Object.keys(drinkDict)
        .map(function(i) {
        return [+i, drinkDict[i]];
      });
      drinksObjArr.sort((firstDrink, secondDrink)=>secondDrink[1][1]-firstDrink[1][1])
      .filter(drink => drink[1][1]>1)
      .forEach(drink=>ans.push(drink[1][0]))
      ans?setDrink(ans):setSent(true)
    };
  }
  const [searchType, setSearchType] = useState(`ingredient`)
  
  
  let drinkSearch =  <Search searchType={searchType} placeholder='Enter a search term' inputValue={searchDrinkVal} onChange={onChangeDrink} onSubmit={onSubmitDrink} sent={sent} key='drinksearch' text={`Search by Drink name`}/>
  let ingredientSearch = <Search searchType={searchType} placeholder='Enter comma separated ingredients' inputValue={searchIngVal} onChange={onChangeIng} onSubmit={onSubmitIngredient} sent={sent} key='ingsearch' text={`Search by Ingredients`}/>
  if(drinkArr!==`` && !drinkArr.includes(undefined)){
    for(let i=0;i<drinkArr.length;i++){
      drinkCard.push(<Displaycard drink={drinkArr[i]} key={drinkArr[i].idDrink}/>)
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