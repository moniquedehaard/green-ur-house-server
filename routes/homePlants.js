const router = require("express").Router();
const HomePlants = require("../models/HomePlants.model");

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

module.exports = router;
