const User = require('./User');
const Ratings = require('./Ratings');
const Movies = require('./Movies')

User.hasMany(Ratings, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Movies, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Ratings.belongsTo(User, {
  foreignKey: 'user_id'
});

Ratings.belongsTo(Movies, {
  foreignKey: 'movies_id'
});

Movies.hasMany(Ratings, {
  foreignKey: 'movies_id',
  onDelete: 'CASCADE'
});

Movies.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Ratings,
  Movies
};