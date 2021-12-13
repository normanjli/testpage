import React, { useState } from "react";
import axios from "axios";
import Search from "../components/search/search";
import Button from "../components/button/Button";
import handler from "../handler";
import Navbar from "../components/NavBar/Navbar";
import Message from "../components/Message/Message";
import DrinkCont from "../components/DrinkCont/DrinkCont";

const Drinks = () => {
  const [searchDrinkVal, setSearchDrinkVal] = useState("");
  const [searchIngVal, setSearchIngVal] = useState("");
  const [drinkArr, setDrink] = useState(``);
  const [sent, setSent] = useState("");
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
      <DrinkCont drinkArr={drinkArr} setMessage={setMessage}/>
      <Message message={errorMessage}/>
    </>
  );
};

export default Drinks;
