// Email Verificaton Code Input.
import React, { useRef, useState } from "react";
import styled from "styled-components/native";

import { colors } from "../Colors";
const { secondary, tertiary, accent } = colors;

/*
There is no way to display split inputs fields in react native. 
Work around:
When an user input is entered we will display a separate view for each value entered. 

This will be done by using TextInput which is hidden from the ui (HiddenTextInput). Within EmailVerification.js we will render <StyledCodeInput /> container we will pass it few props including a useState (const [code, setCode] = useState("");) to moniter the code/values entered. On StyledCodeInput.js we will deconstruct the props and place code & setCode onto the TextInput (HiddenTextInput) value={code} onChangeText={setCode}.

Next we will use a array (codeDigitsArray) to keep track of [code, setCode] entered into (HiddenTextInput). Within the new array will have a maxLength this will be the length of the split inputs fields displayed on the ui to show the codes. We will also display 0 in each of the split input field until changed by the user. const codeDigitsArray = new Array(maxLength).fill(0);

Next we will create a component called CodeInputsContainer, This will be a pressable container with a onPress={handleOnPress} handler. This component will give container style to the (codeDigitsArray) aswell as a onPress function which will determine what split inputs field is select by the user and will highlight the current input selected.

Inside CodeInputContainer we want to display our four digits but to prevent typing this manually four times we want to make use of the map method {codeDigitsArray.map(toCodeDigitInput)}. 

toCodeDigitInput will be a function componet which will render the codeDigitsArray. Mapping will give a index key which we will use to position are array code digit. 
( When you use the map method you can expect to receive the value's and the index number of the item so we can use those as the parameters within toCodeDigitInput function. )

We will give HiddenTextInput a useRef property (ref={textInputRef}) which will have a value of null (const textInputRef = useRef(null);). When User clicks on the CodeInputsContainer we want to focus on the input field which is targeted by using the useRef property once pressed the the keyboard should pop up. ( UseRef will point to the HiddenTextInput and allow you to change results of the array. )



*/

const CodeInputSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-vertical: 35px;
`;

// If set width / height to 0 px reference stops working
const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const CodeInputsContainer = styled.Pressable`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;

const CodeInput = styled.View`
  min-width: 15%;
  padding: 12px;
  border-bottom-width: 5px;
  border-radius: 10px;
  border-color: ${secondary};
`;

const CodeInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${tertiary};
`;

const StyledCodeInput = ({ code, setCode, maxLength }) => {
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);
  //1:50:00
  const handleOnPress = () => {
    // if true highlight code view
    setInputContainerIsFocused(true);
    // on focus we will get ref={textInputRef} from hiddenTextInput value.
    textInputRef?.current?.focus();
  };

  const handleOnSubmitEditing = () => {
    setInputContainerIsFocused(false);
  };

  const toCodeDigitInput = (value, index) => {
    // If code[index] doesn't exist then display emptyInputChar.
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;

    return (
      <CodeInput key={index}>
        <CodeInputText>{digit}</CodeInputText>
      </CodeInput>
    );
  };

  // returnKeyType refers to the key that is displayed at the bottom right corner of our keyboard.
  return (
    <CodeInputSection>
      <CodeInputsContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </CodeInputsContainer>
      <HiddenTextInput
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        onSubmitEditing={handleOnSubmitEditing}
      />
    </CodeInputSection>
  );
};

export default StyledCodeInput;
