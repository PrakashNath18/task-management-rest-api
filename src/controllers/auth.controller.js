const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET ? "JWT secret loaded" : "JWT secret missing");
exports.registerUser = asyncHandler(async (req, res) => {
    //destructuring the data from req.body
    const { name, email, password } = req.body;

    // Required fields and validatation of data 
    if (!name || !email || !password) {
        throw new AppError(
            "Name, email and password are required",
            400
        );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        throw new AppError(
            "Email already registered",
            409
        );
    }

    // Password validation
    if (password.length < 6) {
        throw new AppError(
            "Password must be at least 6 characters",
            400
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword
    });

    // Safe response
    res.status(201).json({
        success: true,
        data: {
            name: user.name,
            email: user.email
        }
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const {  email, password } = req.body;
    // Required fields and validatation of data 
    if (!email || !password) {
        throw new AppError(
            "email and password are required",
            400
        );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (!existingUser) {
        throw new AppError(
            "invalid email or password",
            401
        );
    }
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordMatch){
        throw new AppError(
            "invalid email or password",
            401
        )
    }
    const token = jwt.sign({userId: existingUser._id} ,JWT_SECRET, {expiresIn: "1d"});
    
    
    res.status(200).json({
        success: true,
        token
    });
    
});


