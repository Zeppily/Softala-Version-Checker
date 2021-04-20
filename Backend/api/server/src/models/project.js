module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
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
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    uptime: {
      type: DataTypes.STRING
    }
  }, {
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
  });

  Project.associate = models => {
    Project.belongsToMany(models.software, { 
      foreignKey: 'software_id', as: 'software', 
      through: models.project_software
    })
  }

  return Project;
};