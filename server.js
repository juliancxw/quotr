// ------ DEPENDENCIES ------
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const { flash } = require('express-flash-message')
const { setUserVarMiddleware } = require('./middlewares/authentication')


// Routers
const userRouter = require('./routers/user_router')
const dashboardRouter = require('./routers/dashboard_router')
const projectRouter = require('./routers/project_router')

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


// set the view engine that express will use
app.set('view engine', 'ejs')

// setting middleware to accept json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting middleware to accept spoofed methods based on _method query parameter
app.use(methodOverride('_method'))

// setting up middleware to support session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'user_session',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))

app.use(flash({ sessionKeyName: 'flash_message' }))

// setting middleware to ensure global template user variable
app.use(setUserVarMiddleware)

// Static public folder
app.use(express.static('public'))

// ------ ROUTERS ------
app.get('/', function (req, res) {
    res.render('index')
  })

app.use('/users', userRouter)
app.use('/dashboard', dashboardRouter)
app.use('/project', projectRouter)


// ------ LISTENER ------
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    app.listen(port, () => {
      console.log(`QUOTR app listening on port: ${port}`)
    })
  })
