module.exports = function(req, _res, next) {
  console.log(`${req.method}: ${req.path}: ${JSON.stringify(req.query)}`);
  next();
};