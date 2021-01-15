import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentDetails from "./components/StudentDetails";
import CourseDetail from "./components/CourseDetail";
import CourseList from "./components/CourseList";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import CourseForm from "./components/CourseForm";

function App() {
  return (
    <>
      <Navbar />
      <div className="ui container">
        <Switch>
          <Route path="/students/new" component={StudentForm} />
          <Route path="/students/:id" component={StudentDetails} />
          <Route path="/students" component={StudentList} />
          <Route path="/courses/new" component={CourseForm} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses" component={CourseList} />
          <Route path="/">
            <Redirect to="/students" />
          </Route>
        </Switch>
        <br />
        <br />
      </div>
    </>
  );
}

export default App;
