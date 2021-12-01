import React from "react";
import { useForm } from "react-hook-form";

const CreateAcct = ({ onSubmit, onClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pass = watch("password");
  return (
    <div>
      <h2>Create an Account</h2>
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
              pattern:/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[!@# $%^&*?.]).{8,}$/,
            })}
            id="password"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        {errors?.password?.type === "pattern" && (
          <span>
            Password must contain 1 letter, 1 number, and 1 of the following
            symbols:!@#$%^&*?.
          </span>
        )}
        {errors?.password?.type === "required" && (
          <span>Password is required</span>
        )}
        <div>
          <label>Verify Password </label>
          <input
            {...register("password_match", {
              required: true,
              validate: (value) => value === pass,
            })}
            id="password"
            type="password"
            placeholder="Verify Password"
          ></input>
        </div>
        {errors?.password_match?.type === "validate" && (
          <span>Passwords Must Match</span>
        )}
        <div className="loginbtns">
          <button type="submit">Create User</button>
          <button
            className="change"
            style={{ backgroundColor: "unset", border: "unset" }}
            onClick={onClick}
            value="login"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAcct;
