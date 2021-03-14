module.exports = (sequelize, DataTypes) => {
  const Software = sequelize.define('software', {
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
    Software.belongsToMany(models.project, { foreignKey: 'project_id', as: 'project', through: models.project_software })
  }

  return Software;
};