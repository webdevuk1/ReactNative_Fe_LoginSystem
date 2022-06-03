import React from "react";

// Styled components
import styled from "styled-components/native";
import { colors } from "../Colors";
const { tertiary } = colors;

const StyledText = styled.Text`
  font-size: 30px;
  color: ${tertiary};
  text-align: left;
`;

const BigText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default BigText;
