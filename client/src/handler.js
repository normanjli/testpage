const handler ={

    drinkArrayHandler:(drinksArr)=>{//O(5n) runtime
        let ans = []
        let drinkDict ={}
        for (let currentDrink of drinksArr){
            if (drinkDict[currentDrink.idDrink]===undefined){
                drinkDict[currentDrink.idDrink] = [currentDrink,1]
            }else{
                // let a , count
                [a, count] = drinkDict[currentDrink.idDrink]
                drinkDict[currentDrink.idDrink] = [a,++count]
            }
        }
        Object.keys(drinkDict)
            .map((i)=> [+i, drinkDict[i]])
            .sort((firstDrink, secondDrink)=>secondDrink[1][1]-firstDrink[1][1])
            .filter(drink => drink[1][1]>1)
            .forEach(drink=>ans.push(drink[1][0]))
        return ans
    }
}
export default handler