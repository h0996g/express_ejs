exports.authenticate = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send('Authentication required');
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Admin access required');
  }
};
exports.isLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/users/login');
  }
  next();
};
