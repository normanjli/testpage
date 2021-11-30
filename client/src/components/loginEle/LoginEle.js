import React from "react";
import { useForm } from "react-hook-form";

const LoginEle = ({ onSubmit, onClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login">
        <div>
          <label>Username </label>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
          ></input>
        </div>
        {errors.username && <span>This field is required</span>}
        <div>
          <label>Password </label>
          <input
            {...register("password", {
              required: true,
              pattern: /[a-z][0-9][!@#$%^&*?.]/i,
            })}
            id="password"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        {errors?.password?.type === "required" && (
          <span>Password is required</span>
        )}
        <div className="loginbtns">
          <button type="submit">Login</button>
          <button
            className="change"
            style={{ backgroundColor: "unset", border: "unset" }}
            onClick={onClick}
            value="create"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginEle;
