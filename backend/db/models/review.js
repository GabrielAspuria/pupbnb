'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    cleanliness: DataTypes.INTEGER,
    accuracy: DataTypes.INTEGER,
    communication: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    experience: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Review;
};
