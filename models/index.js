const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.games = require("./game.model.js")(sequelize, Sequelize);

db.games.hasMany(db.comments, { as: "comments" });
db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});
db.comments.belongsTo(db.games, {
    foreignKey: "gameId",
    as: "games",
});



module.exports = db;