const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({
            username, email, password: hashedpassword
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)


    } catch (err) {
        res.status(500).json(err)
    }
})


//login

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: 'none', secure: true }).status(200).send("user logged out successfully")


    } catch (err) {
        res.status(500).json(err)
    }
})

//logout

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({
            username, email, password: hashedpassword
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)


    } catch (err) {
        res.status(500).json(err)
    }
})

//Refetch

router.get("/refetch", (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router