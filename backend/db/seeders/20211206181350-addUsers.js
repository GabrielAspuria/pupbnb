'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Users', [
        { username: "demouser", email: "demouser@demo.com", hashedPassword: bcrypt.hashSync('password'), profilePicture: 'TBD', updatedAt: new Date(), createdAt: new Date()},
        { username: 'Gabriel', email: 'gabrielmaspuria@gmail.com', hashedPassword: bcrypt.hashSync('secret'),profilePicture: 'TBD', updatedAt: new Date(), createdAt: new Date()},
        { username: 'Salami', email: 'ILoveSalami@food.com', hashedPassword: bcrypt.hashSync('foodplease'), profilePicture: 'TBD', updatedAt: new Date(), createdAt: new Date()},
        { username: 'Soju', email: 'sojuissmol@smol.com', hashedPassword: bcrypt.hashSync('iPuppy'),updatedAt: new Date(), createdAt: new Date()},
        { username: 'Best Landlord', email: 'landlord@own.com',hashedPassword: bcrypt.hashSync('moneypls'),updatedAt: new Date(), createdAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
