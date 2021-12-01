'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Drinks', {
      User_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: `Users`,
          key:`id`,
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      Drink_id: {
        type: Sequelize.INTEGER,
        primaryKey:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Drinks');
  }
};