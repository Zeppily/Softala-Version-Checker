module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EOL', {
      software_name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      version: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      eol_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('EOL');
  }
};