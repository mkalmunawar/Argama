// definisi library
const express = require('express');
const sequelize = require('./configs/sequelize');
const bodyParser = require('body-parser');
const bycrypt = require('bcryptjs');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();

// pemanggilan model
const User = require('./models/User');
const post = require('./models/post');
const kost = require('./models/kost');
const photo = require('./models/photo');
const path = require("path");

// Define Routes
const UserRoutes = require('./routes/user');
const PostRoutes = require('./routes/post');

// definisi Body parser untuk pengambilan name form pada html
app.use(bodyParser.urlencoded({
    extended: true
}));
// definisi library untuk mengupload file
app.use(fileUpload());

// membuat folder public statis
app.use(express.static('public'));
// membuat session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// mendefinisikan path views dan frontendnya
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');


// Routes
app.use('/user', UserRoutes);
app.use('/post', PostRoutes);

// route index
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

// route login dan action login
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

// route untuk mebuka halaman daftar
app.get('/sign-up', (req, res) => {
    res.render('sites/user/signup', { data: null });
});

// route untuk menampilkan halaman login
app.get('/sign-in', (req, res) => {
    res.render('sites/user/signin', { data: null });
});

// menjalankan server node pada port 3000 dan sync db menggunakan sequelize
app.listen(3000, () => {
    sequelize.sync();
    console.log('Server Dijalankan');
});