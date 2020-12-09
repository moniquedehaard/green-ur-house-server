const mongoose = require('mongoose');
const Plant = require('../models/Plants.model');
//require("dotenv").config();

const plants = [
    {
        "name": "Swiss Cheese Plant",
        "latinName": "Monstera Delicioasa",
        "about": "Monstera are species of evergreen tropical vines/shrubs that are native to Central America. Monsteras are famous for their natural leaf-holes, and has led to the rise of its nickname, Swiss Cheese Plant. Monstera Deliciosa leaf holes eventually grow towards the edge and open up as they mature. Therefore these leaves are also known as eliphant ears.",
        "averageHeight": "above 1 m",
        "water": "1 x per week",
        "light": "shadow",
        "strongAirPurifier": true,
        "toxicForPets": true,
        "pictures": ["https://i.etsystatic.com/21063677/r/il/70710b/2483702533/il_794xN.2483702533_1s7r.jpg"],
     },
     {
        "name": "Prayer Plant",
        "latinName": "Calathea Orbifolia",
        "about": "The Calathea Orbifolia is a special houseplant, well-known to its special green leaves. This plant is native to Bolivia, where the population used these leaves for package-matrial for fresh fish. Also this plant is ideal for your pets and easy to care! Win-win!",
        "averageHeight": "around 0.6 m",
        "water": "1 x per week",
        "light": "shadow or half shadow",
        "strongAirPurifier": true,
        "toxicForPets": false,
        "pictures": ["https://cdn.shopify.com/s/files/1/0761/9483/products/calathea-orbifolia-19-productpage_1024x1024.png?v=1584367152"],
     },
     {
        "name": "Alocasia Zebrina",
        "latin_name": "Alocasia Zebrina",
        "about": "This plant has zebra-like stems and large, heart-shaping leaves. The Alocasia Zebrina is a tropical plant and in the jungle it gives shelter for small animals when there  is a tropical rain showser. This plant is not the easiest plant to take care, but with the right conditions this plant will shine in your livingroom!",
        "averageHeight": "around 0.5 m",
        "water": "1 x per week",
        "light": "sun",
        "strongAirPurifier": false,
        "toxicForPets": true,
        "pictures": ["https://cdn.shopify.com/s/files/1/0761/9483/products/alocasia-zebrina-19-productpage_1024x1024.png?v=1596102344"],
     },
     {
        "name": "Fiddle-leaf Fig",
        "latinName": "Ficus Lyrata",
        "about": "The Ficus Lyrata is already a really old plant species and one of the most popular house plants. The roots of this plant are found in Africa and the name comes from the Latin word 'lyra', which is an old musical instrument with reference to the shape of the leaves. ",
        "averageHeight": "around 1.5 to 2 m",
        "water": "1 x per two weeks",
        "light": "sun",
        "strongAirPurifier": "true",
        toxicForPets: true,
        "pictures": ["https://cdn.shopify.com/s/files/1/0761/9483/products/Fycus-lyrata-vertakking-FB-foto_1024x1024.png?v=1574262686"],
     },
     {
        "name": "Chinese Money Plant",
        "latin_name": "Pilea Peperomioides",
        "about": "This Pilea, also known as the Chinese Money Plant or Pancake plant, is native to south China. This plant was very popular in 70s and is already for a couple years really popular. This plant is easy to take care of and a nice thing: this mother plant gives you a lot of baby pileas! ",
        "averageHeight": "around 0.3 m",
        "water": "1 x per week",
        "light": "sun",
        "strongAirPurifier": "true",
        "toxicForPets": false,
        "pictures": ["https://plantada.nl/wp-content/uploads/2020/06/5ee09a4000622-scaled.jpeg"],
     }
]

console.log(plants)

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/project3";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((res) => {
      console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`);
      Plant.create(plants)
          .then(plantsFromDB => {
              console.log(`Created ${plantsFromDB.length} plants`)
              mongoose.connection.close()
          })
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
