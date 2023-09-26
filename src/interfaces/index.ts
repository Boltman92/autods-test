import { PaymentMethodEnum } from "../enums";

export interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  paymentMethod: {
    type: PaymentMethodEnum;
    email?: string;
    creditCard?: string;
  };
}

export interface ValidationFieldsObject {
  [x: number]: keyof FormValues | Array<keyof FormValues>;
}
