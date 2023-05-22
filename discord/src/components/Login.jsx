import { useRef } from "react";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions.js";
import { useNavigate } from "react-router-dom";
const Login = ({ setLogin, login }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();
  const Submitlogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login({ email, password }, history);
  };
  return (
    <div className="flex items-center justify-center h-screen align-middle lg:gap-6 lg:px-24 dc_loginPage">
      <div className="dc_card">
        <div className="card-body">
          <span className="w-full text-2xl font-semibold text-center text-white text-slate-500">
            Welcome back
          </span>
          <span className="w-full text-sm font-semibold text-center text-white text-slate-400">
            We are so excited to see you again !
          </span>
          <form className="flex flex-col gap-5 my-4" onSubmit={Submitlogin}>
            <input
              type="email"
              required
              placeholder="Enter registered email"
              className="dc_textBox"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="dc_textBox"
              ref={passwordRef}
            />
            <div className="justify-center card-actions">
              <button className="dc_btn_primary">Login</button>
            </div>
          </form>
          <p>
            If you do not have an account{" "}
            <span
              onClick={() => setLogin(false)}
              className="cursor-pointer text-primary"
            >
              click here
            </span>{" "}
            to register
          </p>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
