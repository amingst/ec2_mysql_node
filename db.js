//TODO: refactor for html
const { Sequelize, DataTypes } = require('sequelize');

const newInstance = (db_name, username, password, opts) => {
    const sequelize = new Sequelize(db_name, username, password, opts)

    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Database: ${sequelize.getDatabaseName()}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize;
}

const defineModel = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
    },
        {
            tableName: 'Users'
        })
    

    return User;
}

const syncModel = async (sequelize) => {
    try {
        await sequelize.sync({ force: true })
        console.log("Model successfully synced")
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

module.exports = {
    newInstance,
    defineModel,
    syncModel
}