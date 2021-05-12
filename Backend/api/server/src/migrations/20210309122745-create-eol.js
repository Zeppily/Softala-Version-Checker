module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eol', {
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
        type: Sequelize.DATEONLY
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('eol');
  }
};
