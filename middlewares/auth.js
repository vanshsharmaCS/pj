const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check for token in multiple places
    const token = req.session.token || 
                  req.cookies.token || 
                  req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.redirect('/login');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};
