import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

type ButtonVariant = "primary" | "secondary";

type HeaderButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonTypes: Record<ButtonVariant, string> = {
  primary: "primary",
  secondary: "secondary",
};

const HeaderButton: React.FC<HeaderButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HeaderButton;