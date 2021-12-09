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

      const plantDescription = "Ever wonder what it's like to be a plant? Now's your chance! Our excellent pot plant is built to fit any type and any size of puppers. Feel the warmth of the sun and the breeze of that cool air that plants always get!"

      const floorDescription = "You'll never know what you'll get when you stay with us! Carpet, wooden floor, small rug, anything you could imagine is what we offer! Guaranteed affordable!"

      return queryInterface.bulkInsert('Spots', [
        {
          userId: 1,
          name: 'Floor Blanket',
          description: fbDescription,
          features: 'Warm, Next to owner, Mobile',
          price: "🦴🦴🦴 Bones",
          rating: 5,
          photos: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824966/pupbnb/floorblanket1_exfr5z.png",
          updatedAt: new Date(),
          createdAt: new Date()},
        {
          userId: 5,
          name: 'Small Dog Bed',
          description: sdbDescription,
          features:'Comfortable, Mobile, Definitely not destructible',
          price: "🦴🦴",
          rating: 1,
          photos:"https://res.cloudinary.com/gabrielaspuria/image/upload/v1638825297/pupbnb/smalldogbed_orp7rs.png",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          userId: 2,
          name: 'Plant Box',
          description: plantDescription,
          features: 'Find out how plants feel, High quality soil, Fits all size puppers',
          price: "🦴",
          rating: 5,
          photos: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824965/pupbnb/plantpot1_t3jh4l.jpg",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          userId: 1,
          name: 'Floor',
          description: floorDescription,
          features: 'See spot sleep in spot, Different surfaces for your comfort, People will randomly go up to you with treats or pets',
          price: "FREE",
          rating: 5,
          photos: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824961/pupbnb/floor1_ewvwpp.jpg",
          updatedAt: new Date(),
          createdAt: new Date()
        }

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
