import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="ui borderless menu">
        <div className="ui container">
          <NavLink to="/" className="ui header item">
            <img
              className="ui image"
              src="https://semantic-ui.com/images/icons/school.png"
              alt="University"
            />
          </NavLink>
          <div className="right menu">
            <div className="item">
              <button className="ui primary button">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ui big container borderless pointing  menu">
        <NavLink to="/students" className="item">
          Students
        </NavLink>
        <NavLink to="/courses" className="item">
          Courses
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
