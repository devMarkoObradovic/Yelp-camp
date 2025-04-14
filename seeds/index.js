const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 3; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '67f53fdf55bda7993540b634',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`, this was beginer seed
            description: 'Ovo je neki opiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiisssssss',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            // clouditory imges
            images: [
                {
                    url: 'https://res.cloudinary.com/dxgefvtbf/image/upload/v1744417404/YelpCamp/kyqwxr4sndc8vzu1y6mu.jpg',
                    filename: 'YelpCamp/kyqwxr4sndc8vzu1y6mu',
                  },
                  {
                    url: 'https://res.cloudinary.com/dxgefvtbf/image/upload/v1744417404/YelpCamp/kyqwxr4sndc8vzu1y6mu.jpg',
                    filename: 'YelpCamp/kyqwxr4sndc8vzu1y6mu',
                  },
                  {
                    url: 'https://res.cloudinary.com/dxgefvtbf/image/upload/v1744417404/YelpCamp/kyqwxr4sndc8vzu1y6mu.jpg',
                    filename: 'YelpCamp/kyqwxr4sndc8vzu1y6mu',
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
})
