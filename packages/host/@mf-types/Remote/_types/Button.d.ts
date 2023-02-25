import { FC, ReactNode } from "react";
export interface ButtonProps {
    children: ReactNode;
    id: string;
}
declare const Button: FC<ButtonProps>;
export default Button;
