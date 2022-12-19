'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'User',
        lastName: 'Demo',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Johnny',
        lastName: 'Nguyen',
        email: 'johnny_nguyen123@gmail.com',
        username: 'johnny_nguyen123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Keenly',
        lastName: 'Chungus',
        email: 'keenly_chungus456@yahoo.com',
        username: 'ilikefatcows',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Peter',
        lastName: 'Le',
        email: 'peter_le789@hotmail.com',
        username: 'peterle789',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'James',
        lastName: 'Hsuh',
        email: 'jameshsuh321@aol.com',
        username: 'jameshsuh321',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
