import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import { Route, Switch } from "react-router";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Main from "./Components/Main/Main";
import { Navbar, Nav } from "react-bootstrap";
import Tracker from "./Components/Tracker/Tracker";
import Events from "./Components/Events/Events";
import Login from "./Components/RegistrationForm/Login";
import Logout from "./Components/RegistrationForm/Logout";
import Filtration from "./Components/Filtration/Filtration";
import { AuthContext } from "./Context/auth";

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || ""
  );
  let isTokenDropped = authToken === "undefined" || authToken === undefined;

  const setToken = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Nav.Link>
              <Link className="nav-link" to="home">
                It happened
              </Link>
            </Nav.Link>
            <Nav className="mr-auto">
              <Nav.Link>
                <Link className="nav-link" to="/trackers">
                  Trackers
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="nav-link" to="/filtration">
                  Filtration
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="nav-link" to="/statistics">
                  Statistics
                </Link>
              </Nav.Link>
            </Nav>
          </Nav>
          <Nav className="collapse navbar-collapse justify-content-end">
            <Nav.Link>
              {isTokenDropped && (
                <Link className="nav-link" to="/login">
                  LogIn
                </Link>
              )}
            </Nav.Link>

            <Nav.Link>{!isTokenDropped && <Logout>LogOut</Logout>}</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/home" component={Main} />
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/login" component={Login} />
          <Route path="/filtration/" component={Filtration} />
          <Route path="/filtration/:trackerId/" component={Filtration} />
          <PrivateRoute path="/trackers" component={Tracker} />
          <Route path="/tracker/:trackerId" component={Events} />
          <PrivateRoute path="/trackers" component={Tracker} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
