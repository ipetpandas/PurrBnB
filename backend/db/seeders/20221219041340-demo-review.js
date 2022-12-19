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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 5,
      review: 'This place was absolutely stunning and would return again when I visit WEHO.',
      stars: 5
    },
    {
      spotId: 2,
      userId: 4,
      review: 'Really clean.  Owners were really courteous and great hosts.',
      stars: 4
    },
    {
      spotId: 3,
      userId: 3,
      review: 'Was an okay place. The owners were not very accommodating.',
      stars: 2
    },
    {
      spotId: 4,
      userId: 2,
      review: 'I loved staying in this neighborhood.  Fresh air and super quiet at night!',
      stars: 5
    },
    {
      spotId: 4,
      userId: 1,
      review: "A pretty good value honestly.  Can't really complain. Advice to anyone deciding to stay in the area: there's great food just five minutes north of here.  You'll love it!",
      stars: 5
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
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options, null, {})
  }
};
