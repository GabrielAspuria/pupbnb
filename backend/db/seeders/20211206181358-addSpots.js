'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      const fbDescription = "A blanket that was handmade by my sister's friend that I mistakingly thought she never used. I found it in the closet and I just threw it on the floor for doggos to use. Guaranteed warmth. Not a stationary spot so you can move it anywhere you would like!"

      const sdbDescription = 'Small, low price, but comfortable dog bed! Can fit multiple small pups or one chonky pup! Guaranteed comfort!'


      return queryInterface.bulkInsert('Spots', [
        {userId: 2,
          name: 'Floor Blanket',
          description: fbDescription,
          features: 'Warm, next to owner, mobile',
          price: 3,
          rating: 5,
          photos: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824966/pupbnb/floorblanket1_exfr5z.png",
          updatedAt: new Date(),
          createdAt: new Date()},
        {userId: 2, name: 'Small Dog Bed', description: sdbDescription, features:'Comfortable, mobile, definitely not destructible', price: 1, rating: 1, photos:"https://res.cloudinary.com/gabrielaspuria/image/upload/v1638825297/pupbnb/smalldogbed_orp7rs.png", updatedAt: new Date(), createdAt: new Date() }

      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Spots', null, {});
  }
};
