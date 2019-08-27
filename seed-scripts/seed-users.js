const User = require('../server/db/models/user');

//admin users
const [ben, madi, michelle] = await Promise.all([
  User.create({
    firstName: 'ben',
    email: 'ben@stroll.io',
    isAdmin: true,
    password: 'abcdefg',
  }),
  User.create({
    firstName: 'madi',
    email: 'madi@stroll.io',
    isAdmin: true,
    password: 'abcdefg',
  }),
  User.create({
    firstName: 'michelle',
    email: 'michelle@stroll.io',
    isAdmin: true,
    password: 'abcdefg',
  }),
  //this user is to be provided to recruitors/professionals to use the app
  User.create({
    firstName: 'guest',
    email: 'guest@generic.com',
    isAdmin: true,
    password: 'guest',
  }),
]);

//guest users
const [bob, jim, steve, guest] = await Promise.all([
  User.create({
    firstName: 'bob',
    email: 'bob@bob.com',
    isAdmin: false,
    password: 'bob',
  }),
  User.create({
    firstName: 'jim',
    email: 'jim@jim.com',
    isAdmin: false,
    password: 'jim',
  }),
  User.create({
    firstName: 'steve',
    email: 'steve@steve.com',
    isAdmin: false,
    password: 'steve',
  }),
]);

return [ben, madi, michelle, guest, bob, jim, steve];
