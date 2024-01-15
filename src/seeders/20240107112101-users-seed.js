'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        firstName: 'Barsbold',
        lastName: 'Bayar-Erdene',
        phoneNumber: '99509101',
        password: await bcrypt.hash('superPa$$', await bcrypt.genSalt(10)),
        role: ['SUPER_ADMIN'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
