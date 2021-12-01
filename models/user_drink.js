'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(`User`)
    }
  };
  User_Drink.init({
    User_id:{ 
    type:DataTypes.INTEGER,
    primaryKey:true
    },
    Drink_id :{
      type:DataTypes.INTEGER,
      primaryKey:true
    } 
  }, {
    sequelize,
    modelName: 'User_Drink',
  });
  return User_Drink;
};