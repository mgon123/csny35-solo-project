const models = require('./userModel');

const controller = {};

controller.saveFavorite = (req, res, next) => {
  // console.log('saveFavorite');
  const { userID, quoteID } = req.body;
  models.User.findOne({ userID: userID })
    .then(user => {
      if (!user) {
        return createUser(userID, quoteID, next);
      } else {
        return updateUser(userID, quoteID, next);
      }
    });
};

controller.getFavorites = (req, res, next) => {
  console.log('Get Favorite')
  const { userID } = req.body;
  models.User.find({userID: userID})
    .then(data => {
      res.locals.quoteIDs = data[0].saved;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};

controller.deleteFavorite = (req, res, next) => {
  console.log('Delete Favorite')
  const { userID, quoteID } = req.body;
  console.log(quoteID)
  models.User.findOneAndUpdate({userID: userID}, { $pull: { saved: quoteID }})
    .then(data => {
      console.log(data)
      return next();
    })
    .catch(err => {
      return next(err);
    });
};


function createUser(userID, quoteID, next) {
  // console.log('new user');
  const saved = [{ quoteID: quoteID }];
  // console.log(saved)
  models.User.create({ userID: userID, saved: quoteID })
    .then(user => {
      // console.log(user);
      return next();
    })
    .catch(err => {
      // console.log(err);
      return next(err);
    });

}

function updateUser(userID, quoteID, next) {
  // console.log('existing user');
  const findUser = { userID: userID };
  const addToSaved = { quoteID: quoteID };
  // console.log(quoteID)
  models.User.findOneAndUpdate(findUser, { $addToSet: { saved: quoteID } },
    { new: true })
    .then(user => {
      // console.log(user);
      return next();
    })
    .catch(err => {
      // console.log(err);
      return next(err);
    });
}

module.exports = controller;