'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 2,
      startDate: new Date('2022-12-18'),
      endDate: new Date('2022-12-22')
    },
    {
      spotId: 2,
      userId: 3,
      startDate: new Date('2022-12-26'),
      endDate: new Date('2022-12-30')
    },
    {
      spotId: 3,
      userId: 4,
      startDate: new Date('2022-12-31'),
      endDate: new Date('2023-01-02')
    },
    {
      spotId: 4,
      userId: 5,
      startDate: new Date('2022-12-18'),
      endDate: new Date('2022-12-23')
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings')
  }
};