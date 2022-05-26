const config = require('../../config')
const sql = require('mssql')
const db = {};
// db.getInformationPersonById = async (id) => {
//   const request = getRequest();
//   const result = await request
//     .input('id', parseInt(id))
//     .execute('SP_GetInformationById');
//   return result.recordset[0];
// };
// db.getListBooking = async () => {
//   const request = getRequest();
//   const result = await request.execute('SP_GET_LIST_BOOKING');
//   console.log(result.recordset);
//   return result.recordset;
// };
// db.getBookingById = async (id) => {
//   console.log(id);
//   const request = getRequest();
//   const result = await request
//     .input('id', parseInt(id))
//     .execute('SP_GET_BOOKING_BY_ID');
//   return result.recordset[0];
// };
// db.getDriverByMail = async (mail) => {
//   const request = getRequest();
//   const result = await request
//     .input('mail', mail)
//     .execute('SP_GET_DRIVER_BY_Mail');
//   return result.recordset[0];
// };

// db.getPhoneByMail = async (mail) => {
//   const request = getRequest();
//   const result = await request
//     .input('mail', mail)
//     .execute('SP_GET_PHONE_BY_MAIL');
//   return result.recordset[0];
// };


// //==============================

// db.updateBookingReceiveByDriver = async (mail, id) => {
//   const request = getRequest();
//   const result = await request
//     .input('mail', mail)
//     .input('id', parseInt(id))
//     .execute('SP_RECEIVE_DRIVER_TO_BOOKING');
// };


db.getInformationPersonById = async (id) => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);
    pool
      .request()
      .input('id', sql.INT, id)
      .execute('SP_GetInformationById', (err, result) => {
        if (err) return reject(err);
        else resolve(result.recordset[0]);
      });
  });
};
db.getListBooking = async () => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);
    pool.request().execute('SP_GET_LIST_BOOKING', (err, result) => {
      if (err) return reject(err);
      else resolve(result.recordset);
    });
  });
};
db.getBookingById = async (id) => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);
    pool
      .request()
      .input('id', sql.INT, id)
      .execute('SP_GET_BOOKING_BY_ID', (err, result) => {
        if (err) return reject(err);
        else resolve(result.recordset[0]);
      });
  });
};
db.getDriverByMail = async (mail) => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);
    pool
      .request()
      .input('mail', sql.NVARCHAR(100), mail)
      .execute('SP_GET_DRIVER_BY_Mail', (err, result) => {
        if (err) return reject(err);
        else resolve(result.recordset[0]);
      });
  });
};

db.getPhoneByMail = async (mail) => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);
    pool
      .request()
      .input('mail', sql.NVARCHAR(100), mail)
      .execute('SP_GET_PHONE_BY_MAIL', (err, result) => {
        if (err) return reject(err);
        else resolve(result.recordset[0]);
      });
  });
};

db.updateBookingReceiveByDriver = async (mail, id) => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);

    pool
      .request()
      .input('mail', sql.NVARCHAR(100), mail)
      .input('id', sql.INT, id)
      .execute('SP_RECEIVE_DRIVER_TO_BOOKING', (err, result) => {
        if (err) return reject(err);
        else resolve(result.recordset);
      });
  });
};

db.updateBookingFinishedByDriver = async (id) => {
  return new Promise(async (resolve, reject) => {
    const pool = await sql.connect(config);

    pool
      .request()
      // .input('mail', sql.NVARCHAR(100), mail)
      .input('id', sql.INT, id)
      .execute('SP_UPDATE_STATE', (err, result) => {
        if (err) return reject(err);
        else resolve(result.recordset);
      });
  });
};
module.exports = db;