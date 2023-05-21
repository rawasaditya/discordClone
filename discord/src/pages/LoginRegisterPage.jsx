import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
const LoginRegisterPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </>
  );
};

export default LoginRegisterPage;
