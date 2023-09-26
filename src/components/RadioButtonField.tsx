import React, { FC } from "react";
import { FormValues } from "../interfaces";
import { UseFormRegister } from "react-hook-form";

interface RadioButtonProps {
  radioButton: {
    value: string;
    label: string;
  }[];
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
}

export const RadioButtonField: FC<RadioButtonProps> = ({
  radioButton,
  register,
  name,
}) => (
  <div className="radio">
    {radioButton.map((item) => (
      <div className="row" key={item.value}>
        <input {...register(name)} type="radio" value={item.value} />
        <label className="label">{item.label}</label>
      </div>
    ))}
  </div>
);
