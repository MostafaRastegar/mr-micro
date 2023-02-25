import { FC, ReactNode } from "react";
import React from "react";

export interface ButtonProps {
  children: ReactNode;
  id: string;
}

const Button: FC<ButtonProps> = ({ children, id }) => {
  return <button name={id}>{children} 36</button>;
};

export default Button;
