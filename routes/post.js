const express = require('express')
const router = express.Router();

const post = require('../models/post');
const kost = require('../models/kost');
const photo = require('../models/photo');

// create url
router.get('/create', (req, res) => {
    res.render('sites/post/create', { data: null });
});

// insert pada table post, kost dan photo
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
        var cover = req.files.cover;
        var imgOne = req.files.imgOne;
        var imgTwo = req.files.imgTwo;
        var imgThree = req.files.imgThree;
        let photos = {
            cover: cover.name,
            imgOne: imgOne.name,
            imgTwo: imgTwo.name,
            imgThree: imgThree.name,
            postId: post.id,
        }
        kost.create(kostData).catch((error) => {
            console.log(error);
        });

        photo.create(photos).then((data) => {
            cover.mv('./public/photos/' + '01' + req.files.cover.name);
            imgOne.mv('./public/photos/' + '02' + req.files.imgOne.name);
            imgTwo.mv('./public/photos/' + '03' + req.files.imgTwo.name);
            imgThree.mv('./public/photos/' + '04' + req.files.imgThree.name);
        })

        res.redirect('/post/index');
    })
        .catch((error) => {
            console.log(error);
        })
});

// menampilkan tampilan table post
router.get('/index', (req, res) => {
    post.findAll().then((post) => {
        let data = post;
        res.render('sites/post/index', { data: data });
    })
        .catch((error) => {
            console.log(error);
        })
})

// menampilkan halaman detail
router.get('/show/:id', (request, response) => {
    let id = request.params.id;
    post.findOne({
        where: {
            id: id,
        },
        include: [
            { model: kost },
            { model: photo }
        ]
    }).then((post) => {
        let data = post;
        console.log(data);
        response.render('sites/post/show', { data: data });
    })
        .catch((error) => {
            console.log(error);
        });
});

// menampilkan halam form edit
router.get('/edit/:id', (request, response) => {
    let id = request.params.id;
    post.findOne({
        where: {
            id: id,
        },
        include: [
            { model: kost },
            { model: photo }
        ]
    }).then((post) => {
        let data = post;
        console.log(data);
        response.render('sites/post/edit', { data: data });
    })
        .catch((error) => {
            console.log(error);
        });
});

// melakukan action update pada table post, kost, photos
router.post('/update/:id', (req, res) => {
    // variable as field on table
    let id = request.params.id;
    let postData = {
        title: req.body.name,
        user: 1,
    };
    post.findOne({
        where: {
            id: id,
        }
    }).then((data) => {
        if (data) {
            post.update(postData).then((kostData) => {
                let kostUpdate = {
                    location: req.body.location,
                    price: req.body.price,
                    room_type: req.body.room_type,
                    facilities: req.body.facilities,
                    variety: req.body.variety,
                };
                var cover = req.files.cover;
                var imgOne = req.files.imgOne;
                var imgTwo = req.files.imgTwo;
                var imgThree = req.files.imgThree;
                let photos = {
                    cover: cover.name,
                    imgOne: imgOne.name,
                    imgTwo: imgTwo.name,
                    imgThree: imgThree.name,
                }
                kost.findOne({
                    where: {
                        postId: postData.id
                    }
                }).then((kostEntry) => {
                    kost.update(kostUpdate).catch((error) => {
                        console.log(error);
                    });
                })

                photo.findOne({
                    where: {
                        postId: postData.id
                    }
                }).then((kostEntry) => {
                    photo.update(photos).then((photosEnrty) => {
                        cover.mv('./public/photos/' + '01' + req.files.cover.name);
                        imgOne.mv('./public/photos/' + '02' + req.files.imgOne.name);
                        imgTwo.mv('./public/photos/' + '03' + req.files.imgTwo.name);
                        imgThree.mv('./public/photos/' + '04' + req.files.imgThree.name);
                    })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                res.redirect('/post/index');
            })
        }
    })
        .catch((error) => {
            console.log(error);
        });
});

// melakukan action delete pada table post, kost, photos
router.get('/destroy/:id', (request, response) => {
    let id = request.params.id;
    kost.destroy({
        where: {
            postId: id,
        }
    }).then((data) => {
        photo.destroy({
            where: {
                postId: id,
            }
        }).then((data) => {
            post.destroy({
                where: {
                    id: id,
                }
            }).then((data) => {
                response.redirect('/post/index');
            })
        })
    })
});
module.exports = router;