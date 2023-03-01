const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('genre', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        //type: DataTypes.STRING
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
      {timestamps: false}
    );
  };