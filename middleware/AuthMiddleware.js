const checkAuthorization = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming user role is stored in req.user
  
      if (allowedRoles.includes(userRole)) {
        next(); // User has required role, proceed to next middleware/controller
      } else {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
    };
  };
  
module.exports = { checkAuthorization };
  