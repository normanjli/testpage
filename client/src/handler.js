const handler = {
  drinkArrayHandler: (drinksArr) => {
    //O(5nlogn) runtime
    let ans = [];
    let drinkDict = {};
    for (let currentDrink of drinksArr) {
      if (drinkDict[currentDrink.idDrink] === undefined) {
        drinkDict[currentDrink.idDrink] = [currentDrink, 1];
      } else {
        let [a, count] = drinkDict[currentDrink.idDrink];
        drinkDict[currentDrink.idDrink] = [a, ++count];
      }
    }
    Object.keys(drinkDict)
      .map((i) => [+i, drinkDict[i]])
      .sort((firstDrink, secondDrink) => secondDrink[1][1] - firstDrink[1][1])
      .filter((drink) => drink[1][1] > 1)
      .map((drink) => ans.push(drink[1][0]));
    return ans;
  },
  shortenedArrayHandler: (drinksArr) => {
    const drinkDict = drinksArr.reduce((results, drink) => {
      const drinkCount = results[drink.id];
      return (results[drink.id] = drinkCount ? drinkCount + 1 : 1);
    }, {});
    return drinkDict;
  },
};
export default handler;
