const express = require('express');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authMiddleware = require('./middlewares/auth');
const { specs, swaggerUi } = require('./swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard');
});
app.get('/create-event', authMiddleware, (req, res) => {
  res.render('createEvent');
});
app.get('/book-event', authMiddleware, (req, res) => {
  res.render('bookEvent');
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
app.get('/my-events', authMiddleware, (req, res) => {
  // Call the controller function to get events by user
  require('./controllers/eventController').getMyEvents(req, res);
});
app.get('/events', authMiddleware, (req, res) => {
  require('./controllers/eventController').getEventsForBooking(req, res);
});

app.get('/my-bookings', authMiddleware, (req, res) => {
  require('./controllers/bookingController').viewBookings(req, res);
});
// Use this temporarily to recreate tables, then change back to { alter: true }
sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('✅ Server started on port', process.env.PORT || 3000);
  });
});
app.use(express.static('public'));

// Add Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
