const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Movies extends Model {}

Movies.init({
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
    // post_content: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   date_created: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     defaultValue: DataTypes.NOW,
    //   },
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
    modelName: 'movies',
});

module.exports = Movies;