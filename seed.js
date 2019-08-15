const { db } = require("./server/db");
const User = require("./server/db/user");
const Navpoints = require("./server/db/navpoints");
const Walk = require('./server/db/walk');
const Favorite = require('./server/db/favorite');
const Pin = require('./server/db/pin')


const users = [
  {
    userName: "ben",
    isAdmin: true,
    password: "abcdefg"
  },
  { userName: "madi", isAdmin: true, password: "abcdefg" },
  { userName: "michelle", isAdmin: true, password: "abcdefg" }
];

const walks = [
  {description: "My walk from Fullstack to Ogilvie",
  category: 'nature',
  imageUrl: null,

},

]

const navpoints = [
  {
    latitude: 41.895546,
    longitude: -87.639462,
    walkId: 1,
    prev: null,
    next: null
  },
  {
    latitude: 41.895498,
    longitude: -87.641509,
    walkId: 1,
    prevId: 1,
    nextId: 3
  },
  {
    latitude: 41.893483,
    longitude: -87.641477,
    walkId: 1,
    prevId: 2,
    nextId: 4
  },
  {
    latitude: 41.889138,
    longitude: -87.638076,
    walkId: 1,
    prevId: 3,
    nextId: 5
  },
  {
    latitude: 41.889074,
    longitude: -87.640007,
    walkId: 1,
    prevId: 4,
    nextId: 6
  },
  {
    latitude: 41.88394,
    longitude: -87.639782,
    walkId: 1,
    prevId: 5,
    nextId:  null,
  }
];

const favorites = [
  {
    userId: 1,
    walkId: 1
  }
]

const userPins = [
  {
    imageUrl:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231413/Labrador-Retriever-MP.jpg",
    text: "I saw a cute puppy here!",
    latitude: 41.88394,
    longitude: -87.640017,
  }
];
