const mongoose = require("mongoose");
const Plant = require("../models/Plants.model");
//require("dotenv").config();

const plants = [
  {
    name: "Swiss Cheese Plant",
    latinName: "Monstera Delicioasa",
    about:
      "Monstera are species of evergreen tropical vines/shrubs that are native to Central America. Monsteras are famous for their natural leaf-holes, and has led to the rise of its nickname, Swiss Cheese Plant. Monstera Deliciosa leaf holes eventually grow towards the edge and open up as they mature. Therefore these leaves are also known as eliphant ears.",
    averageHeight: "above 1 m",
    water: "1 x per week",
    light: "shadow",
    strongAirPurifier: true,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608217830/cheese-plant-1_hzjght.webp",
    ],
  },
  {
    name: "Prayer Plant",
    latinName: "Calathea Orbifolia",
    about:
      "The Calathea Orbifolia is a special houseplant, well-known to its special green leaves. This plant is native to Bolivia, where the population used these leaves for package-matrial for fresh fish. Also this plant is ideal for your pets and easy to care! Win-win!",
    averageHeight: "around 0.6 m",
    water: "1 x per week",
    light: "shadow or half shadow",
    strongAirPurifier: true,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218570/calathea-orbifolia-19-productpage_1024x1024_ipmwka.webp",
    ],
  },
  {
    name: "Alocasia Zebrina",
    latinName: "Alocasia Zebrina",
    about:
      "This plant has zebra-like stems and large, heart-shaping leaves. The Alocasia Zebrina is a tropical plant and in the jungle it gives shelter for small animals when there  is a tropical rain showser. This plant is not the easiest plant to take care, but with the right conditions this plant will shine in your livingroom!",
    averageHeight: "around 0.5 m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: false,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218658/Fycus-lyrata-vertakking-FB-foto_1024x1024_j9tiku.webp",
    ],
  },
  {
    name: "Fiddle-leaf Fig",
    latinName: "Ficus Lyrata",
    about:
      "The Ficus Lyrata is already a really old plant species and one of the most popular house plants. The roots of this plant are found in Africa and the name comes from the Latin word 'lyra', which is an old musical instrument with reference to the shape of the leaves. ",
    averageHeight: "around 1.5 to 2 m",
    water: "1 x per two weeks",
    light: "sun",
    strongAirPurifier: true,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218658/Fycus-lyrata-vertakking-FB-foto_1024x1024_j9tiku.webp",
    ],
  },
  {
    name: "Chinese Money Plant",
    latinName: "Pilea Peperomioides",
    about:
      "This Pilea, also known as the Chinese Money Plant or Pancake plant, is native to south China. This plant was very popular in 70s and is already for a couple years really popular. This plant is easy to take care of and a nice thing: this mother plant gives you a lot of baby pileas! ",
    averageHeight: "around 0.3 m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: true,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218755/5ee09a4000622-scaled_vyuigb.jpg",
    ],
  },
  {
    name: "White Giant Bird-of-Paradise",
    latinName: "Strelitzia Nicolai",
    about:
      "This beauty is also commonly known wild banana and has its roots in South Africa. He needs a lot of sunlight and loves to drink a lot of water. This plant gives you a real jungle vibe and is therefore the last years really popular!",
    averageHeight: "around 1.5 m",
    water: "2 x per week",
    light: "sun",
    strongAirPurifier: false,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218804/Nursery-Pot-14_Bird-of-Paradise-14_wcnqic.jpg",
    ],
  },
  {
    name: "Banana Plant",
    latinName: "Musa Dwarf Cavendisch",
    about:
      "The Musa Dwarf Cavendisch is the well known banana plant. He likes a lot of sun and water. He will grow super fast when you take the right care. Sometimes you see this plant 'cry': but this is just the fact that this plant caries almost 80% water.",
    averageHeight: "around 1 to 2 m",
    water: "2 x per week",
    light: "sun",
    strongAirPurifier: false,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218845/musa-dwarf-cavendish-18e2f2_jijyqc.jpg",
    ],
  },
  {
    name: "Emerald Palm",
    latinName: "Zamioculcas",
    about:
      "This plant need so little attention, so it's ideal when you just get started with greener your house. This plant is very strong and can take a hit. The only thing that you have to do is to repot this plant, because its roots are growing really fast. ",
    averageHeight: "around 0.5m",
    water: "1 x per two weeks",
    light: "doesn't matter",
    strongAirPurifier: false,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218876/8917632253982_l673e7.jpg",
    ],
  },
  {
    name: "Arabian coffee",
    latinName: "Coffea Arabica",
    about:
      "This plant is native to Tanzania and is the one of the first species that is used for coffee. But this plant can also be a houseplant. Mostly after a few years of taking good care little white flowers will grown and after a while you can brew your own coffee!",
    averageHeight: "around 0.3m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: false,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218909/koffieplant_shutterstock-883x1024_da4wxa.jpg",
    ],
  },
  {
    name: "Mother-in-laws Tongue",
    latinName: "Sansevieria Laurentii",
    about:
      "This plant is native to Africa and one of the most easiest plants to take care. He needs a little bit light, doens't need a lot of water and is a strong air purifier. This plant will be forever on your side!",
    averageHeight: "around 0.5m and larger",
    water: "1 x per two weeks",
    light: "doens't matter",
    strongAirPurifier: true,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218948/nursery-pot-4_Sanservieria-Laurenti-4_tmjswc.jpg",
    ],
  },
  {
    name: "Peace Lily",
    latinName: "Spathiphyllum",
    about:
      "This plant is native and is already for a long time a very popular houseplant. The plant has an exotic look and is a strong air purifier, because of the large leaves. ",
    averageHeight: "around 0.8m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: true,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608218982/spathiphyllum-lepelplant_mzctyh.jpg",
    ],
  },
  {
    name: "Golden Polypody",
    latinName: "Phlebodium",
    about:
      "This plant looks beautiful with the light grey or blue leaves. The plant is a small genus of ferns, also you woulnd't see that in the first time! This plant is also a strong air purifier plant, so really nice to have this one at home!",
    averageHeight: "around 0.3m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: true,
    toxicForPets: false,
    pictures: [
      "https://cdn.webshopapp.com/shops/30495/files/130048295/kokodama-phlebodium.jpg",
    ],
  },
  {
    name: "Orchid",
    latinName: "Phalaenopsis Asian Pearl",
    about:
      "This plant is a real eyecatcher! It is one of the famoust ornamental houseplants and comes in a lot of different colours. This plant is native to South Asia and Autralia.",
    averageHeight: "around 0.4m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: true,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608219021/kokodama-phlebodium_a5d52k.jpg",
    ],
  },
  {
    name: "Spider Plant",
    latinName: "Chlorophytum",
    about:
      "This plant is one of the easiest homeplants and filters the air in your house. Another nice thing about this plant are its lillte children that are growing on its vines.",
    averageHeight: "around 0.3m",
    water: "1 x per week",
    light: "sun",
    strongAirPurifier: true,
    toxicForPets: false,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608219068/20190825-213632-980x1202.jpg_vudngu.webp",
    ],
  },
  {
    name: "Spineless Yucca",
    latinName: "Yucca Elephantipes",
    about:
      "This plant and can be found in the middle and South of America. Especially in the Yucca Valley, close to the Joshua Tree National Park. But you don't need to travel to see them, you can also put this plant in your livingroom!",
    averageHeight: "around 1.5m",
    water: "1 x per two week",
    light: "sun",
    strongAirPurifier: false,
    toxicForPets: true,
    pictures: [
      "https://res.cloudinary.com/dwhg96emn/image/upload/v1608219103/yucca_kamerplant_in_grijze_capi_pot_goslyp.jpg",
    ],
  },
];

console.log(plants);

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/project3";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    );
    Plant.create(plants).then((plantsFromDB) => {
      console.log(`Created ${plantsFromDB.length} plants`);
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
