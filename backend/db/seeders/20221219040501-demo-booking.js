'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   options.tableName = 'Bookings';
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      startDate: new Date('2023-01-10'),
      endDate: new Date('2023-01-12')
    },
    {
      spotId: 2,
      userId: 4,
      startDate: new Date('2023-01-10'),
      endDate: new Date('2023-01-12')
    },
    {
      spotId: 3,
      userId: 5,
      startDate: new Date('2023-01-10'),
      endDate: new Date('2023-01-12')
    },
    {
      spotId: 4,
      userId: 1,
      startDate: new Date('2023-01-10'),
      endDate: new Date('2023-01-12')
    },
    {
      spotId: 1,
      userId: 5,
      startDate: new Date('2022-12-18'),
      endDate: new Date('2022-12-21')
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
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {} );
  }
};
