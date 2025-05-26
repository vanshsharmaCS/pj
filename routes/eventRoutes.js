const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
router.get('/', getAllEvents);
router.post('/', auth, createEvent); // Removed role('admin') to allow any authenticated user to create events
router.put('/:id', auth, role('admin'), updateEvent);
router.delete('/:id', auth, role('admin'), deleteEvent);
module.exports = router;
