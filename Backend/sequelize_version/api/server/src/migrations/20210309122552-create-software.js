module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('software', {
      software_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latest_version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('software');
  }
};