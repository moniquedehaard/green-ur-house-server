const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const plantSchema = new Schema(
    {
        name: String,
        latinName: String,
        about: String,
        averageHeight: String,
        water: String,
        light: String,
        strongAirPurifier: Boolean,
        toxicForPets: Boolean,
        pictures: [ String ]
    }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;