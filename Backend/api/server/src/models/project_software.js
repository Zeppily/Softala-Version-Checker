module.exports = (sequelize, DataTypes) => {
  const Project_Software = sequelize.define('project_software', {
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
  }, {
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
  });

  Project_Software.associate = models => {
    Project_Software.belongsTo(models.project, { 
      foreignKey: 'project_id', as: 'project',
      onDelete: 'CASCADE'
    })
    Project_Software.belongsTo(models.software, { 
      foreignKey: 'software_id', as: 'software',
      onDelete: 'CASCADE'
    })
  }
  return Project_Software;
};