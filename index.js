'user strict'

const express = require('express')
const mongoose = require('mongoose')
const es6Renderer = require('express-es6-template-engine')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const falist = require('font-awesome-list')
const port = 8080
const db = mongoose.connection
mongoose.connect('mongodb://localhost/user')
const Posts = require('./models/post')
const User = require('./models/users')
const messanger = require('./routes/messanger')
const profile = require('./routes/user-prof')
const logreg = require('./routes/log-reg')
const blog = require('./routes/blog_back_end')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const compileSass = require('express-compile-sass')
const flash = require('express-flash-messages')
const expressValidator = require('express-validator')
const passport = require('passport')
const cookieParser = require('cookie-parser')






app.use(flash())
app.use(expressValidator())
const root = process.cwd();
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(compileSass({
    root: root,
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: true, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false // If true, will log to console.error on errors
}))



// socket 

// const server = require('http').Server(express)

const server = app.listen(port, () => {
    console.log(`server is on port: ${port}`)
})
const io = require('socket.io').listen(server)

io.on('connection', socket => {
    console.log(socket.handshake)
    socket.emit('connection', {
        hello: 'hey'
    })
    // socket.emit('new', (greetings))
})




db.on('error', err => {
    throw err
})

db.once('open', () => {
    console.log('MongoDB connected')
})

app.use('/public', express.static(path.join(__dirname, 'public')))
// app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())








app.get('/swap', (req, res) => {
    res.render('swap.pug')
})





app.get('/', (req, res) => {

    Posts.find({}, (err, posts) => {
        if (err) throw err
        else
            res.render('home', {
                posts,
            })
    })
})




// Navigation Bar.

app.get('/settings', (req, res) => {
    res.sendFile(`${__dirname}/templates/settings.html`)
})


app.get('/messages', (req, res) => {
    res.render('messages.pug')
})





app.post('/post/:textarea', (req, res) => {
    let postt = new Posts()
    postt.post = req.params.textarea
    date = new Date()
    postt.date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    postt.save(err => {
        if (err) throw err
        else return res.status(200).send(postt)
    })
})

app.get('/delete/post/:id', (req, res) => {

    Posts.remove({
        _id: req.params.id
    }, err => {
        if (err) throw err
        else return res.status(200).send()
    })
})



app.use('/messanger', messanger)
app.use('/profile', profile)
app.use('/login', logreg)
app.use('/blog', blog)

app.use(function (req, res, next) {
    res.status(404).render('404')
})