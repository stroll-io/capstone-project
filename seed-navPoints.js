const NavPoint = require('./server/db/models/navPoint');

const archiWalkCoords = [
  [41.879353, -87.636712],
  [41.879345, -87.632367],
  [41.878131, -87.632356],
  [41.878147, -87.632774],
  [41.876861, -87.632753],
  [41.876941, -87.629298],
  [41.878994, -87.629394],
];

let architectureWalk = await Promise.all([]);
const archFunc = async () => {
  let previous = null;
  for (let i = 0; i < archiWalkCoords.length; i++) {
    let previousId = null;
    let start = i === 0;
    if (previous !== null) {
      previousId = previous.dataValues.id;
    }

    let newPoint = await NavPoint.create({
      location: {
        type: 'Point',
        coordinates: [...archiWalkCoords[i]],
      },
      prev: previousId,
      next: null,
      start: start,
      walkId: 8,
    });

    architectureWalk.push(newPoint);

    if (previous !== null) {
      await previous.update({
        next: newPoint.dataValues.id,
      });
    }
    previous = newPoint;
  }
};

archFunc();

const fullstackWalkCoords = [
  [41.895553, -87.638584],
  [41.893958, -87.638504],
  [41.89393, -87.640011],
  [41.895493, -87.640056],
];

let fullstackWalk = await Promise.all([]);

const fullstackFunc = async () => {
  let previous = null;
  for (let i = 0; i < fullstackWalkCoords.length; i++) {
    let previousId = null;
    let start = i === 0;
    if (previous !== null) {
      previousId = previous.dataValues.id;
    }

    let newPoint = await NavPoint.create({
      location: {
        type: 'Point',
        coordinates: [...fullstackWalkCoords[i]],
      },
      prev: previousId,
      next: null,
      start: start,
      walkId: 1,
    });

    fullstackWalk.push(newPoint);

    if (previous !== null) {
      await previous.update({
        next: newPoint.dataValues.id,
      });
    }
    previous = newPoint;
  }
};

fullstackFunc();

for (let i = 1; i < 6; i++) {
  madi.setWalkedByUser(i);
}

for (let i = 1; i < 4; i++) {
  madi.setSavedByUser(i);
}

//making helper function

async function createNavPoints(walk, walkCoords) {
  let previous = null;
  for (let i = 0; i < walkCoords.length; i++) {
    let previousId = null;
    let start = i === 0;
    if (previous !== null) {
      previousId = previous.dataValues.id;
    }

    let newPoint = await NavPoint.create({
      location: {
        type: 'Point',
        coordinates: [...walkCoords[i]],
      },
      prev: previousId,
      next: null,
      start: start,
      walkId: walk.id,
    });

    walk.push(newPoint);

    if (previous !== null) {
      await previous.update({
        next: newPoint.dataValues.id,
      });
    }
    previous = newPoint;
  }
}

createNavPoints();
