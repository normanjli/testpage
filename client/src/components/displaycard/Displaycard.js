import React from "react";

const Displaycard = ({ drink, type, moreDetails, likeDrink }) => {
  let { strDrinkThumb, strDrink } = drink;
  return (
    <div className="drinkcard" >
      <span className='moreDetails'onClick={moreDetails}>
        More Details
      </span>
      <span className='like' onClick={likeDrink}>{type}</span>
      <img className="drink-img" src={strDrinkThumb} alt={strDrink}/>
      <h2 className="drinkName">{strDrink}</h2>
    </div>
  );
};

export default Displaycard;
