import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserFormPage from "./Screen/UserScreens/UserFormPage";
import UserPrivateRoute from "./Screen/UserScreens/UserPrivateRoute";
import UserHomePage from "./Screen/UserScreens/UserHomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<UserFormPage url={"api/user/userlogin"} type={"login"} />}
        />
        <Route
          path="/signup"
          element={<UserFormPage url={"api/user/usersignup"} type={"signup"} />}
        />
        <Route
          path="*"
          element={<UserFormPage url={"api/user/userlogin"} type={"login"} />}
        />
        <Route element={<UserPrivateRoute />}>
          <Route path="/homepage" element={<UserHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
