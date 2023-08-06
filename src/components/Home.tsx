import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <StHome>
      <StTitle>HOME</StTitle>
    </StHome>
  );
};

export default Home;

const StHome = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const StTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text02};
`;
