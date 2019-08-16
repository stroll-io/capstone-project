const { green, red } = require('chalk');
const db = require('./server/db');
const Walk = require('./server/db/models/walk');
const User = require('./server/db/models/user');
// const Navpoints = require('./server/db/navPoints');

// // const Favorite = require('./server/db/favorite');
// const Pin = require('./server/db/userPin');

// const navpoints = [
//   {
//     latitude: 41.895546,
//     longitude: -87.639462,
//     walkId: 1,
//     prev: null,
//     next: null
//   },
//   {
//     latitude: 41.895498,
//     longitude: -87.641509,
//     walkId: 1,
//     prevId: 1,
//     nextId: 3
//   },
//   {
//     latitude: 41.893483,
//     longitude: -87.641477,
//     walkId: 1,
//     prevId: 2,
//     nextId: 4
//   },
//   {
//     latitude: 41.889138,
//     longitude: -87.638076,
//     walkId: 1,
//     prevId: 3,
//     nextId: 5
//   },
//   {
//     latitude: 41.889074,
//     longitude: -87.640007,
//     walkId: 1,
//     prevId: 4,
//     nextId: 6
//   },
//   {
//     latitude: 41.88394,
//     longitude: -87.639782,
//     walkId: 1,
//     prevId: 5,
//     nextId:  null,
//   }
// ];

// const favorites = [
//   {
//     userId: 1,
//     walkId: 1
//   }
// ]

// const userPins = [
//   {
//     imageUrl:
//       "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231413/Labrador-Retriever-MP.jpg",
//     text: "I saw a cute puppy here!",
//     latitude: 41.88394,
//     longitude: -87.640017,
//   }
// ];

const seed = async () => {
  try {
    await db.sync({ force: true });
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
    ]);

    const [
      ogilvie,
      westTown,
      hydePark,
      millenium,
      grant,
      art,
      museum,
      loop,
    ] = await Promise.all([
      Walk.create({
        name: `Ben's Commute`,
        description: 'My walk from Fullstack to Ogilvie',
        category: 'nature',
        imageUrl: null,
        userId: 1,
      }),
      Walk.create({
        name: `Madi's Commute`,
        description: 'My walk from home to Fullstack',
        category: 'scenic',
        imageUrl: null,
        userId: 2,
      }),
      Walk.create({
        name: `Michelle's Commute`,
        description: 'My walk from my apartment to my car',
        category: 'dog',
        imageUrl: null,
        userId: 3,
      }),
      Walk.create({
        name: `Millennium Park`,
        description: 'Lurie Garden, the Bean, and all that jazz',
        category: 'scenic',
        imageUrl: null,
      }),
      Walk.create({
        name: `Grant Park`,
        description: 'A big lawn with a big fountain to match',
        category: 'nature',
        imageUrl: null,
      }),
      Walk.create({
        name: `The Art Institute`,
        description: 'Many expensive paintings',
        category: 'architecture',
        imageUrl: null,
      }),
      Walk.create({
        name: `Museum Campus`,
        description: 'The Planetarium, Shedd Aquarium, and Field Museum',
        category: 'historical',
        imageUrl: null,
      }),
      Walk.create({
        name: `The Loop Architectural Walk`,
        description: 'Tall buildings for tall folks',
        category: 'architecture',
        imageUrl: null,
      }),
    ]);

    return [
      ben,
      madi,
      michelle,
      ogilvie,
      westTown,
      hydePark,
      millenium,
      grant,
      art,
      museum,
      loop,
    ];
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      // db.close();
    })
    .catch(err => {
      console.error(red('Oh no, something went wrong!'));
      console.error(err);
      // db.close();
    });
}
