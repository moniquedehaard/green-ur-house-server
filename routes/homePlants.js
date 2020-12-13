// Packages
const router = require("express").Router();
// Models
const HomePlants = require("../models/HomePlants.model");
const Plant = require("../models/Plants.model");
const User = require("../models/User.model")
// Functions
const isLoggedIn = require("../middlewares/isLoggedIn");



// Get all information about homeplant for given homeplant id
router.get('/plants/:id', (req, res) => {
    //console.log('ID',  req.params.id)
    HomePlants
        .findById(req.params.id)
        .populate("species")
        .then(foundPlant => {
        res.json({foundPlant: foundPlant})
    }).catch(err => console.log(err))
})

// Get all information about homeplants for given user
router.get('/:id', (req, res, next) => {
    HomePlants
        .find({ user: req.params.id })
        .populate("species")
        .then((plantsAtHome) => {
            // console.log("Plants returned", plantsAtHome)
            res.json({plantsAtHome : plantsAtHome})
        })
})

// Post new plant
router.post("/new", isLoggedIn, (req, res) => {
    console.log(req.user)
    const { plant, nickname, room, notes } = req.body
    console.log(plant)

    // Find right plant
    Plant
        .findOne({ latinName: plant })
        .then(foundPlant => {
            console.log('Found plant', foundPlant)
            HomePlants.create({
                nickname: nickname,
                species: foundPlant._id,
                room: room,
                notes: notes,
                user: req.user._id
            }).then(createdPlant => {
                console.log("NEW created homeplant", createdPlant)
                // User updaten met plant ID
                User.findByIdAndUpdate(req.user._id, {
                    $push: { homePlants: createdPlant }
                },
                    { new: true }
                ).then(updatedUser => {
                    console.log('Updated user', updatedUser);
                    res.json(updatedUser)
                 })
            })
        })
        .catch(err => console.log(err))
})

// Edit home plant
router.post("/edit/:id", isLoggedIn, (req, res) => {
    const { plant, nickname, room, notes } = req.body

    Plant
        .findOne({ latinName: plant })
        .then(foundPlant => {
            console.log('Found plant', foundPlant)

            // Find the right homeplant
            HomePlants
                .findByIdAndUpdate(req.params.id, {
                    nickname: nickname,
                    species: foundPlant._id,
                    room: room,
                    notes: notes,
                    user: req.user._id
                },
                    { new: true }
                ).then(updatedHomePlant => {
                console.log("Updated homeplant", updatedHomePlant)

                // Update user
                    User.findByIdAndUpdate(req.user._id, {
                        $addToSet: { homePlants: foundPlant._id }
                    },
                        { new: true }
                    ).then(updatedUser => {
                        console.log('Updated user', updatedUser);

                        // Send response
                        res.json(updatedUser)
                    })
                })
        })
        .catch(err => console.log(err))
})


// Edit home plant
router.post("/delete/:id", isLoggedIn, (req, res) => {
    console.log(req.user._id)
    const { plant  } = req.body

    // Update homeplant
    HomePlants.findByIdAndRemove(req.params.id).then((rem) => {
        // find plant
        Plant.findOne({ latinName: plant })
            .then(foundPlant => {
                console.log('Found plant', foundPlant)
                // else do pull request
                User.findByIdAndUpdate(req.user._id, {
                    $pull: { homePlants: foundPlant._id }
                }, { new: true }
                ).then(updatedUser => {
                    console.log('Updated user', updatedUser);
                    res.json(updatedUser)
                })
                //
                // Find if user has more than one plant of the same species
                //HomePlants.find({ $and: [{ user: req.user._id }, { species: foundPlant._id }] })
                //.then(numberHomePlantsSpecies => {
                //console.log(numberHomePlantsSpecies.length)
                //Multiple plants of same 
                //if (numberHomePlantsSpecies.length > 1) {
            })
    })
    .catch(err => console.log(err))
})

module.exports = router;
