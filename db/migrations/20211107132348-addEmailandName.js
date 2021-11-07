"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("User", "email", Sequelize.STRING, {
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.addColumn("User", "firstName", Sequelize.STRING, {
      allowNull: false,
    });
    await queryInterface.addColumn("User", "lastName", Sequelize.STRING, {
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("User", "email");
    await queryInterface.removeColumn("User", "firstName");
    await queryInterface.removeColumn("User", "lastName");
  },
};
