const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth");
router.use("/auth", authRoutes);

const plantRoutes = require("./plants")
router.use("/plants", plantRoutes);

const homePlantRoutes = require("./homePlants")
router.use("/home-plants", homePlantRoutes);

module.exports = router;
