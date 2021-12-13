import React, {useState} from "react";
import Displaycard from "../displaycard/Displaycard";
import FullDisplayCard from "../FullDisplayCard/FullDisplayCard";
import axios from "axios";

const DrinkCont = ({drinkArr, setMessage}) => {
  const [fullDrinkCard, setFullDrinkCard] = useState();
  let drinkCard = [];
  const [displayedDrink, setDisplayedDrink] = useState(``);
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
  const likeDrink =  async (drink) => {
    try{
      let temp = `${localStorage.getItem(`likedDrinks`)}, ${drink.idDrink}`
      await axios.put(`/api/user/like`,{drink})
      localStorage.setItem(`likedDrinks`, temp.startsWith(`,`)?temp.replace(`,`,``):temp)
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
      {fullDrinkCard}
      <div className="drink-container">{drinkCard}</div>{" "}
    </>
  );
};

export default DrinkCont;
