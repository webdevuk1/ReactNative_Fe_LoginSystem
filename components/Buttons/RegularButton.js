import React from "react";
import styled from "styled-components/native";

import RegularText from "../Texts/RegularText";
import { colors } from "../Colors";
const { accent, primary } = colors;

const ButtonView = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${accent};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 60px;
`;

const RegularButton = (props) => {
  return (
    <ButtonView {...props} onPress={props.onPress}>
      <RegularText style={[{ color: primary }, { ...props?.textStyle }]}>
        {props.children}
      </RegularText>
    </ButtonView>
  );
};

export default RegularButton;
