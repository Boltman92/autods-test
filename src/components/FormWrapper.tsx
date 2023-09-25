import React, { FC, memo, ReactNode } from "react";

interface FormProps {
  title: string;
  children: ReactNode;
}

export const FormWrapper: FC<FormProps> = memo(({ title, children }) => {
  return (
    <div className="form-wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  );
});
