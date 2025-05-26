const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Booking = sequelize.define('Booking', {
  status: { type: DataTypes.STRING, defaultValue: 'booked' }
});
module.exports = Booking;