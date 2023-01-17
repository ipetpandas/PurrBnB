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
            "There's a lot to say about Henry Clawvill, but if there's anything you should know it's that he's cheerful and planful. Of course he's also aspiring, responsive and sweet, but they're often slightly tainted by a mindset of being cruel as well. His cheerfulness though, this is what he's often admired for. Friends usually count on this and his romantic nature whenever they need help.",
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
            "Plenty of people will dislike Draco Meowfoy, but the fact he's obnoxious and superficial is just the tip of the iceberg. To make matters worse he's also cynical, dishonest and monstrous, but in an odd way they're balanced by habits of being understanding as well. Fair is fair though, Draco does have some rays of light. He's honest and objective for a start, it's not like we're dealing with pure evil here. Unfortunately his superficial nature will probably never truly go away.",
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
            "There's more than meets the eye in the case of Purrincess Peach, but if there's anything you should know it's that she's contemplative and patient. Of course she's also dutiful, captivating and sensitive, but in a way they're lesser traits and tained by behaviors of being thievish as well. Her contemplative nature though, this is what she's pretty much loved for. Friends usually count on this and her elegance when they're in need of support.",
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
            "A lot can be assumed when you first see Cinnamon Roll, but above else know that he's reflective and companionably. Of course he's also exciting, modest and orderly, but they're less prominent and often intertwined with being demanding as well. Nobody's perfect of course and Cinnamon Roll has a fair share of lesser days too. His crassness and troublesome nature pose plenty of problems and reach all around. Fortunately his companionship helps keep them in check for at least a little.",
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
            "A lot can be assumed when you first see Sir Caleb, but if there's anything you should know it's that he's sensitive and focused. Of course he's also calm, surprising and incorruptible, but in smaller doses and they're often spoiled by habits of being morbid as well. His sensitive nature though, this is what he's most popular for. People often count on this and his caring nature especially when they need comforting or support.",
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
            "There's a lot to say about Salad Cat, but the biggest two things to know are that he's courteous and aspiring. Of course he's also rational, selfless and open, but they're far less prominent, especially compared to impulses of being scornful as well. Nobody's perfect of course and Salad Cat has plenty of character faults too. His dishonesty and envy pose plenty of problems on often personal levels. Fortunately his aspirations helps lighten the blows and moods when needed.",
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
            "Many things can be said of Anderson Pooper, but if nothing else you should know he's capable and respectful. Of course he's also creative, open and fun-loving, but those are often overshadowed by tendencies of being power-hungry as well. His capabilities though, this is what he's most well-liked for. People often count on this and his reliability when they're feeling down.",
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
            "TA lot can be said of Isaac Mewton, but two things you'll never forget are that he's disciplined and empathetic. Of course he's also persuasive, precise and practical, but they're in shorter supply, especially considering they're mixed with being unfriendly as well. Nobody's perfect of course and Isaac has plenty of lesser desired aspects too. His thoughtlessness and scornful nature risk ruining pleasant moods, though more on a personal level than for others. Fortunately his empathy helps make sure these days are few and far between.",
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
            "It takes a while to get to know George Meowshington, but the two traits most people enjoy the most are that he's protective and independent. Of course he's also elegant, dedicated and trusting, but in a way they're lesser traits and tained by behaviors of being treacherous as well. His protective nature though, this is what he's most well-liked for. Friends usually count on this and his understanding nature especially when they need comforting or support.",
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
            "A lot can be said of Meowtini, but most know that above all else he's sharing and faithful. Of course he's also courageous, planful and gracious, but these are in a way balance by being frightening as well. His sharing nature though, this is what he's pretty much loved for. Oftentimes people will count on this and his grace whenever they need help.",
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
            "There's more than meets the eye in the case of Lucifur, but perhaps most important is that he's innovative and focused. Of course he's also calm, methodical and sweet, but far less strongly and often mixed with being irrational as well. Nobody's perfect of course and Lucifur has rotten moods and days too. His superficial nature and pompous nature don't make for the greatest company, both personally and for others. Fortunately his focus is usually there to soften the blows.",
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
            "A lot can be said of RuPaw, but the biggest two things to know are that she's curious and compassionate. Of course she's also patient, enthusiastic and amusing, but they're in shorter supply, especially considering they're mixed with being predatory as well. Her curiosity though, this is what she's often admired for. On many occasions people will count on this and her passion whenever they need cheering up.",
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
            "A lot can be said of Catti B, but at the very least you'll find out she's lovable and anticipative. Of course she's also adaptable, orderly and exciting, but those are often overshadowed by tendencies of being desperate as well. Her loving nature though, this is what she's most well-liked for. There are many times when friends count on this and her dedication when they're feeling down.",
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
