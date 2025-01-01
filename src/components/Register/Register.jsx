import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { Helmet } from "react-helmet";

function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [errorList, setErrorList] = useState([]);
  let navigate = useNavigate();

  let submitFormData = async (e) => {
    e.preventDefault();
    let validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
    } else {
      try {
        let { data } = await axios.post(
          "http://localhost:3000/users/signup",
          user
        );
        if (data.message === "success") {
          goToLogin();
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
      first_name: joi.string().alphanum().required().min(2).max(10),
      last_name: joi.string().alphanum().required().min(2).max(10),
      age: joi.number().required().min(20).max(80),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[a-zA-Z0-9]{4,}$/))
    });
    return schema.validate(user, { abortEarly: false });
  };

  let goToLogin = () => {
    navigate("/login");
  };

  let getInputValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-75 m-auto py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h2>Registration Form</h2>
      {errorList.map((error, index) => (
        <div key={index} className="alert alert-danger p-2">
          {error.message}
        </div>
      ))}
      {errorMsg && <div className="alert alert-danger p-2">{errorMsg}</div>}
      <form onSubmit={submitFormData}>
        <div className="input-data my-2">
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={getInputValue}
            type="text"
            className="form-control my-2"
            name="first_name"
          />
        </div>
        <div className="input-data my-2">
          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={getInputValue}
            type="text"
            className="form-control my-2"
            name="last_name"
          />
        </div>
        <div className="input-data my-2">
          <label htmlFor="age">Age</label>
          <input
            onChange={getInputValue}
            type="number"
            className="form-control my-2"
            name="age"
          />
        </div>
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
        <button className="btn btn-info my-3 float-end">Register</button>
      </form>
    </div>
  );
}

export default Register;
