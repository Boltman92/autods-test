import { PaymentMethodEnum } from "../enums";
import { ValidationFieldsObject } from "../interfaces";

export const PASSWORD_ERROR_MESSAGE =
  "Password must contain at least 8 characters, one digit and one uppercase letter";
export const REQUIRED = "Required field";
export const CONFIRM_PASSWORD_ERROR_MESSAGE = "Passwords don't match";
export const EMAIL_ERROR_MESSAGE = "Must be a valid email";
export const FULL_NAME_ERROR_MESSAGE =
  "name and surname should contain at least 3 letters for each. Digits and special characters is not allowed";

export const INVALID_PAYMENT_CARD_ERROR_MESSAGE =
  "please, write valid payment card";

export const validationByStep: ValidationFieldsObject = {
  0: "fullName",
  1: ["email", "password", "confirmPassword"],
};

export const RADIO_BUTTONS = [
  { value: PaymentMethodEnum.CREDIT, label: "Credit Card" },
  { value: PaymentMethodEnum.PAYPAL, label: "Paypal" },
];
