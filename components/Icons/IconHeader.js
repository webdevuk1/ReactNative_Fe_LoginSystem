import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Styled components
import styled from "styled-components/native";
import { ScreenHeight } from "../PhoneDimensions";
import { colors } from "../Colors";
const { secondary, accent } = colors;

// Determine the width & height of IconHeader depending on the phone size.
const IconBg = styled.View`
  background-color: ${secondary};
  width: ${ScreenHeight * 0.15}px;
  height: ${ScreenHeight * 0.15}px;
  border-radius: ${ScreenHeight * 0.2}px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const IconHeader = ({ name, color, ...props }) => {
  return (
    <IconBg style={{ ...props.style }}>
      <MaterialCommunityIcons
        name={name}
        size={ScreenHeight * 0.08}
        color={color ? color : accent}
      />
    </IconBg>
  );
};

export default IconHeader;
