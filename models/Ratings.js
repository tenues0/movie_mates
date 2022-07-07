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
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    // movies_id: {
    //     type: DataTypes.INTEGER,
    //     //allowNull: false,
    //     references: {
    //         model: 'movies',
    //         key: 'id',
    //     },
    // },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating',
});

module.exports = Ratings;