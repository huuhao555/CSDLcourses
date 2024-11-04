import { memo, useEffect, useState, useContext } from "react";
import "./style.scss";
import { UserContext } from "../../middleware/UserContext";

const CoursesComponent = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext);

  const renderCourses = async () => {
    try {
      const response = await fetch(" http://localhost:5001/api/course/getAll");
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setCourses([]);
    }
  };
  useEffect(() => {
    renderCourses();
  }, []);
  const handleBuyCourse = async (idCounrse) => {
    if (!user) {
      alert("Vui lòng đăng nhập");
      return;
    }

    // if (!window.confirm("Bạn có chắc chắn muốn mua khoá học này?")) {
    //   return;
    // }
    try {
      const response = await fetch(
        `http://localhost:5001/api/course/purchase/${idCounrse}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      console.log(response);
      await response.json();
      renderCourses();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  return (
    <div className="courses-container">
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div className="course-card">
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
              <h5 className="course-title">{course.name}</h5>
              {/* <p className="course-description">{course.description}</p> */}
              <p className="course-price">
                {course.price.toLocaleString("vi-VN")}đ
              </p>
              <p className="course-remaining">
                {course.quantityInStock > 0
                  ? `${course.quantityInStock} seats available`
                  : "Sold Out"}
              </p>
              <button
                onClick={() => {
                  handleBuyCourse(course._id);
                }}
                className="btn btn-primary"
                disabled={course.quantityInStock === 0}
              >
                {course.quantityInStock > 0 ? "Buy Course" : "Sold Out"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CoursesComponent);
