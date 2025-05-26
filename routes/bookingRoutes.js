const express = require('express');
const router = express.Router();
const { bookEvent, viewBookings, cancelBooking } = require('../controllers/bookingController');
const auth = require('../middlewares/auth');

router.post('/book/:eventId', auth, bookEvent);
router.get('/my', auth, viewBookings);
router.delete('/:id', auth, cancelBooking);

module.exports = router;
