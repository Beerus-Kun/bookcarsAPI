// const sqlserver = require('mssql/msnodesqlv8');
// const config = require('./config1');
// const pools = {};

// // manage a set of pools by name (config will be required to create the pool)
// // a pool will be removed when it is closed
// function getRequest(name = 'default') {
//   if (!Object.prototype.hasOwnProperty.call(pools, name)) {
//     throw new Error('No connection');
//   }
//   //throw new Error('No connection');
//   return pools[name].request();
// }

// // close all pools
// function closeAll() {
//   return Promise.all(
//     Object.values(pools).map((pool) => {
//       return pool.close();
//     })
//   );
// }
// (async () => {
//   const pool = await sqlserver.connect(config);
//   pools['default'] = pool;
//   console.log('Connect successful');
// })();
// module.exports = {
//   closeAll,
//   getRequest,
// };