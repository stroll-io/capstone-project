const Sequelize = require('sequelize');
const db = require('../db');

const UserPin = db.define('userPin', {
  location: {
    type: Sequelize.GEOMETRY('POINT'),
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  walkId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = UserPin;
