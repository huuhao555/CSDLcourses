import { memo } from "react";
import "./style.scss";
import Courses from "../../component/courses/courses";
const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <Courses />
      </div>
    </div>
  );
};
export default memo(HomePage);
