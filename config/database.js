
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect('mongodb+srv://pratikbokde9765:ObFDXxS8alUuM44Y@cluster0.gzglpxp.mongodb.net/AuthApp', {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {console.log("DB connected successfully")})
    .catch( (err) => {
        console.log("DB CONNECTION ISSUES");
        console.error(err);
        process.exit(1);
    } );
}