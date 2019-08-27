const User = require('./user');
const Walk = require('./walk');
const NavPoint = require('./navPoint');
const UserPin = require('./userPin');
const Attraction = require('./attraction');

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

module.exports = {
  User,
  Walk,
  Attraction,
  NavPoint,
  UserPin,
};
