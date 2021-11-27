const mongoose = require("mongoose")

const uri = process.env.DB_URI

function connect() {
    const options = { useNewUrlParser: true }
    mongoose.connect(uri, options).then(
        () => { console.log("You've successfully connected to DB") },
        err =>{ console.log("Can't connect to database: ", err) }
    )
}
 
module.exports = connect