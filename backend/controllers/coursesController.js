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
const { v4: uuidv4 } = require("uuid"); // Import thư viện UUID để tạo requestId duy nhất

const purchaseCourse = async (req, res) => {
  const courseId = req.params.id;
  const requestId = uuidv4(); // Tạo một requestId duy nhất cho mỗi yêu cầu
  console.log(
    `[${new Date().toISOString()}] - Bắt đầu xử lý - Request ID: ${requestId}`
  );

  try {
    const course = await Courses.findById(courseId);
    console.log(
      `[${new Date().toISOString()}] - Hoàn tất tìm kiếm khoá học - Request ID: ${requestId}`
    );

    if (!course) {
      console.log(
        `[${new Date().toISOString()}] - Khoá học không tồn tại - Request ID: ${requestId}`
      );
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.quantityInStock <= 0) {
      console.log(
        `[${new Date().toISOString()}] - Khoá học đã hết hàng - Request ID: ${requestId}`
      );
      return res.status(400).json({ message: "Course out of stock" });
    }

    console.log(
      `[${new Date().toISOString()}] - Bắt đầu cập nhật khoá học - Request ID: ${requestId}`
    );

    const updatedCourse = await Courses.findOneAndUpdate(
      {
        _id: courseId,
        quantityInStock: course.quantityInStock,
        __v: course.__v
      },
      {
        $inc: {
          quantityInStock: -1,
          __v: 1
        }
      },
      { new: true }
    );

    if (!updatedCourse) {
      console.log(
        `[${new Date().toISOString()}] - Xung đột, cập nhật thất bại - Request ID: ${requestId}`
      );
      return res
        .status(409)
        .json({ message: "Conflict detected. Please try again." });
    }

    console.log(
      `[${new Date().toISOString()}] - Đặt khoá học thành công - Request ID: ${requestId}`
    );

    res.status(200).json({
      message: "Course purchased successfully",
      course: updatedCourse
    });
  } catch (error) {
    console.log(
      `[${new Date().toISOString()}] - Lỗi xảy ra: ${
        error.message
      } - Request ID: ${requestId}`
    );
    res.status(500).json({ message: "Failed to purchase course" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL
    const { name, description, price, image, quantityInStock } = req.body;

    // Kiểm tra nếu người dùng gửi price hoặc quantityInStock là số âm
    if (price <= 0 || quantityInStock <= 0) {
      return res.status(400).json({
        message: "price and quantityInStock must be positive numbers"
      });
    }

    // Tìm và cập nhật khóa học
    const updatedCourse = await Courses.findByIdAndUpdate(
      id,
      { name, description, price, image, quantityInStock },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update course",
      error: error.message
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL

    // Tìm và xóa khóa học
    const deletedCourse = await Courses.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message
    });
  }
};



module.exports = { create, getAll, getById, purchaseCourse, updateCourse, deleteCourse };
