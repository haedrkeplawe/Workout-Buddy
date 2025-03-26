const UserModel = require("../models/User");
const WorkoutModel = require("../models/workouts");

const getAllUsers = async (req, res) => {
  const userDoc = await UserModel.find({})
    .select(["-password"])
    .sort({ createdAt: -1 });
  res.status(200).json(userDoc);
};

const getuser = async (req, res) => {};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "PLease fill in all the filed", emptyFields });
  }

  try {
    const user = await UserModel.signup(name, email, password);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await UserModel.findByIdAndDelete(id).select([
      "-password",
    ]);
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
};

// workout

const getAllWorkout = async (req, res) => {
  const { id } = req.params;
  workoutDoc = await WorkoutModel.find({ user_id: id }).sort({ createdAt: -1 });
  res.status(200).json(workoutDoc);
};

const createWorkout = async (req, res) => {
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
    const workoutDoc = await WorkoutModel.create({
      title,
      reps,
      load,
      user_id: id,
    });
    console.log(workoutDoc);

    res.status(200).json(workoutDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  const workoutDoc = await WorkoutModel.findOneAndDelete({ _id: id });
  if (!workoutDoc) {
    return res.status(404).json({ error: "NO Such Workout" });
  }
  res.status(200).json(workoutDoc);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  const { idWorkout, title, reps, load } = req.body;
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
    const workoutDoc = await WorkoutModel.findById(idWorkout).exec();
    if (!workoutDoc) {
      return res.status(404).json({ error: "NO Such Workout" });
    }
    workoutDoc.title = title;
    workoutDoc.reps = reps;
    workoutDoc.load = load;
    workoutDoc.user_id = id;

    res.status(200).json(workoutDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllUsers,
  getuser,
  createUser,
  deleteUser,
  getAllWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
