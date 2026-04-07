const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

const taskPopulate = [
  { path: "userId", select: "_id name email" },
  { path: "assignedUserId", select: "_id name email" }
];

const resolveAssignedUserId = async (assignedUserId) => {
  if (assignedUserId === undefined) {
    return undefined;
  }

  if (assignedUserId === null || assignedUserId === "") {
    return null;
  }

  if (!mongoose.Types.ObjectId.isValid(assignedUserId)) {
    return { error: "Invalid assigned user id." };
  }

  const assignedUser = await User.findById(assignedUserId).select("_id");
  if (!assignedUser) {
    return { error: "Assigned user not found." };
  }

  return assignedUser._id;
};

const createTask = async (req, res) => {
  try {
    const { title, description, done, priority, assignedUserId } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const resolvedAssignedUserId = await resolveAssignedUserId(assignedUserId);
    if (resolvedAssignedUserId && resolvedAssignedUserId.error) {
      return res.status(400).json({ message: resolvedAssignedUserId.error });
    }

    const task = await Task.create({
      title,
      description,
      done,
      priority,
      userId: req.user.id,
      assignedUserId: resolvedAssignedUserId
    });
    await task.populate(taskPopulate);

    return res.status(201).json({
      message: "Task created successfully.",
      data: { task }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while creating task." });
  }
};

const getTasks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const tasks = await Task.find({
      $or: [{ userId: req.user.id }, { assignedUserId: req.user.id }]
    })
      .populate(taskPopulate)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Tasks fetched successfully.",
      data: { tasks }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while fetching tasks." });
  }
};

module.exports = { createTask, getTasks };
