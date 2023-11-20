
function restaurantMiddleware(req, res, next) {
    const user = req.user;
    if(user && user.type === "restaurant") {
      next();
    } else {
      res.status(401).send("Invalid token");
    }
  
}

module.exports = restaurantMiddleware;
