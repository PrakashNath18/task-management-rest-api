const Task = require("../models/Task");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");
const validStatuses = ["pending", "in-progress", "completed"];
const validPriorities = ["low", "medium", "high"];
const validSortOptions = ["dueDate", "-dueDate", "createdAt", "-createdAt"];
exports.createTask = asyncHandler(async (req, res) => {
    // using spread operator to create a new task with the user ID from the authenticated user
    const task = await Task.create({ ...req.body, user: req.user.userId });
    res.status(201).json({
        success: true,
        data: task
    });
});
exports.getTasks = asyncHandler(async (req, res) => {
    const filter = {};
    const status = req.query.status;
    const priority = req.query.priority;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    if (!Number.isInteger(page) || page <= 0) {
        throw new AppError("Invalid page value", 400);
    }

    if (!Number.isInteger(limit) || limit <= 0) {
        throw new AppError("Invalid task limit", 400);
    }

    const skip = (page - 1) * limit;

    if (status) {
        if (!validStatuses.includes(status)) {
            throw new AppError("Invalid task status", 400);
        }
        filter.status = status;
    }


    if (priority) {
        if (!validPriorities.includes(priority)) {
            throw new AppError("Invalid task priority", 400);
        }
        filter.priority = priority;
    }
    const sort = req.query.sort;

    if (sort && !validSortOptions.includes(sort)) {
        throw new AppError("Invalid sort option", 400);
    }

    let sortOption = {};
    if (sort === "dueDate") {
        sortOption = { dueDate: 1 };
    } else if (sort === "-dueDate") {
        sortOption = { dueDate: -1 };
    } else if (sort === "createdAt") {
        sortOption = { createdAt: 1 };
    } else if (sort === "-createdAt") {
        sortOption = { createdAt: -1 };
    }
    const search = req.query.search;
    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    filter.user = req.user.userId;
    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / limit);

    const tasks = await Task.find(filter).sort(sortOption).skip(skip).limit(limit);

    res.status(200).json({
        success: true,
        data: tasks,
        pagination: {
            page,
            limit,
            totalTasks,
            totalPages
        }
    });

});

exports.getTaskById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid task ID", 400);
    }

    const task = await Task.findOne({
        _id: id,
        user: req.user.userId
    })

    if (!task) {
        throw new AppError("Task not found", 404);
    }


    res.status(200).json({
        success: true,
        data: task
    });
});

exports.updateTaskById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid task ID", 400);
    }
    
    const updateData = {...req.body};
    delete updateData.user; // Prevent user field from being updated
    const task = await Task.findOneAndUpdate(
        {_id: id,
          user:req.user.userId
        },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    res.status(200).json({
        success: true,
        data: task
    });
});

exports.deleteTaskById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid task ID", 400);
    }

    const task = await Task.findOneAndDelete({
        _id: id,
        user: req.user.userId
    });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    res.status(200).json({
        success: true,
        data: task
    });
});