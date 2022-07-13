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
    rating_content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
        },
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    movies_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'movies',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
   
}, 
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating',
});

module.exports = Ratings;