import { FC, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  id: string;
}

const Button: FC<ButtonProps> = ({ children, id }) => {
  return <button name={id}>{children}</button>;
};

export default Button;
