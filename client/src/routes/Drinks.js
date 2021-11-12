import React, { useState } from "react";
import axios from "axios";
import Displaycard from "../components/displaycard/Displaycard";
import Search from "../components/search/search";
import Button from "../components/button/Button";
import FullDisplayCard from "../components/FullDisplayCard";
import handler from "../handler";
import Navbar from "../components/NavBar/Navbar";

const Drinks = () => {
  const [searchDrinkVal, setSearchDrinkVal] = useState("");
  const [searchIngVal, setSearchIngVal] = useState("");
  const [drinkArr, setDrink] = useState(``);
  let drinkCard = [];
  const [fullDrinkCard, setFullDrinkCard] = useState();
  const [sent, setSent] = useState("");
  const [displayedDrink, setDisplayedDrink] = useState(``);
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
        console.log(drinks);
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
        .catch((err) => console.log(err));
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
        console.log(fullDrinkCard);
        console.log(displayedDrink);
      }
    } else {
      let res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
      );
      let { drinks } = res.data;
      setDisplayedDrink(drinks[0].idDrink);
      setFullDrinkCard(
        <FullDisplayCard drink={drinks[0]} onClick={() => close()} />
      );
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
  if (drinkArr !== `` && !drinkArr.includes(undefined)) {
    for (let i = 0; i < drinkArr.length; i++) {
      drinkCard.push(
        <Displaycard
          drink={drinkArr[i]}
          key={drinkArr[i].idDrink}
          onClick={() => renderFullDrink(drinkArr[i])}
        />
      );
    }
  }
  return (
    <>
      <Navbar title="Find Drinks" />
      <div className="searchtypebtn">
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
    </>
  );
};

export default Drinks;
