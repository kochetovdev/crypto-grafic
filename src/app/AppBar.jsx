import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./Context/AppProvider";

const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div />
      <ControlButton name="dashboard" active></ControlButton>
      <ControlButton name="settings"></ControlButton>
    </Bar>
  );
};

export default AppBar;

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

const Logo = styled.div`
  margin-bottom: 10px;
  font-size: 1.5em;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      text-shadow: 0px 0px 60px #03ff03;
      color: red;
    `}
`;

const ControlButton = ({ name }) => {
  return (
    <AppContext.Consumer>
      {({ page, setPage }) => (
        <ControlButtonElem
          onClick={() =>
            setPage((prev) => ({
              ...prev,
              page: name,
            }))
          }
          active={page === name}
        >
          {toProperCase(name)}
        </ControlButtonElem>
      )}
    </AppContext.Consumer>
  );
};

const toProperCase = (lower) => {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
};
