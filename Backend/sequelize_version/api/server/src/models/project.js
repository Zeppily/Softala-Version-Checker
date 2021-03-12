module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
  });

  Project.associate = models => {
    Project.belongsToMany(models.Software, { foreignKey: 'software_id', as: 'software', through: models.Project_Software})
  }

  return Project;
};