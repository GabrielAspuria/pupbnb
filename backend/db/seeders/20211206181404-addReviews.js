'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

      const floorBlanketExperience = 'Love blanket. Can take anywhere. Put anywhere. Be comfortable anywhere. 10/10 would recommend. Close to owner so get many head scratches'

      const smallBedExperience = 'Is clean but hate it. They say chonky dog can fit but I no fit. Told owner I hate it so much. He no listen. Tore it up. Indestructible lie too.'

      return queryInterface.bulkInsert('Reviews', [
        {userId: 3, spotId: 5, cleanliness: 5, accuracy: 5, communication: 5, value: 5, experience: floorBlanketExperience, imgUrl:'TBD', updatedAt: new Date(), createdAt: new Date()},
        {userId: 3, spotId: 6, cleanliness: 5, accuracy: 1, communication: 1, value: 1, experience: smallBedExperience, imgUrl: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824966/pupbnb/smalldogbed3_muh7vb.jpg", updatedAt: new Date(), createdAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
