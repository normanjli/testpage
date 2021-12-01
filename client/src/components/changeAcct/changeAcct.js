import React from "react";
import { useForm } from "react-hook-form";

const ChangeAcct = ({ onSubmit, onClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pass = watch("new_password");
  return (
    <div>
      <h2>Edit your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login">
        <div>
          <label>New Username </label>
          <input
            {...register("newUsername", { required: false })}
            type="text"
            placeholder="Username"
          ></input>
        </div>
        {errors.username && <span>This field is required</span>}
        <div>
          <label>Old Password </label>
          <input
            {...register("oldPassword", {
              required: true,
              pattern: /[a-z][0-9][!@#$%^&*?.]/i,
            })}
            id="password"
            type="password"
            placeholder="Old Password"
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
          <label>New Password </label>
          <input
            {...register("new_password", {
              required: false,
            })}
            id="password"
            type="password"
            placeholder="New Password"
          ></input>
        </div>
        {errors?.password?.type === "required" && (
          <span>Password is required</span>
        )}
        <div>
          <label>Verify Password </label>
          <input
            {...register("password_match", {
              required: false,
              validate: (value) => value === pass,
            })}
            id="password"
            type="password"
            placeholder="VerifyPassword"
          ></input>
        </div>
        {errors?.password_match?.type === "validate" && (
          <span>Passwords Must Match</span>
        )}
        <div className="loginbtns">
          <button type="submit">Change User Info</button>
          <button onClick={handleSubmit(onClick)} value="delete">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeAcct;
