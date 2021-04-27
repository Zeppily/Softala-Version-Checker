module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project', {
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
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING
      },
      uptime: {
        type: Sequelize.STRING
      },
      scansuccessful: {
        type: Sequelize.BOOLEAN
      },
      timestamp: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('project');
  }
};