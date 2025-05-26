const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.STRING,
  dateTime: DataTypes.DATE,
  location: DataTypes.STRING,
  totalSeats: DataTypes.INTEGER,
  availableSeats: DataTypes.INTEGER,
  createdBy: DataTypes.INTEGER // Add this field to track who created the event
});
module.exports = Event;
