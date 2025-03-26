const { default: mongoose } = require("mongoose");
const WorkoutModel = require("../models/workouts");

const getAll = async (req, res) => {
  const user_id = req.user._id;
  workoutDoc = await WorkoutModel.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workoutDoc);
};

const getOne = async (req, res) => {};

const create = async (req, res) => {
  const { title, reps, load } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "PLease fill in all the filed", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workoutDoc = await WorkoutModel.create({
      title,
      reps,
      load,
      user_id,
    });
    res.status(200).json(workoutDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteOne = async (req, res) => {
  const { id } = req.params;

  const workoutDoc = await WorkoutModel.findOneAndDelete({ _id: id });
  if (!workoutDoc) {
    return res.status(404).json({ error: "NO Such Workout" });
  }
  res.status(200).json(workoutDoc);
};
const update = async (req, res) => {
  const { id } = req.params;

  const { title, reps, load } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "PLease fill in all the filed", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workoutDoc = await WorkoutModel.findById(id).exec();
    if (!workoutDoc) {
      return res.status(404).json({ error: "NO Such Workout" });
    }
    workoutDoc.title = title;
    workoutDoc.reps = reps;
    workoutDoc.load = load;
    workoutDoc.user_id = user_id;

    const updatedWorkout = await workoutDoc.save();
    res.status(200).json(workoutDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
