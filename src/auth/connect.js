const mysql = require('mysql')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('./src/auth/config.json'))
const { db_host, db_user, db_pass, db_name } = config


/**
 * Connect program to mysql database
*/
const connect = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_name
})

connect.connect((err) => {
    if (err) throw new Error("Cannot connect to database, please check again your configuration files\nError: " + err)
    console.log("Database connected....")
})


module.exports = connect
