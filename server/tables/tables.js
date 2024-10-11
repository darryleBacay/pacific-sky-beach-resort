import positionsTable from './positionsTable.js';
import usersTable from './usersTable.js';
import userPositionsTable from './userPositionsTable.js'
import activitiesPicturesTable from './activitiesPicturesTable.js';
import activitiesTable from './activitiesTable.js';
import bookedRoomCollectionsTable from './bookedRoomCollectionsTable.js';
import roomCollectionsTable from './roomCollectionsTable.js';
import roomsPicturesTable from './roomsPicturesTable.js';

const tables = async (dbConnection) => {
  const queries = [
    positionsTable,
    usersTable,
    userPositionsTable
    // activitiesPicturesTable,
    // activitiesTable,
    // bookedRoomCollectionsTable,
    // roomCollectionsTable,
    // roomsPicturesTable,
  ];

  for (const query of queries) {
    try {
      await dbConnection.query(query);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }
};

export default tables;