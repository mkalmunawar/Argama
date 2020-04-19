const express = require('express');
const sequelize = require('./configs/sequelize');
const bodyParser = require('body-parser');

const app = express();
const User = require('./models/User');
const path = require("path");
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static('public'));
app.set("views", path.resolve(__dirname, "views"));
app.set('view engine', 'ejs');

// Routes
const UserRoutes = require('./routes/User');


app.use('/user', UserRoutes);

app.get('/', (req, res) => {
    //entries merupakan array yang nanti akan dikirimkan datanya ke route '/'
    res.render('sites/index',
        entries = [
            {
                title: "Rumah 30x30M3",
                caption: "Diikontrakan rumah 30x30m3",
                seller: "Karomah Al-Munawar",
                image: "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale",
            },
            {
                title: "Rumah 21x25mm3",
                caption: "Diikontrakan rumah 21x25m3",
                seller: "Budi Prasetio",
                image: "https://freshome.com/wp-content/uploads/2018/09/contemporary-exterior.jpg",
            },
            {
                title: "Rumah 10x50M3",
                caption: "Diikontrakan tanpa perantara rumah 10x50M3",
                seller: "Beryl Balgoes",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQ0229vv518OZqc9rW4UtRFUKXS2ZxtwUmfDf7XNQ6L4ArRv0_&usqp=CAU",
            },
            {
                title: "Kostan jl. Padalarang",
                caption: "Tersedia 3 Kostan, kamar mandi dalam",
                seller: "Ade Putra",
                image: "https://sustainablehouseday.com/wp-content/uploads/2019/06/Sativa-Santuary-1.jpg"

            },
        ]);
});

app.listen(3000, () => {
    sequelize.sync();
    console.log('Server Dijalankan');
});