const User = require('./User');
const Ratings = require('./Ratings');
const Movies = require('./Movies')

User.hasMany(Ratings, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Ratings.belongsTo(User, {
  foreignKey: 'user_id'
});

Movies.hasMany(Ratings, {
  foreignKey: 'movies_id',
  onDelete: 'CASCADE'
});

Ratings.belongsTo(Movies, {
  foreignKey: 'rating_id'
})

module.exports = {
  User,
  Ratings,
  Movies
};