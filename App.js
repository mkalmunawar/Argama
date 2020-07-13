const express = require('express');
const sequelize = require('./configs/sequelize');
const bodyParser = require('body-parser');
const bycrypt = require('bcryptjs');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const app = express();
const User = require('./models/User');
const post = require('./models/post');
const kost = require('./models/kost');
const photo = require('./models/photo');
const path = require("path");

// Define Routes
const UserRoutes = require('./routes/user');
const PostRoutes = require('./routes/post');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');


// Routes
app.use('/user', UserRoutes);
app.use('/post', PostRoutes);

app.get('/', (req, res) => {
    //entries merupakan array yang nanti akan dikirimkan datanya ke route '/'
    post.findAll({
        include: [
            { model: kost },
            { model: photo }
        ]
    }).then((post) => {
        let data = post;
        console.log(data)
        res.render('sites/index', { data: data });
    })
        .catch((error) => {
            console.log(error);
        })
});

app.post("/login", async function (req, res) {
    var salt = bycrypt.genSaltSync(10);
    var hash = bycrypt.hashSync(req.body.password, salt);

    let userLogin = await User.findOne({
        where: {
            email: req.body.email,
        }
    });
    if (userLogin && bycrypt.compareSync(req.body.password, hash) == true) {
        req.session.loggedin = true;
        req.session.name = userLogin.name;
        console.log(req.session.name);
        var name = req.session.name;
        res.redirect('/');
    } else {
        res.render('sites/user/signin', { error: 'Email atau password tidak terdaftar!' })
    }
});

app.get('/sign-up', (req, res) => {
    res.render('sites/user/signup', { data: null });
});

app.get('/sign-in', (req, res) => {
    res.render('sites/user/signin', { data: null });
});

app.listen(3000, () => {
    sequelize.sync();
    console.log('Server Dijalankan');
});