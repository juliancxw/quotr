const { UserModel } = require('../models/users')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const { createHash } = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

    registerForm: (req, res) => {

        res.render('users/register')

    },

    loginForm: async (req, res) => {
        const errMsgArr = await req.consumeFlash('error')
        res.render('users/login', {
            errMsgArr: errMsgArr,
            email: req.query.email
        })

    },

    registerUser: async (req, res) => {
        // validate first & last name
        if (!req.body.first_name || !req.body.last_name) {
            console.log('name error')
            res.redirect('/users/register')
            return
        }

        // ensure password and confirm password matches
        if (req.body.password !== req.body.confirm_password) {
            console.log('name error')
            res.redirect('/users/register')
            return
        }

        // ensure that there is no existing user account with the same email given
        let user = null
        try {
            user = await UserModel.findOne({ email: req.body.email })
        } catch (err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        if (user) {
            res.redirect('/users/register')
            return
        }

        const timestampNow = moment().utc()
        
        // hashing using bcrypt
        const generatedHash = await bcrypt.hash(req.body.password, saltRounds)
        const userid = uuidv4()
        try {
            await UserModel.create({
                userid: userid,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                hash: generatedHash,
                created_at: timestampNow,
                updated_at: timestampNow,
            })
        } catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        
        res.redirect('/dashboard')
    },

    loginUser: async (req, res) => {
        
        let user = null
        let inputEmail = req.body.email
        let inputPassword = req.body.password

        try {
            user = await UserModel.findOne({ email: inputEmail })
        } catch(err) {
            console.log(err)
            await req.flash('error', 'Unable to connect to DB')
            res.redirect('/users/login')
            return
        }

        // Check if user exist
        if (!user) {
            console.log('invalid user')
            await req.flash('error', 'invalidEmail')
            res.redirect('/users/login?email='+inputEmail)
            return
        }

        // Check if password is valid
        const isValidPassword = await bcrypt.compare(inputPassword, user.hash)
        if (!isValidPassword) {
            console.log('invalid password')
            await req.flash('error', 'invalidPassword')
            res.redirect('/users/login?email='+inputEmail)
            return
        }

        // Authentication successful
        req.session.user = user
        res.redirect('../dashboard')
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }

}