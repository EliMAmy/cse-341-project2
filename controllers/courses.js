const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// GET ALL
const getAll = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("courses")
      .find();

    const courses = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving courses",
      error: error.message,
    });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid course ID");
    }

    const courseId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("courses")
      .findOne({ _id: courseId });

    if (!result) {
      return res.status(404).json("Course not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving course",
      error: error.message,
    });
  }
};

// UPDATE
const updateCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid course ID");
    }

    const courseId = new ObjectId(req.params.id);

    const course = {
      name: req.body.name,
      term: req.body.term,
      credits: req.body.credits,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("courses")
      .replaceOne({ _id: courseId }, course);

    if (response.matchedCount === 0) {
      return res.status(404).json("Course not found");
    }

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }

    res.status(200).json("No changes made");
  } catch (error) {
    res.status(500).json({
      message: "Error updating course",
      error: error.message,
    });
  }
};

// DELETE
const deleteCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid course ID");
    }

    const courseId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("courses")
      .deleteOne({ _id: courseId });

    if (response.deletedCount === 0) {
      return res.status(404).json("Course not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error deleting course",
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  updateCourse,
  deleteCourse,
};