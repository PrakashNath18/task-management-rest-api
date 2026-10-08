const errorMiddleware = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error";

    // Mongoose validation error
    if (error.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(error.errors)
            .map((err) => err.message)
            .join(", ");
    }

    // Mongoose invalid ObjectId
    if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid task ID";
    }
    // duplicate email or existing email
    if(error.code === 11000){
        statusCode = 409;
        message = "Email already registered";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorMiddleware;