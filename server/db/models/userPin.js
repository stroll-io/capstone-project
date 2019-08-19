const Sequelize = require('sequelize')
const db = require('../db');

const UserPin = db.define('userPin', {
  location: {
    type: Sequelize.GEOMETRY('POINT')
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = UserPin;





//  {
//       title: "Fullstack Academy",
//       description: "a top-ranked coding bootcamp",
//       coordinate: { latitude: 41.895394, longitude: -87.639032 }
//     },
//     { title: "Yolk",
//       description: "I effing love brunch!",
//       coordinate: { latitude: 41.896256, longitude: -87.633928 }
//   }
