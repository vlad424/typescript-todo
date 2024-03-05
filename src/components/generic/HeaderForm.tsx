import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-grow: 1;

  align-items: center;
  justify-content: center;
`;

interface propsType {
    header: string
}

const HeaderForm: React.FC<propsType> = ( {header} : propsType) => {
  return (
    <StyledHeader>
      <h2 className="header-texr">{header}</h2>
    </StyledHeader>
  );
};

export default HeaderForm;
