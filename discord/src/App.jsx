import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import DashBoard from "./pages/DashBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/dashboard" element={<DashBoard />} />{" "}
        </Routes>
      </Router>
    </>
  );
};

export default App;
