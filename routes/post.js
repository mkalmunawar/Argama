const express = require('express')
const router = express.Router();

const post = require('../models/post');
const kost = require('../models/kost');

// create url
router.get('/create', (req, res) => {
    res.render('sites/post/create', { data: null });
});

// insert
router.post('/store', (req, res) => {
    // variable as field on table
    let postData = {
        title: req.body.name,
        user: 1,
    };

    post.create(postData).then((post) => {
        console.log(post.id);
        let kostData = {
            location: req.body.location,
            price: req.body.price,
            room_type: req.body.room_type,
            facilities: req.body.facilities,
            variety: req.body.variety,
            postId: post.id,
        };
        kost.create(kostData).catch((error) => {
            console.log(error);
        });

        res.render('sites/post/index', { data: null });
    })
        .catch((error) => {
            console.log(error);
        })
});

router.get('/index', (req, res) => {
    post.findAll().then((post) => {
        let data = post;
        res.render('sites/post/index', { data: data });
    })
        .catch((error) => {
            console.log(error);
        })
})

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