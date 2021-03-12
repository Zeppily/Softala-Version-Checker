module.exports = (sequelize, DataTypes) => {
  const Software = sequelize.define('Software', {
    software_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latest_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
  });

  Software.associate = models => {
    Software.belongsToMany(models.Project, { foreignKey: 'project_id', as: 'project', through: models.Project_Software})
  }

  return Software;
};