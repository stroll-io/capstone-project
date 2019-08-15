const Sequelize = require('sequelize');
const db = require('../db');

const NavPoint = db.define('navPoint', {
  location: {
    type: Sequelize.GEOMETRY('POINT'),
  },
  prev: {
    type: Sequelize.INTEGER,
  },
  next: {
    type: Sequelize.INTEGER,
  },
  walkId: {
    type: Sequelize.INTEGER,
  },
  start: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = NavPoint;
