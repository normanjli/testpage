import React, { useState } from "react";
import axios from "axios";
import Displaycard from "../components/displaycard/Displaycard";
import Search from "../components/search/search";
import Button from "../components/button/Button";
import FullDisplayCard from "../components/FullDisplayCard/FullDisplayCard";
import handler from "../handler";
import Navbar from "../components/NavBar/Navbar";
import Message from "../components/Message/Message";

const Drinks = () => {
  const [searchDrinkVal, setSearchDrinkVal] = useState("");
  const [searchIngVal, setSearchIngVal] = useState("");
  const [drinkArr, setDrink] = useState(``);
  let drinkCard = [];
  const [fullDrinkCard, setFullDrinkCard] = useState();
  const [sent, setSent] = useState("");
  const [displayedDrink, setDisplayedDrink] = useState(``);
  const [errorMessage, setMessage] = useState(``)
  const onChangeDrink = (event) => {
    setSearchDrinkVal(event.target.value);
    setSent(false);
  };
  const onChangeIng = (event) => {
    setSearchIngVal(event.target.value);
    setSent(false);
  };
  const drinkClick = () => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then((res) => {
        let { drinks } = res.data;
        drinks ? setDrink(drinks) : setSent(true);
      });
  };
  const onSubmitDrink = (event) => {
    event.preventDefault();
    let searchTerm = searchDrinkVal.replace(` `, `+`);
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      )
      .then((res) => {
        let { drinks } = res.data;
        drinks ? setDrink(drinks) : setSent(true);
      })
      .catch((err) => console.log(err));
  };
  const onSubmitIngredient = async (event) => {
    event.preventDefault();
    let ingredientsArr = searchIngVal.split(`,`);
    if (ingredientsArr.length === 1) {
      axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientsArr[0].trim()}`
        )
        .then((res) => {
          let { drinks } = res.data;
          drinks ? setDrink(drinks) : setSent(true);
        })
        .catch((err) =>{
          setMessage(err.response.data);
          setTimeout(()=>setMessage(``),2000)
        })
    } else {
      let drinksArr = [];
      for (let i of ingredientsArr) {
        let searchTerm = i.trim().replace(` `, `+`);
        var res = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`
        );
        let { drinks } = res.data;
        if (drinks) {
          drinksArr.push(...drinks);
        } else {
          setSent(true);
          return;
        }
      }
      const ans = handler.drinkArrayHandler(drinksArr);
      ans ? setDrink(ans) : setSent(true);
    }
  };
  const [searchType, setSearchType] = useState(`drink`);
  const close = () => {
    setFullDrinkCard();
    setDisplayedDrink(``);
  };
  const renderFullDrink = async (drink) => {
    let { idDrink } = drink;
    if (drink.strInstructions) {
      if (displayedDrink !== idDrink) {
        setDisplayedDrink(idDrink);
        setFullDrinkCard(
          <FullDisplayCard drink={drink} onClick={() => close()} />
        );
      }
    } else {
      try{
      let res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
      );
      let { drinks } = res.data;
      setDisplayedDrink(drinks[0].idDrink);
      setFullDrinkCard(
        <FullDisplayCard drink={drinks[0]} onClick={() => close()} />
      );
    }catch(error){
      setMessage(error.response.data)
      setTimeout(()=>setMessage(``),2000)
    }
  }
  };
  let drinkSearch = (
    <Search
      searchType={searchType}
      placeholder="Enter a search term"
      inputValue={searchDrinkVal}
      onChange={onChangeDrink}
      onSubmit={onSubmitDrink}
      sent={sent}
      key="drinksearch"
      text={`Search by Drink name`}
    />
  );
  let ingredientSearch = (
    <Search
      searchType={searchType}
      placeholder="Enter comma separated ingredients"
      inputValue={searchIngVal}
      onChange={onChangeIng}
      onSubmit={onSubmitIngredient}
      sent={sent}
      key="ingsearch"
      text={`Search by Ingredients`}
    />
  );
  const likeDrink =  async (drink) => {
    try{
      let temp = `${localStorage.getItem(`likedDrinks`)}, ${drink.idDrink}`
      await axios.put(`/api/user/like`,{drink})
      localStorage.setItem(`likedDrinks`, temp)
      setMessage(`Added ${drink.strDrink} to favorites!`);
      setTimeout(()=>setMessage(``),2000)
    }catch(error){
      setMessage(error.response.data)
      setTimeout(()=>setMessage(``),2000)
    }
  }
  const unLikeDrink = async (drink) => {
    try {
      let res = await axios.delete(`/api/user/unlike/${drink.idDrink}`, {
        drink,
      });
      if (res.status === 200) {
        localStorage.removeItem(`likedDrinks`);
        if (res.data) {
          localStorage.setItem(`likedDrinks`, res.data);
        }
        setMessage(`Removed ${drink.strDrink} from favorites!`);
        setTimeout(()=>setMessage(``),2000)
      }
    } catch (error) {
      setMessage(
        `Could not remove ${drink.strDrink} from favorites, try again`
      );
      setTimeout(() => setMessage(``), 2000);
    }
  };
  if (drinkArr !== `` && !drinkArr.includes(undefined)) {
    for (let i = 0; i < drinkArr.length; i++) {
      if (localStorage.getItem(`likedDrinks`)&&localStorage.getItem('likedDrinks').includes(drinkArr[i].idDrink)){
        drinkCard.push(
          <Displaycard
            drink={drinkArr[i]}
            key={drinkArr[i].idDrink}
            type='Unfavorite'
            moreDetails={() => renderFullDrink(drinkArr[i])}
            likeDrink={()=>unLikeDrink(drinkArr[i])}
          />
        );
      }else{
        drinkCard.push(
          <Displaycard
            drink={drinkArr[i]}
            key={drinkArr[i].idDrink}
            type='Favorite'
            moreDetails={() => renderFullDrink(drinkArr[i])}
            likeDrink={()=>likeDrink(drinkArr[i])}
          />
        );
      }
    }
  }
  return (
    <>
      <Navbar title="Search for Drinks" />
      <div className="searchtypebtn" style={{marginTop:'5em'}}>
        <Button
          className="searchbtn"
          onClick={() => {
            setSearchType(`drink`);
            setSearchDrinkVal("");
          }}
          id={`searchdrink`}
          text={`Search by Drink name`}
        />
        <Button
          className="searchbtn"
          onClick={() => {
            setSearchType(`ingredient`);
            setSearchIngVal("");
          }}
          id={`searchingredient`}
          text={`Search by Ingredients`}
        />
      </div>
      {searchType === `drink` ? drinkSearch : ingredientSearch}
      <Button onClick={drinkClick} id={`test`} text={`Find a random Drink`} />
      {fullDrinkCard}
      <div className="drink-container">{drinkCard}</div>
      <Message message={errorMessage}/>
    </>
  );
};

export default Drinks;
