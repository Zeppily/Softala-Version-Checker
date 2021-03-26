module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project_software', {
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'project',
          key: 'project_id'
        },
        primaryKey: true
      },
      software_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'software',
          key: 'software_id'
        },
        primaryKey: true
      },
      installed_version: {
        type: Sequelize.STRING
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('project_software');
  }
};