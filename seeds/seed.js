const sequelize = require('../config/connection');
const {
  Movies,
  Ratings,
  User
} = require('../models')

const userData = require('./userData.json');
const ratingData = require('./ratingData.json');
const movieData = require('./movieData.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true
  });

  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  } catch (err) {
    console.log(err);
  };

  try {
    await Movies.bulkCreate(movieData);
  } catch (err) {
    console.log(err);
  };
  
  try {
    await Ratings.bulkCreate(ratingData);
  } catch (err) {
    console.log(err);
  };



  process.exit(0);
};

seedDatabase();