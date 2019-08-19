<<<<<<< HEAD
const Sequelize = require('sequelize');
=======
const Sequelize = require('sequelize')
>>>>>>> 9a5a9f12796801f4aa6a29a6ae65489b9e58268c
const db = require('../db');

const UserPin = db.define('userPin', {
  location: {
<<<<<<< HEAD
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
=======
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
>>>>>>> 9a5a9f12796801f4aa6a29a6ae65489b9e58268c
