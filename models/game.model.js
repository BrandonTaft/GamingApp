module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        igdb_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        cover: {
            type: Sequelize.STRING
        },
        genres: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
        },
        follows: {
            type: Sequelize.STRING
        },
        platforms: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
        },
        url: {
            type: Sequelize.STRING
        },
        videos: {
            type: Sequelize.STRING
        },
        summary: {
            type: Sequelize.TEXT
        },
        release_date: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        },
        rating_count: {
            type: Sequelize.STRING
        }
    });

    return Game;
};