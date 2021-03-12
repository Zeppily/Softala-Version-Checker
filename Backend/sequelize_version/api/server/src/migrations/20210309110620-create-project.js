module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Project', {
      project_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      host: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Project');
  }
};