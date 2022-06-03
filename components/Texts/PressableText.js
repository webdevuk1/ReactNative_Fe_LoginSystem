import React from "react";
import styled from "styled-components/native";

import SmallText from "../Texts/SmallText";
import { colors } from "../Colors";
const { accent } = colors;

/*
    align-self: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self

    The align-self CSS property overrides a grid or flex item's align-items value.

    align-items will determine how all the flex items display whereas align-self is for overriding this on individual items.
*/
const StyledPressable = styled.Pressable`
  padding-vertical: 5px;
  align-self: center;
`;

const PressableText = (props) => {
  return (
    <StyledPressable onPress={props.onPress} {...props}>
      <SmallText style={{ color: accent }}>{props.children}</SmallText>
    </StyledPressable>
  );
};

export default PressableText;
