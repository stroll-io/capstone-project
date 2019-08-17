const User = require('./user');
const Walk = require('./walk');
const NavPoint = require('./navPoint');
const UserPin = require('./userPin');
const Attraction = require('./attraction');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Walk.belongsTo(User);
User.hasMany(Walk);

NavPoint.belongsTo(Walk);
Walk.hasMany(NavPoint);

User.belongsToMany(Walk, { through: 'favorite_walks' });
Walk.belongsToMany(User, { through: 'favorite_walks' });

User.hasMany(UserPin);
UserPin.belongsTo(User);
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Walk,
  NavPoint,
  UserPin,
  Attraction,
};
