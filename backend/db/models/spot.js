'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    features: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    photos: DataTypes.TEXT
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: 'userId' } )
    Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true });
  };
  return Spot;
};
