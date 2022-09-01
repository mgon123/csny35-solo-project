const controller = {};

controller.saveFavorite = (req, res, next) => {
  console.log('saveFavorite');
  console.log(req.body);
  return next();
};

module.exports = controller;