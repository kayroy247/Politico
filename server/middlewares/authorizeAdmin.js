const authorizeAdmin = (req, res, next) => {
  if (!req.decoded.isadmin) {
    return res.status(403).json({
      status: 403,
      error: 'Auth failed, User not authorized'
    });
  }
  return next();
};

export default authorizeAdmin;
