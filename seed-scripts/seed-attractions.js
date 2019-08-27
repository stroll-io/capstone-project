//creating attractions
const Attraction = require('../server/db/models/attraction');

//millenium park
const [
  milleniumMonument,
  cloudGate,
  crownFountain,
  pritzkerPavilion,
  lurieGarden,
  bpBridge,
] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.883931, -87.6238],
    },
    name: 'Millenium Monument',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.882815, -87.623284],
    },
    name: 'Cloud Gate',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.8812, -87.623775],
    },
    name: 'Crown Fountain',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.88327, -87.621802],
    },
    name: 'Jay Pritzker Pavilion',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.881113, -87.621829],
    },
    name: 'Lurie Garden',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.882728, -87.620179],
    },
    name: 'BP Bridge',
    description: '',
  }),
]);

//grant park
const [garden, roseGarden, bhamFountain] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.882289, -87.619441],
    },
    name: `Maggie Daley Park`,
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.883644, -87.617362],
    },
    name: `Cancer Survivors' Garden`,
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.877821, -87.618999],
    },
    name: 'North Rose Garden',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.875797, -87.618957],
    },
    name: 'Buckingham Fountain',
    description: '',
  }),
]);

//museum campus
const [shedd, adler, courtyard, field] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.867652, -87.613544],
    },
    name: 'Shedd Aquarium',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.866365, -87.607117],
    },
    name: 'Adler Planetarium',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.865815, -87.606499],
    },
    name: `America's Courtyard`,
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [],
    },
    name: 'Field Museum',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.866359, -87.616957],
    },
    name: '',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [],
    },
    name: '',
    description: '',
  }),
]);

//michigan ave

const [
  dusable,
  carbide,
  culturalCtr,
  artInstitute,
  archiCenter,
] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.888909, -87.624261],
    },
    name: 'DuSable Bridge',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.88656, -87.624748],
    },
    name: 'Carbide and Carbon Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.883808, -87.624857],
    },
    name: 'Chicago Cultural Center',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.879635, -87.623644],
    },
    name: 'Art Institute of Chicago',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.878699, -87.624933],
    },
    name: 'ArchiCenter',
    description: '',
  }),
]);

//loop architecture I
const [attractionName] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.885374, -87.6317],
    },
    name: 'Thompson Center',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.884677, -87.629567],
    },
    name: 'Delaware Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.883791, -87.627026],
    },
    name: `Marshall Field's Building`,
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.883023, -87.628245],
    },
    name: 'Reliance Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.881818, -87.627476],
    },
    name: 'Carson Pirie Scott Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.878888, -87.636056],
    },
    name: 'Willis Tower',
    description: '',
  }),
]);

//loop architecture II
const [rook, board, prison, modnadnock, fedPlaza] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.8791, -87.631853],
    },
    name: 'Rookery Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.877509, -87.631823],
    },
    name: 'Chicago Board of Trade',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.876585, -87.630433],
    },
    name: 'Metropolitan Correctional Ctr',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.877442, -87.629626],
    },
    name: 'Modnadnock Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.879041, -87.629575],
    },
    name: 'Federal Plaza',
    description: '',
  }),
]);

//sculpture in the loop
const [
  dubuffet,
  picasso,
  miro,
  chagall,
  calder,
  nevelson,
  oldenburg,
] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.884742, -87.631128],
    },
    name: 'Monument with Standing Beast (Sculpture)',
    description: 'Sculpture by Jean Dubuffet',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.88364, -87.62992],
    },
    name: 'Untitled (Sculpture)',
    description: 'Sculpture by Pablo Picasso',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.883031, -87.630316],
    },
    name: 'Chicago (Sculpture)',
    description: 'Sculpture by Joan Miro',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.881129, -87.629708],
    },
    name: 'The Four Seasons (Mosaic)',
    description: 'Mosaic by Marc Chagall',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.878927, -87.62943],
    },
    name: 'Flamingo (Sculpture)',
    description: 'Sculpture by Alexander Calder',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.882182, -87.634148],
    },
    name: 'Dawn Shadows (Sculpture)',
    description: 'Sculpture by Louise Nevelson',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.882005, -87.643085],
    },
    name: 'Batcolumn (Sculpture)',
    description: 'Sculpture by Claes Oldenburg',
  }),
]);

//navy pier
const [
  childrensMuseum,
  crystalGarden,
  navyPierPark,
  funHouse,
  shakespeareTheatre,
  windyBoat,
  pierDeck,
] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.891401, -87.609164],
    },
    name: `Chicago Children's Museum`,
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.891685, -87.608537],
    },
    name: 'Crystal Gardens',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.891719, -87.607832],
    },
    name: 'Navy Pier Park',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.891489, -87.605174],
    },
    name: 'Amazing Chicago Funhouse Maze',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.891517, -87.605761],
    },
    name: 'Chicago Shakespeare Theatre',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.891126, -87.60512],
    },
    name: 'The Windy of Chicago',
    description: 'A boat',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.892392, -87.600738],
    },
    name: 'Navy Pier Observation Deck',
    description: '',
  }),
]);

//mag mile
const [
  wrigley,
  plazaAmericas,
  tribuneTower,
  MCA,
  waterTower,
  presbyterianChurch,
  hancockBuilding,
] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.889806, -87.624595],
    },
    name: 'Wrigley Building',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.890157, -87.624653],
    },
    name: 'Plaza of the Americas',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.890477, -87.623274],
    },
    name: 'Tribute Tower',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.897258, -87.621244],
    },
    name: 'Museum of Contemporary Art',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.89716, -87.624418],
    },
    name: 'Water Tower Place',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.898984, -87.62468],
    },
    name: 'Fourth Presbyterian Church',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.898776, -87.622829],
    },
    name: 'John Hancock Building/ 360 Sky Deck',
    description: '',
  }),
]);

//lincoln park zoo
const [
  northPond,
  peggyNotebaert,
  lilyPool,
  lincolnParkZoo,
  lincolnParkConversatory,
] = await Promise.all([
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.92803, -87.636693],
    },
    name: 'North Pond Nature Sanctuary',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.926663, -87.63512],
    },
    name: 'Peggy Notebaert Nature Museum',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.924942, -87.633975],
    },
    name: 'Alfred Caldwell Lily Pool',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.92327, -87.63337],
    },
    name: 'Lincoln Park Zoo',
    description: '',
  }),
  Attraction.create({
    location: {
      type: 'Point',
      coordinates: [41.924136, -87.635296],
    },
    name: 'Lincoln Park Conservatory',
    description: '',
  }),
]);

return [
  milleniumMonument,
  cloudGate,
  crownFountain,
  pritzkerPavilion,
  lurieGarden,
  bpBridge,
  garden,
  roseGarden,
  bhamFountain,
  shedd,
  adler,
  courtyard,
  field,
  dusable,
  carbide,
  culturalCtr,
  artInstitute,
  archiCenter,
  rook,
  board,
  prison,
  modnadnock,
  fedPlaza,
  dubuffet,
  picasso,
  miro,
  chagall,
  calder,
  nevelson,
  oldenburg,
  childrensMuseum,
  crystalGarden,
  navyPierPark,
  funHouse,
  shakespeareTheatre,
  windyBoat,
  pierDeck,
  wrigley,
  plazaAmericas,
  tribuneTower,
  MCA,
  waterTower,
  presbyterianChurch,
  hancockBuilding,
  northPond,
  peggyNotebaert,
  lilyPool,
  lincolnParkZoo,
  lincolnParkConversatory,
];
