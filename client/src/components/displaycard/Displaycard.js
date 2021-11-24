import React from "react";

const Displaycard = ({ drink, onClick }) => {
  let { strDrinkThumb, strDrink } = drink;
  return (
    <div className="drinkcard" onClick={onClick}>
      <img className="drink-img" src={strDrinkThumb} alt={strDrink} />
      <h2 className="drinkName">{strDrink}</h2>
    </div>
  );
};

export default Displaycard;
