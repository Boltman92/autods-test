import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./components/InputField";
import { useYupValidationResolver } from "./hooks/useYupValidationResolver";

import { FormValues } from "./interfaces";
import { PaymentMethodEnum } from "./enums";
import { validationSchema } from "./utils";
import get from "lodash.get";
import { RADIO_BUTTONS, validationByStep } from "./constants";
import { RadioButtonField } from "./components/RadioButtonField";

import "./App.css";
import { useEffect } from "react";

function App() {
  const resolver = useYupValidationResolver<FormValues>(validationSchema);

  const {
    formState: { errors },
    handleSubmit,
    watch,
    register,
    trigger,
    unregister,
  } = useForm<FormValues>({
    resolver,
    defaultValues: { paymentMethod: { type: PaymentMethodEnum.PAYPAL } },
    reValidateMode: "onSubmit",
  });

  const paymentType = watch("paymentMethod")?.type;

  const [stepIndex, setStepIndex] = useState(0);

  const onSubmit = (data: FormValues) => {
    const [firstName, lastName] = data.fullName.split(" ");

    const result = {
      firstName,
      lastName,
      password: data.password,
      confirmPassword: data.confirmPassword,
      paymentMethod: data.paymentMethod,
    };

    console.log(result);
  };

  const handleClickNext = async () => {
    const validationField = validationByStep[stepIndex];

    const isFieldValid = await trigger(validationField);

    if (isFieldValid) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleClickBack = () => {
    setStepIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (paymentType === PaymentMethodEnum.CREDIT) {
      unregister("paymentMethod.email");
    } else {
      unregister("paymentMethod.creditCard");
    }
  }, [paymentType, unregister]);

  const paymentCardError = get(errors, "paymentMethod.creditCard");

  const paymentEmailError = get(errors, "paymentMethod.email");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        {stepIndex === 0 && (
          <>
            <h2>First step: Personal info</h2>
            <InputField
              description="write name and surname"
              name="fullName"
              isError={!!errors.fullName}
              register={register}
              errorMessage={errors.fullName?.message}
            />
          </>
        )}
        {stepIndex === 1 && (
          <>
            <h2>Second Step: Email and Password</h2>
            <InputField
              name="email"
              description="Email:"
              register={register}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <InputField
              name="password"
              description="Set password:"
              register={register}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              type="password"
            />
            <InputField
              name="confirmPassword"
              description="confirm password:"
              register={register}
              isError={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              type="password"
            />
          </>
        )}
        {stepIndex === 2 && (
          <>
            <h2>Step 3: enter payment method</h2>
            <RadioButtonField
              radioButton={RADIO_BUTTONS}
              register={register}
              name={"paymentMethod.type" as keyof FormValues}
            />
            {paymentType === PaymentMethodEnum.CREDIT ? (
              <InputField
                name={"paymentMethod.creditCard" as keyof FormValues}
                description="type your credit card number:"
                register={register}
                isError={!!paymentCardError}
                errorMessage={paymentCardError?.message}
              />
            ) : (
              <InputField
                name={"paymentMethod.email" as keyof FormValues}
                description="type your paypal email:"
                register={register}
                isError={!!paymentEmailError}
                errorMessage={paymentEmailError?.message}
              />
            )}
          </>
        )}
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
