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

// Add pagination and filtering to getEvents method
exports.getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    // Filter options
    const whereClause = {};
    
    if (req.query.location) {
      whereClause.location = req.query.location;
    }
    
    if (req.query.dateFrom && req.query.dateTo) {
      whereClause.dateTime = {
        [Op.between]: [new Date(req.query.dateFrom), new Date(req.query.dateTo)]
      };
    } else if (req.query.dateFrom) {
      whereClause.dateTime = {
        [Op.gte]: new Date(req.query.dateFrom)
      };
    } else if (req.query.dateTo) {
      whereClause.dateTime = {
        [Op.lte]: new Date(req.query.dateTo)
      };
    }
    
    if (req.query.search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${req.query.search}%` } },
        { description: { [Op.like]: `%${req.query.search}%` } }
      ];
    }
    
    // Get events with pagination
    const { count, rows: events } = await Event.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['dateTime', 'ASC']]
    });
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    res.status(200).json({
      success: true,
      data: events,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
