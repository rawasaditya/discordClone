import { useRef } from "react";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions.js";
import { useNavigate } from "react-router-dom";

const Register = ({ setLogin, register }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const history = useNavigate();

  const submitRegister = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = firstNameRef.current.value;
    register({ email, password, firstName, lastName, rePassword }, history);
  };
  return (
    <div className="flex items-center justify-center h-screen align-middle lg:gap-6 lg:px-24 loginPage">
      <div className="ds_card">
        <div className="card-body">
          <span className="w-full text-2xl font-semibold text-center text-white text-slate-500">
            Create an account
          </span>
          <form className="flex flex-col gap-5 my-4" onSubmit={submitRegister}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="textBox"
              ref={emailRef}
            />
            <input
              type="text"
              required
              placeholder="Enter your First Name"
              className="textBox"
              ref={firstNameRef}
            />
            <input
              type="text"
              placeholder="Enter your Last Name"
              className="textBox"
              ref={lastNameRef}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="textBox"
              ref={passwordRef}
              required
            />
            <input
              type="password"
              placeholder="Re-Enter password"
              className="textBox"
              ref={rePasswordRef}
              required
            />
            <div className="justify-center card-actions">
              <button className="ds_btn_primary">Register</button>
            </div>
          </form>
          <p>
            Already have an account?
            <span
              onClick={() => setLogin(true)}
              className="cursor-pointer text-primary"
            >
              click here
            </span>{" "}
            to login
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

export default connect(null, mapActionsToProps)(Register);
