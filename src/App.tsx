import React, { useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { FormWrapper } from "./components/FormWrapper";
import { useYupValidationResolver } from "./hooks/useYupValidationResolver";

import { FormValues, ValidationFieldsObject } from "./interfaces";
import { PaymentMethodEnum } from "./enums";
import { validationSchema } from "./utils";
import {
  EMAIL_ERROR_MESSAGE,
  INVALID_PAYMENT_CARD_ERROR_MESSAGE,
} from "./constants";

function App() {
  const resolver = useYupValidationResolver<FormValues>(validationSchema);

  const {
    formState: { errors },
    handleSubmit,
    watch,
    register,
    trigger,
  } = useForm<FormValues>({
    resolver,
    defaultValues: { paymentMethod: { type: PaymentMethodEnum.PAYPAL } },
  });

  const paymentType = watch("paymentMethod")?.type;

  const [stepIndex, setStepIndex] = useState(0);

  const onSubmit = (values: FormValues) => {
    console.log(values, "values");
  };

  const validationByStep: ValidationFieldsObject = {
    0: "fullName",
    1: ["email", "password", "confirmPassword"],
  };

  const handleClickNext = async () => {
    const index = validationByStep[stepIndex];

    const isFieldValid = await trigger(index);
    if (isFieldValid) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleClickBack = () => {
    setStepIndex((prev) => prev - 1);
  };

  const isError = Object.keys(errors).length > 0;

  const arrayOfSteps: ReactNode[] = [
    <FormWrapper title="write your full name">
      <input className="input" {...register("fullName")} />
      {errors.fullName && (
        <div className="error">{errors.fullName?.message}</div>
      )}
    </FormWrapper>,

    <FormWrapper title="write your email and password">
      <div>Email: </div>
      <input className="input" {...register("email")} />
      {errors.email && <div className="error">{errors.email?.message}</div>}

      <div>Password: </div>
      <input className="input" {...register("password")} type="password" />
      {errors.password && (
        <div className="error">{errors.password?.message}</div>
      )}

      <div>Confirm Password: </div>
      <input
        className="input"
        {...register("confirmPassword")}
        type="password"
      />
      {errors.confirmPassword && (
        <div className="error">{errors.confirmPassword?.message}</div>
      )}
    </FormWrapper>,

    <FormWrapper title="choose your payment method">
      <>
        <div className="radio">
          <div className="row">
            <input
              {...register("paymentMethod.type")}
              type="radio"
              value={PaymentMethodEnum.PAYPAL}
            />
            <label className="label">paypal</label>
          </div>
          <div className="row">
            <input
              {...register("paymentMethod.type")}
              type="radio"
              value={PaymentMethodEnum.CREDIT}
            />
            <label className="label">Credit card</label>
          </div>
        </div>

        {paymentType === PaymentMethodEnum.CREDIT ? (
          <>
            <div>type your credit card number: </div>
            <input {...register("paymentMethod.paymentCard")} />
            {isError && (
              <div className="error">{INVALID_PAYMENT_CARD_ERROR_MESSAGE}</div>
            )}
          </>
        ) : (
          <>
            <div>type your paypal email: </div>
            <input {...register("paymentMethod.paymentEmail")} />
            {isError && <div className="error">{EMAIL_ERROR_MESSAGE}</div>}
          </>
        )}
      </>
    </FormWrapper>,
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        {arrayOfSteps[stepIndex]}
        <div className="button">
          {stepIndex > 0 && (
            <button onClick={handleClickBack} type="button">
              back
            </button>
          )}
          {stepIndex < 2 && (
            <button onClick={handleClickNext} type="button">
              next
            </button>
          )}
          {stepIndex === 2 && <input type="submit" />}
        </div>
      </form>
    </div>
  );
}

export default App;
