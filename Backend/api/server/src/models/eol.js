module.exports = (sequelize, DataTypes) => {
  const EOL = sequelize.define('eol', {
    software_name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    eol_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    createdAt: false,
    updatedAt: false,
    id: false,
    freezeTableName: true,
  });

  return EOL;
};
