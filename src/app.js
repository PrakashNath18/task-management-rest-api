const express = require("express");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");


const errorMiddleware = require("./middleware/error.middleware");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();

app.use(express.json());
app.use(cors());
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many authentication requests. Please try again later."
    }
});

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use(errorMiddleware);
module.exports = app;