import { object, string, ref, mixed } from "yup";
import {
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  FULL_NAME_ERROR_MESSAGE,
  INVALID_PAYMENT_CARD_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  REQUIRED,
} from "../constants";
import { PaymentMethodEnum } from "../enums";

// validate is credit card valid
const validateLuhnAlgorithm = (cardNumber: string) => {
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validationSchema = object().shape({
  fullName: string()
    .required(REQUIRED)
    .matches(/\b[a-zA-Z]{3,}\b\s\b[a-zA-Z]{3,}\b/, FULL_NAME_ERROR_MESSAGE),
  email: string().required(REQUIRED).email(EMAIL_ERROR_MESSAGE),
  password: string()
    .required(REQUIRED)
    .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, PASSWORD_ERROR_MESSAGE),
  confirmPassword: string()
    .oneOf([ref("password")], CONFIRM_PASSWORD_ERROR_MESSAGE)
    .required(REQUIRED),
  paymentMethod: object({
    type: mixed().oneOf([PaymentMethodEnum.CREDIT, PaymentMethodEnum.PAYPAL]),
    email: string().when("type", {
      is: PaymentMethodEnum.PAYPAL,
      then: (schema) => schema.required(REQUIRED).email(EMAIL_ERROR_MESSAGE),
    }),
    creditCard: string()
      .when("type", {
        is: PaymentMethodEnum.CREDIT,
        then: (schema) =>
          schema.required(REQUIRED).test(
            "isValidCard",
            INVALID_PAYMENT_CARD_ERROR_MESSAGE,
            (value) => validateLuhnAlgorithm(value)
          ),
      }),
  }),
});
