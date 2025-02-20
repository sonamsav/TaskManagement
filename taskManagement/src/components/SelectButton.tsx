import React, { SelectHTMLAttributes, ReactNode } from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
} as const;

type ButtonType = keyof typeof buttonTypes;

interface SelectButtonProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  id: string;
  type?: ButtonType;
}

const SelectButton: React.FC<SelectButtonProps> = ({ children, id, ...rest }) => {
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export default SelectButton;