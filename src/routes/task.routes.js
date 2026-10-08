const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
} = require("../controllers/task.controller");

const router = express.Router();
router.get("/", authMiddleware, getTasks);
router.get("/:id",authMiddleware, getTaskById);
router.post("/",authMiddleware, createTask);
router.patch("/:id", authMiddleware, updateTaskById);
router.delete("/:id", authMiddleware, deleteTaskById);

module.exports = router;