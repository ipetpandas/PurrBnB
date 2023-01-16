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
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 2,
          address: "123 Lexington St.",
          city: "West Hollywood",
          state: "CA",
          country: "United States of America",
          lat: 34.09,
          lng: -118.36,
          name: "VIP King Bed, Fast Wi-Fi, Free Garage Parking",
          description:
            "This brand new unit is located in the heart of Hollywood, close to some of the trendiest restaurants, nightlife & everything else Hollywood has to offer.",
          price: 275,
        },
        {
          ownerId: 3,
          address: "456 S Nogales St.",
          city: "Rowland Heights",
          state: "CA",
          country: "United States of America",
          lat: 33.98,
          lng: -117.88,
          name: "Dreamy Vacation Home near Disney",
          description:
            "ONE OF A KIND home unlike any other Airbnb you've ever been before.",
          price: 370,
        },
        {
          ownerId: 4,
          address: "789 California St.",
          city: "Riverside",
          state: "CA",
          country: "United States of America",
          lat: 33.96,
          lng: -117.38,
          name: "Cute home near downtown",
          description: "Visit downtown festival of lights in 5 min drive",
          price: 100,
        },
        {
          ownerId: 5,
          address: "321 Artesia Ave.",
          city: "Fullerton",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Bedroom B (1 full size bed)",
          description:
            "thirteen minutes from Disneyland / Knotts / buena park mall",
          price: 49,
        },
        {
          ownerId: 1,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 1,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 2,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 3,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 4,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 1,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 5,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
        {
          ownerId: 5,
          address: "Test",
          city: "Test",
          state: "CA",
          country: "United States of America",
          lat: 33.71,
          lng: -117.69,
          name: "Test",
          description: "Test",
          price: 100,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
