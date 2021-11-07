import React from 'react';

const Displaycard = ({drink}) => {
    let {strDrinkThumb, strDrink, idDrink} = drink
    let url=`https://www.thecocktaildb.com/drink/${idDrink}`
    return (
        <div className='drink'>
            <a href={url} rel="noreferrer noopener" target='_blank'>
            <img className = "drink-img" src={strDrinkThumb} alt={strDrink}/>
            </a>
            <h2 className="drinkName">{strDrink}</h2>
        </div>
    );
};

export default Displaycard;