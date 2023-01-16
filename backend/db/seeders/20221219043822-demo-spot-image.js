"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/1931367/pexels-photo-1931367.jpeg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/8369034/pexels-photo-8369034.jpeg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://i.kym-cdn.com/photos/images/original/001/505/718/136.jpg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/3616232/pexels-photo-3616232.jpeg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/674572/pexels-photo-674572.jpeg",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg",
        preview: true,
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/14957951/pexels-photo-14957951.jpeg",
        preview: true,
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/3155894/pexels-photo-3155894.jpeg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
