const express = require('express');
var Auth = require('../../auth');
const Person = require('../moudule/person');
const token = require('./account');
const router = express.Router();
router.get('/api/information', async (req, res, next) => {
  return res.json(result);
});

router.get('/api/get_booking', async (req, res, next) => {
  const result = await Person.getListBooking();
  console.log('check');
  return res.json(result);
});

router.get('/api/get_booking_by_id', async (req, res, next) => {
  console.log(req.query.id);
  const result = await Person.getBookingById(req.query.id);
  return res.json(result);
});

router.get('/api/get_driver_by_mail', async (req, res, next) => {
  console.log(1);
  const result = await Person.getDriverByMail(req.query.mail);
  return res.json(result);
});

router.get('/api/get_phone_by_mail', async (req, res, next) => {
  console.log(1);
  const result = await Person.getPhoneByMail(req.query.mail);
  return res.json(result);
});

router.get('/api/update_booking_receive', async (req, res, next) => {
  console.log(req.query.id);
  console.log(req.query.mail);
  const result = await Person.updateBookingReceiveByDriver(
    req.query.mail,
    req.query.id
  );
  return res.json(result);
});

router.get('/api/update_booking_finished', async (req, res, next) => {
  console.log(req.query.id);
  // console.log(req.query.mail);
  const result = await Person.updateBookingFinishedByDriver(
    // req.query.mail,
    req.query.id
  );
  return res.json(result);
});

module.exports = router;
