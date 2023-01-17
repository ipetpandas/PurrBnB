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
          name: "Henry Clawvill",
          description:
            "There's a lot to say about Henry Clawvill, but if there's anything you should know it's that he's cheerful and planful.",
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
          name: "Draco Meowfoy",
          description:
            "Plenty of people will dislike Draco Meowfoy, but the fact he's obnoxious and superficial is just the tip of the iceberg.",
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
          name: "Purrincess Peach",
          description:
            "There's more than meets the eye in the case of Purrincess Peach, but if there's anything you should know it's that she's contemplative and patient.",
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
          name: "Cinnamon Roll",
          description:
            "A lot can be assumed when you first see Cinnamon Roll, but above else know that he's reflective and companionably.",
          price: 49,
        },
        {
          ownerId: 1,
          address: "3985 Creekside Lane",
          city: "Los Angeles",
          state: "CA",
          country: "United States of America",
          lat: 34.05,
          lng: -118.24,
          name: "Sir Caleb Meows-A-Lot",
          description:
            "A lot can be assumed when you first see Sir Caleb, but if there's anything you should know it's that he's sensitive and focused.",
          price: 210,
        },
        {
          ownerId: 1,
          address: "4834 Sunny Day Drive",
          city: "Huntington Beach",
          state: "CA",
          country: "United States of America",
          lat: 33.66,
          lng: -117.95,
          name: "Salad Cat",
          description:
            "There's a lot to say about Salad Cat, but the biggest two things to know are that he's courteous and aspiring.",
          price: 126,
        },
        {
          ownerId: 2,
          address: "3073 Armbrester Drive",
          city: "Santa Monica",
          state: "CA",
          country: "United States of America",
          lat: 34.01,
          lng: -118.49,
          name: "Anderson Pooper",
          description:
            "Many things can be said of Anderson Pooper, but if nothing else you should know he's capable and respectful.",
          price: 325,
        },
        {
          ownerId: 3,
          address: "10701 Anchor Ave.",
          city: "Garden Grove",
          state: "CA",
          country: "United States of America",
          lat: 33.77,
          lng: -117.93,
          name: "Isaac Mewton",
          description:
            "TA lot can be said of Isaac Mewton, but two things you'll never forget are that he's disciplined and empathetic.",
          price: 89,
        },
        {
          ownerId: 4,
          address: "16100 Whispering Hills Drive",
          city: "Chino Hills",
          state: "CA",
          country: "United States of America",
          lat: 33.99,
          lng: -117.76,
          name: "George Meowshington",
          description:
            "It takes a while to get to know George Meowshington, but the two traits most people enjoy the most are that he's protective and independent.",
          price: 126,
        },
        {
          ownerId: 1,
          address: "1200 Quail St.",
          city: "Newport Beach",
          state: "CA",
          country: "United States of America",
          lat: 33.61,
          lng: -117.92,
          name: "Meowtini",
          description:
            "A lot can be said of Meowtini, but most know that above all else he's sharing and faithful.",
          price: 269,
        },
        {
          ownerId: 5,
          address: "885 Lookout Drive",
          city: "Cerritos",
          state: "CA",
          country: "United States of America",
          lat: 33.86,
          lng: -118.05,
          name: "Lucifur",
          description:
            "There's more than meets the eye in the case of Lucifur, but perhaps most important is that he's innovative and focused.",
          price: 59,
        },
        {
          ownerId: 5,
          address: "8129 Gartner St.",
          city: "San Diego",
          state: "CA",
          country: "United States of America",
          lat: 32.71,
          lng: -117.16,
          name: "RuPaw",
          description:
            "A lot can be said of RuPaw, but the biggest two things to know are that she's curious and compassionate.",
          price: 100,
        },
        {
          ownerId: 1,
          address: "99 Sycamore Ave.",
          city: "Santa Ana",
          state: "CA",
          country: "United States of America",
          lat: 33.74,
          lng: -117.86,
          name: "Catti B",
          description:
            "A lot can be said of Catti B, but at the very least you'll find out she's lovable and anticipative.",
          price: 160,
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
