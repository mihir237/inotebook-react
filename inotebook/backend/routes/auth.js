const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = 'mihirisgoodB$y'

router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password must be atleast 5 charecters').isLength({ min: 5 })
], async (req, res) => {

    // If there are errors, return bad Request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //chech the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken)
        res.json({success:true, token:authtoken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some Error Occured");
    }

})

// authentication a user using: PSOt "api/auth/login". No login required

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cananot be blank').exists(),
], async (req, res) => {

    // If there are errors, return bad Request and the errors 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "email error" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        console.log(password)
        console.log(user.password)
        console.log(passwordCompare)
        if (!passwordCompare) {
            return res.status(400).json({ error: "password error" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true,token:authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interanl server Error")
    }

});

// Get loggedin user details using:POST "api/auth/getuser" Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log("inside from getuser catch error")
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
)

module.exports = router