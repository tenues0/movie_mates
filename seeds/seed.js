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

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const ratings of ratingData) {
    await Ratings.create({
      ...ratings
    });
  }

  for (const movies of movieData) {
    await Movies.create({
      ...movies
    })
  }

  process.exit(0);
};

seedDatabase();