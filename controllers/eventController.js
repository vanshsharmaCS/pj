const { Event } = require('../models');
const { Op } = require('sequelize');
exports.createEvent = async (req, res) => {
  try {
    // Add the user ID to the event data
    const eventData = {
      ...req.body,
      createdBy: req.user.id,
      availableSeats: req.body.totalSeats // Initialize available seats
    };
    
    const event = await Event.create(eventData);
    res.redirect('/my-events'); // Redirect to the new my-events page
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllEvents = async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
};
exports.updateEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  await event.update(req.body);
  res.json(event);
};
exports.deleteEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  await event.destroy();
  res.json({ message: 'Deleted' });
};

// Add a new function to get events by user
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { createdBy: req.user.id }
    });
    res.render('myEvents', { events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add this to your existing eventController.js
exports.getEventsForBooking = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        dateTime: {
          [Op.gt]: new Date() // Only show future events
        },
        availableSeats: {
          [Op.gt]: 0 // Only show events with available seats
        }
      }
    });
    res.render('events', { events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
