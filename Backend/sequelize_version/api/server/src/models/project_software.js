module.exports = (sequelize, DataTypes) => {
  const Project_Software = sequelize.define('Project_Software', {
    // project_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'Project',
    //   referencesKey: 'project_id',
    //   primaryKey: true
    // },
    // software_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'Software',
    //   referencesKey: 'software_id',
    //   primaryKey: true
    // },
    installed_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },  {
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
  });

  Project_Software.associate = models => {
    Project_Software.belongsTo(models.Project, {foreignKey: 'project_id', as: 'project'})
    Project_Software.belongsTo(models.Software, {foreignKey: 'software_id', as: 'software'})
  }
  return Project_Software;
};