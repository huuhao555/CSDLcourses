const Courses = require("../models/coursesModel");

const create = async (req, res) => {
  try {
    const { name, price, quantityInStock } = req.body;
    if (!name || !price || !quantityInStock) {
      return res
        .status(400)
        .json({ message: "name, price, and quantityInStock are required" });
    }
    if (price <= 0 || quantityInStock <= 0) {
      return res.status(400).json({
        message: "price and quantityInStock must be positive numbers"
      });
    }
    const courses = await Courses.findOne({ name });
    if (courses) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const newCourse = await Courses.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Failed to add course" });
  }
};

const getAll = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(201).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to getAll course" });
  }
};

const getById = async (req, res) => {
  const CourseId = req.params.id;
  try {
    if (!CourseId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The CounseId is required"
      });
    }
    const course = await Courses.findOne({ _id: CourseId });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to getById course" });
  }
};
const purchaseCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Courses.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.quantityInStock <= 0) {
      return res.status(400).json({ message: "Course out of stock" });
    }

    const updatedCourse = await Courses.findOneAndUpdate(
      {
        _id: courseId,
        quantityInStock: course.quantityInStock,
        __v: course.__v
      },
      { $inc: { quantityInStock: -1 }, $inc: { __v: 1 } },
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(409)
        .json({ message: "Conflict detected. Please try again." });
    }

    res.status(200).json({
      message: "Course purchased successfully",
      course: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to purchase course" });
  }
};

module.exports = { create, getAll, getById, purchaseCourse };
