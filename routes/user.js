const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');

var salt = bycrypt.genSaltSync(10);

const User = require('../models/User');

// insert
router.post('/create', (req, res) => {
    // variable as field on table
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, salt),
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
    };

    User.create(data).then((user) => {
        res.render('sites/user/create', { data: data });
    })
        .catch((error) => {
            console.log(error);
        })
});

// menamplikan seluruh data pada table user
router.get('/find', (req, res) => {
    User.findAll().then((user) => {
        let data = user;
        res.render('sites/user/index', { data: data });
    })
        .catch((error) => {
            console.log(error);
        })
})

// menampilkan detail user
router.get('/show/:id', (request, response) => {
    let id = request.params.id;
    User.findAll({
        where: {
            id: id,
        }
    }).then((user) => {
        let data = user;
        response.render('sites/user/show', { data: data });
    })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;