const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    
    // Check if this is the first user, make them admin
    const userCount = await User.count();
    const role = userCount === 0 ? 'admin' : 'user';
    
    await User.create({ name, email, password: hash, role });
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Signup failed');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.redirect('/login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.redirect('/login');

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Store token in session and also send it in response
    req.session.token = token;
    res.cookie('token', token); // Add this line to set token in cookies
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Login failed');
  }
};
