const express = require("express");
const app = express();

require('dotenv').config();
const PORT = 3000;

// cookie parser?  whist is this and why we need this

app.use(express.json());

require("./config/database").connect(); 

// route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(`Appp is running at port number ${PORT}`);
})