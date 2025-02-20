import React, { SelectHTMLAttributes, ReactNode } from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

type FilterButtonProps = {
  id?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

const FilterButton: React.FC<FilterButtonProps> = ({ children, id, ...rest }) => {
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

export default FilterButton;