'use sctrict';

const tableEvents = {
    DATA_CHANGED: (tableName) => `/table:${tableName}/dataChanged`
};

export default tableEvents;