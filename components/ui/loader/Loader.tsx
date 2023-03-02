import React, { ReactNode, FC, useContext } from "react";
import { UIContext } from "../../../context/ui";
/* import { LoaderStyled } from "./Loader.styled"; */
import styles from "./Loader.module.css";

interface LoaderProps {
  children: ReactNode;
}

const Loader: FC<LoaderProps> = ({ children }) => {
  const { isFetching } = useContext(UIContext);

  return (
    <>
      {isFetching && (
        <div className={styles.wrapper}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {children}
    </>
  );
};

export default Loader;

{
  /* <LoaderStyled.Wrapper>
      <LoaderStyled.Spinner />
    </LoaderStyled.Wrapper> */
}
