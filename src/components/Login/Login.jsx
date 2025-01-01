import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import joi from "joi";

function Login({ saveUserData }) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [errorList, setErrorList] = useState([]);
  let navigate = useNavigate();

  let goToHome = () => {
    navigate("/"); 
  };

  let submitFormData = async (e) => {
    e.preventDefault();
    let validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
    } else {
      try {
        let { data } = await axios.post("http://localhost:3000/users/signin", user);
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          saveUserData();
          goToHome(); 
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg("Network error or CORS issue.");
      }
    }
  };

  let validateFormData = () => {
    const schema = joi.object({
      email: joi.string().required().email({ tlds: { allow: ["com", "net"] } }),
      password: joi.string().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
    });
    return schema.validate(user, { abortEarly: false });
  };

  let getInputValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-75 m-auto py-5">
      <h2>Login Form</h2>
      {errorList.map((error, index) => (
        <div key={index} className="alert alert-danger p-2">
          {error.message}
        </div>
      ))}
      {errorMsg && <div className="alert alert-danger p-2">{errorMsg}</div>}
      <form onSubmit={submitFormData}>
        <div className="input-data my-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={getInputValue}
            type="email"
            className="form-control my-2"
            name="email"
          />
        </div>
        <div className="input-data my-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={getInputValue}
            type="password"
            className="form-control my-2"
            name="password"
          />
        </div>
        <button className="btn btn-info my-3 float-end">Login</button>
      </form>
    </div>
  );
}

export default Login;
