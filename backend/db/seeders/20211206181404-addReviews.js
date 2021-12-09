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

      const plantExperience = "Love being plant. Am photosynthesis. Kinda dirty but loved experience. Everyone should try at least once. Plant far from owner so not much communication though."



      return queryInterface.bulkInsert('Reviews', [
        {
          userId: 1,
          spotId: 1,
          cleanliness: 5,
          accuracy: 5,
          communication: 5,
          value: 5,
          experience: floorBlanketExperience,
          imgUrl:'TBD',
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          userId: 5,
          spotId: 2,
          cleanliness: 6,
          accuracy: 1,
          communication: 1,
          value: 1,
          experience: smallBedExperience,
          imgUrl: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824966/pupbnb/smalldogbed3_muh7vb.jpg",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          userId: 2,
          spotId: 3,
          cleanliness: 1,
          accuracy: 3,
          communication: 1,
          value: 5,
          experience: plantExperience,
          imgUrl: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824965/pupbnb/plantpot1_t3jh4l.jpg",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          userId: 1,
          spotId: 4,
          cleanliness: 3,
          accuracy: 5,
          communication: 4,
          value: 5,
          experience: "Best place. Sometimes many treats but never have to wait. Can just go anywhere and sleep. Best place value.",
          imgUrl: "https://res.cloudinary.com/gabrielaspuria/image/upload/v1638824962/pupbnb/fireplace1_zsfwvf.jpg",
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
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
