import React from "react";

// Styled components
import styled from "styled-components/native";
import { colors } from "../Colors";
const { primary } = colors;

/*
Container will show the status bar, so for the top we'll add
some more padding and make use of the status bar height that we imported. So we added a padding top property.  
*/
const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${primary};
`;

const MainContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};

export default MainContainer;
