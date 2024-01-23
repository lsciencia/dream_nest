const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

//configuration multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); //sstore uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //use the original file name
    }
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        //take all the info from the form
        const { firstName, lastName, email, password } = req.body;

        //the uploaded file is available as req.file
        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }

        //create path to the uploaded profile photo
        const profileImagePath = profileImage.path;

        //check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!" });
        }

        //Hash the password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            profileImagePath
        });

        //save the new user
        await newUser.save();

        //send a successful message
        res.status(200).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed!", error: err.message });
    }
});

module.exports = router;