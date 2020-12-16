const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Plants = require("../models/Plants.model");
const HomePlants = require("../models/HomePlants.model")

// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

// // Uploading images via icloud
const multer = require("multer");
const cloudinary = require("cloudinary");
const multerStorageCloudinary = require("multer-storage-cloudinary");

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary:  cloudinary.v2
})
const upload = multer({storage})



router.get("/session", (req, res) => {
  // we dont want to throw an error, and just maintain the user as null
  if (!req.headers.authorization) {
    return res.json(null);
  }

  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;

  Session.findById(accessToken)
    .populate("user")
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: "Session does not exist" });
      }
      return res.status(200).json(session);
    });
});

router.post("/signup", shouldNotBeLoggedIn, upload.single("image"),(req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", shouldNotBeLoggedIn, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }
        Session.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return res.json({ user, accessToken: session._id });
          }
        );
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.delete("/logout", isLoggedIn, (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: "User was logged out" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});


// Add plant to wishlist user
router.patch("/addToWishlist/:id", (req, res) => {
  console.log('Req from add to wishlist', req.body)
  const userId = req.params.id
  const plantId = req.body.plantId

  User
    .findByIdAndUpdate(userId, {
        $addToSet: { favoritePlants: plantId }
      },
      {
        new: true
      }
    )
    .then(updatedUser => {
      console.log('Updated User: ',updatedUser)
      res.json({updatedUser: updatedUser})
    })
    .catch(err => console.log('Error while updating (adding) wishlist plants'))
})

// Remove plant from wishlist urser
router.patch("/removeFromWishlist/:id", (req, res) => {
  console.log('Req from add to wishlist', req.body)
  const userId = req.params.id
  const plantId = req.body.plantId

  User
    .findByIdAndUpdate(userId, {
        $pull: { favoritePlants: plantId }
      },
      {
        new: true
      }
    )
    .then(updatedUser => {
      console.log('Updated User: ',updatedUser)
      res.json({updatedUser: updatedUser})
    })
    .catch(err => console.log('Error while updating (removing) wishlist plants'))
})

// Give all information User (populated)
router.get("/allInformationUser/:id", (req, res) => {
  console.log(req.params.id)
  User
    .findById(req.params.id)
    .populate("favoritePlants")
    .populate("homePlants")
    .then(foundUser => {
      console.log('Found User', foundUser)
      res.json({foundUser: foundUser})
    })
    .catch(err => console.log("error", err))
})
module.exports = router;

// Add plant to home of user
router.patch("/addToPlantsHome/:id", (req, res) => {
  const userId = req.params.id
  const plantId = req.body.plantId

  // Create a homeplant
  HomePlants
  .create({
    species: plantId,
    user: userId
  })
    .then(plant => {
      console.log('Home plant added to db', plant)
      // Update user with homeplant
      User
        .findByIdAndUpdate(userId, {
          $addToSet: { homePlants: plantId }
        },
          {
            new: true
          }
        )
        .then(updatedUser => {
          console.log('Updated User: ', updatedUser)
          res.json({ updatedUser: updatedUser })
        })
    })
  .catch(err => console.log("Error while creating new plant",err))
})

// Remove plant to home of user
router.patch("/removePlantsHome/:id", (req, res) => {
  const userId = req.params.id
  const plantId = req.body.plantId

  // Create a homeplant
  HomePlants
    .deleteOne({user: userId, species:plantId})
    .then(() => {   
      User.findByIdAndUpdate(userId,
        {
          $pull: { homePlants: plantId },
        },
        { new: true })
        .then(updatedUser => {
          console.log('FOUND USER TEST', updatedUser)
          res.json({ updatedUser: updatedUser })
        })
    })
  .catch(err => console.log("Error while creating new plant",err))
})
