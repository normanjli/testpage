import axios from "axios";

const handler ={
    ingredientChecker:(ingredients)=>{
        let ingredientsArr = ingredients.split(`,`)
        let drinksArr = []
        ingredientsArr=ingredientsArr.forEach(element => element.trim());
        for(let i=0;i<ingredientsArr;i++){
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientsArr[i]}`).then(res=>{
                let {drinks}=res.data
                drinksArr.push(drinks)
            })
        };
        return drinksArr
    }
}
export default handler