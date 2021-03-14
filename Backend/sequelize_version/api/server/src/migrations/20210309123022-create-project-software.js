module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project_software', {
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Project',
          key: 'project_id'
        },
        primaryKey: true
      },
      software_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Software',
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