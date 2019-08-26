const Sequelize = require('sequelize');
const db = require('../db');

const Walk = db.define('walk', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      len: [2, 600], //this may not work
    },
  },
  category: {
    type: Sequelize.ENUM,
    values: [
      'nature',
      'scenic',
      'architecture',
      'dog',
      'historical',
      'hiking',
      'street art',
    ],
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  stars: {
    type: Sequelize.INTEGER,
  },
  userId: Sequelize.INTEGER,
  start: {
    type: Sequelize.GEOMETRY('POINT'),
  },
  distance: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Walk;
