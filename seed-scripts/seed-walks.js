const Walk = require('../server/db/models/walk');

const [fullstack, ogilvie, westTown, hydePark] = await Promise.all([
  Walk.create({
    name: `Fullstack Wonder Walk`,
    description: 'A great lunch walk around Fullstack',
    category: 'scenic',
    imageUrl: 'scenic.png',
    userId: 2,
    start: {
      type: 'Point',
      coordinates: [41.895553, -87.638584],
    },
  }),
  Walk.create({
    name: `Ben's Commute`,
    description: 'My walk from Fullstack to Ogilvie',
    category: 'nature',
    imageUrl: 'nature.png',
    userId: 1,
    start: {
      type: 'Point',
      coordinates: [41.879353, -87.636712],
    },
  }),
  Walk.create({
    name: `Madi's Commute`,
    description: 'My walk from home to Fullstack',
    category: 'scenic',
    imageUrl: 'scenic.png',
    userId: 2,
    start: {
      type: 'Point',
      coordinates: [41.879345, -87.632367],
    },
  }),

  Walk.create({
    name: `Michelle's Commute`,
    description: 'My walk from my apartment to my car',
    category: 'dog',
    imageUrl: 'dog.png',
    userId: 3,
    start: {
      type: 'Point',
      coordinates: [41.878131, -87.632356],
    },
  }),
]);

const [
  milleniumPark,
  grantPark,
  museumCampus,
  michiganAve,
  theLoop,
  loopSculpture,
  navyPier,
  lincolnPark,
] = await Promise.all([
  Walk.create({
    name: `Millennium Park`,
    description: 'Cloud Gate, Crown Fountain, Lurie Garden',
    category: 'architecture',
    imageUrl: 'architecture.png',
    start: {
      type: 'Point',
      coordinates: [41.884278, -87.624225],
    },
  }),
  Walk.create({
    name: `Grant Park`,
    description: 'Rolling acres of green space',
    category: 'nature',
    imageUrl: 'nature.png',
    start: {
      type: 'Point',
      coordinates: [41.882289, -87.619441],
    },
  }),
  Walk.create({
    name: `Museum Campus`,
    description:
      'Adler Planetarium, Shedd Aquarium, and Field Museum of Natural History',
    category: 'historical',
    imageUrl: 'history.png',
    start: {
      type: 'Point',
      coordinates: [41.867492, -87.619216],
    },
  }),
  Walk.create({
    name: `Michigan Ave`,
    description: 'Tall buildings for tall folks',
    category: 'architecture',
    imageUrl: 'architecture.png',
    start: {
      type: 'Point',
      coordinates: [41.888909, -87.624261],
    },
  }),
  Walk.create({
    name: `The Loop Architectural Walk`,
    description: 'Chicago Architectural Highlights: Part I',
    category: 'architecture',
    imageUrl: 'architecture.png',
    start: {
      type: 'Point',
      coordinates: [41.884567, -87.632226],
    },
  }),
  Walk.create({
    name: 'Sculpture in the Loop',
    description: `Chicago's public art collection on display across the Loop`,
    category: 'architecture',
    imageUrl: 'architecture.png',
    start: {
      type: 'Point',
      coordinates: [41.884567, -87.632226],
    },
  }),
  Walk.create({
    name: 'Navy Pier',
    description: `Chicago's top tourist attractions, great for family entertainment`,
    category: 'architecture',
    imageUrl: 'architecture.png',
    start: {
      type: 'Point',
      coordinates: [41.891353, -87.609756],
    },
  }),
  Walk.create({
    name: 'Magnificent Mile',
    description:
      'The grand dame of shopping streets, rife with historical buildings',
    category: 'architecture',
    imageUrl: 'architecture.png',
    start: {
      type: 'Point',
      coordinates: [41.88895, -87.624381],
    },
  }),
  Walk.create({
    name: 'Lincoln Park Zoo',
    description: 'A nature walk, traversing the zoo and multiple ponds',
    category: 'nature',
    imageUrl: 'nature.png',
    start: {
      type: 'Point',
      coordinates: [41.930322, -87.637067],
    },
  }),
]);

return [
  fullstack,
  ogilvie,
  westTown,
  hydePark,
  milleniumPark,
  grantPark,
  museumCampus,
  michiganAve,
  theLoop,
  loopSculpture,
  navyPier,
  lincolnPark,
];
