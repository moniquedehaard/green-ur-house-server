const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const Plants = require("./Plants.model")
const User = require("./User.model")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const homePlantsSchema = new Schema(
    {
        nickname: {
            type: String,
            default: 'Unknown'
        },
        room: {
            type: String,
            default: 'Unknown'
        },
        species: {
            type: ObjectId,
            ref: Plants
        },
        user:[
            {
            type: ObjectId,
            ref: 'User'
            }
        ]
    }
);

const HomePlants = model("HomePlants", homePlantsSchema);

module.exports = HomePlants;
