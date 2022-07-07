const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Ratings extends Model {}

Ratings.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'movies',
            key: 'id',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating',
});

module.exports = Ratings;