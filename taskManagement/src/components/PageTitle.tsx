import React, { ReactNode } from "react";
import styles from "../styles/modules/title.module.scss";

type PageTitleProps = {
  children: ReactNode;
  rest?: React.HTMLAttributes<HTMLParagraphElement>;
};

const PageTitle: React.FC<PageTitleProps> = ({ children, rest }) => {
  return (
    <p className={styles.title} {...rest}>
      {children}
    </p>
  );
};

export default PageTitle;