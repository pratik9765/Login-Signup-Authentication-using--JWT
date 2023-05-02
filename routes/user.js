const express = require('express')
const router = express.Router();
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

const {login, signup} = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);

// testing protected route for single middleware
router.get("/test", auth, (req,res) => {
    res.json({
        success:true,
        message: "Welcome to the protected route for the test"
    });
});


// protected routes
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message: "Welcome to the protected route for the student"
    });
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message: "Welcome to the protected route for the admin"
    });
});

module.exports = router; 