import React, { FC } from "react";
import { FormValues } from "../interfaces";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  description: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  isError: boolean;
  errorMessage?: string;
  type?: string;
}

export const InputField: FC<InputFieldProps> = ({
  description,
  name,
  register,
  isError,
  errorMessage = "invalid input",
  type = "text",
}) => (
  <div className="form-wrapper">
    <label>{description}</label>
    <input className="input" {...register(name)} type={type} />
    <div className="error">{isError && <div>{errorMessage}</div>}</div>
  </div>
);
