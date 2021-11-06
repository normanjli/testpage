import React from 'react';

const Displaycard = ({drink}) => {
    let {strDrinkThumb, strDrink, idDrink} = drink
    let url=`https://www.thecocktaildb.com/drink/${idDrink}`
    return (
        <div className='drink'>
            <a href={url}>
            <img className = "drink-img" src={strDrinkThumb} alt={strDrink}/>
            </a>
            <h2 className="drink">{strDrink}</h2>
        </div>
    );
};

export default Displaycard;