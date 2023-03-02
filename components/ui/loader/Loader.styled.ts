import styled, { keyframes } from "styled-components";

const spinnerAnimation = keyframes`
    0% { transform: rotate(0deg)}
    100% { transform: rotate(360deg)}
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;

  animation: ${spinnerAnimation} 1s ease infinite;
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10000;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
`;

export const LoaderStyled = {
  Spinner,
  Wrapper,
};
