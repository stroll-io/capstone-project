const Sequelize = require('sequelize');
const db = require('../db');

const Attraction = db.define('attraction', {
  location: {
    type: Sequelize.GEOMETRY('POINT'),
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.STRING
  }, 
});

module.exports = Attraction;
