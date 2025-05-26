const { Booking, Event } = require('../models');
exports.bookEvent = async (req, res) => {
  const event = await Event.findByPk(req.params.eventId);
  if (!event || event.availableSeats < 1)
    return res.status(400).json({ message: 'No seats available' });
  const booking = await Booking.create({ UserId: req.user.id, EventId: event.id });
  event.availableSeats -= 1;
  await event.save();

  res.redirect('/my-bookings');
};
exports.viewBookings = async (req, res) => {
  const bookings = await Booking.findAll({ where: { UserId: req.user.id }, include: ['Event'] });
  res.render('myBookings', { bookings });
};
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking || booking.UserId !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });

  const event = await Event.findByPk(booking.EventId);
  await booking.destroy();
  event.availableSeats += 1;
  await event.save();

  res.redirect('/my-bookings');
};
