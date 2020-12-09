const router = require("express").Router();
const Plant = require("../models/Plants.model")

// Give all plants from db
router.get('/', (req, res, next) => {
    Plant.find()
    .then(allPlants => {
        res.json(allPlants);
    })
})

router.get('/:id', (req, res, next) => {
    Plant.findById(req.params.id).then(singlePlant => res.json(singlePlant))
})

module.exports = router;