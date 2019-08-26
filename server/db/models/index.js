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

Attraction.belongsTo(Walk);
Walk.hasMany(Attraction);

User.belongsToMany(Walk, {
  through: 'saved_walks',
  as: 'savedByUser',
  foreignKey: 'savedByUser',
});
Walk.belongsToMany(User, {
  through: 'saved_walks',
  as: 'savedWalk',
  foreignKey: 'savedWalk',
});

User.hasMany(UserPin);
UserPin.belongsTo(User);

User.belongsToMany(Walk, {
  through: 'past_walks',
  as: 'walkedByUser',
  foreignKey: 'walkedByUser',
});
Walk.belongsToMany(User, {
  through: 'past_walks',
  as: 'pastWalk',
  foreignKey: 'pastWalk',
});
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Walk,
  Attraction,
  NavPoint,
  UserPin,
};
