const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c44c41e8ae3c42b434bdf4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images:[    
                {
                url: 'https://res.cloudinary.com/djyoocywk/image/upload/v1658558724/YelpCamp/lp29vhednzgav4vv0xvj.jpg',
                filename: 'YelpCamp/lp29vhednzgav4vv0xvj'
              },
              {
                url: 'https://res.cloudinary.com/djyoocywk/image/upload/v1658558725/YelpCamp/ckfbqbfgvojjo8xccsow.jpg',
                filename: 'YelpCamp/ckfbqbfgvojjo8xccsow'
              }
          ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})