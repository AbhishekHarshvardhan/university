import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentDetails from "./components/views/StudentDetails";
import StudentView from "./components/views/StudentView";
import CourseView from "./components/views/CourseView";
import StudentNew from "./components/views/StudentNew";
import CourseNew from "./components/views/CourseNew";
import CourseDetail from "./components/views/CourseDetail";

function App() {
  return (
    <>
      <Navbar />
      <div className="ui container">
        <Switch>
          <Route path="/students/new" component={StudentNew} />
          <Route path="/students/:id" component={StudentDetails} />
          <Route path="/students" component={StudentView} />
          <Route path="/courses/new" component={CourseNew} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses" component={CourseView} />
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
