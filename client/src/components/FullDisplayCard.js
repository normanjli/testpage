import React from 'react';

const FullDisplayCard = ({drink,onClick}) => {
    let {strDrinkThumb, strDrink, idDrink, strInstructions} = drink
    let url=`https://www.thecocktaildb.com/drink/${idDrink}`
    let ingredientsArr = []

    Object.values(drink).forEach((item, i)=>{
        console.log(item)
        if (item!==null){
            if (Object.keys(drink)[i].includes(`strIngredient`)){
                ingredientsArr.push(<li className='ingredient'>{item}</li>)
            }
        }
    })
    console.log(ingredientsArr)
    return (
        <div>
            <div className='fulldrink'>
                <button className='closebtn' onClick={onClick}>x</button>
                    <h1 className="drinkName">{strDrink}</h1>
                <div className='fullDrinkDetails'>
                    <a href={url} rel="noreferrer noopener" target='_blank'>
                        <img className = "fulldrink-img" src={strDrinkThumb} alt={strDrink}/>
                    </a>
                    <div>
                        <h3>Ingredients</h3>
                            {ingredientsArr}
                        <h3>Instructions</h3>
                        <p>{strInstructions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullDisplayCard;