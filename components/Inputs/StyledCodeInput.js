// Email Verificaton Code Input.
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";

import { colors } from "../Colors";
const { secondary, tertiary, accent } = colors;

/*
There is no way to display split inputs fields in react native. 
Work around:
When an user input is entered we will display a separate view for each value entered. 

This will be done by using TextInput which is hidden from the ui (HiddenTextInput). Within EmailVerification.js we will render <StyledCodeInput /> container we will pass it few props including a useState (const [code, setCode] = useState("");) to moniter the code/values entered. On StyledCodeInput.js we will deconstruct the props and place code & setCode onto the TextInput (HiddenTextInput) value={code} onChangeText={setCode}.

Next we will use a array (codeDigitsArray) to keep track of [code, setCode] entered into (HiddenTextInput). Within the new array will have a maxLength this will be the length of the split inputs fields displayed on the ui to show the codes. We will also display 0 in each of the split input field until changed by the user. const codeDigitsArray = new Array(maxLength).fill(0);

Next we will create a component called CodeInputsContainer, This will be a pressable container with a onPress={handleOnPress} handler. This component will give container style to the (codeDigitsArray).

Inside CodeInputContainer we want to display our four digits but to prevent typing this manually four times we want to make use of the map method {codeDigitsArray.map(toCodeDigitInput)}. 

toCodeDigitInput will be a function componet which will render the codeDigitsArray. Mapping will give a index key which we will use to position are array code digit. 
( When you use the map method you can expect to receive the value's and the index number of the item so we can use those as the parameters within toCodeDigitInput function. )

We will give HiddenTextInput a useRef property (ref={textInputRef}) which will have a value of null (const textInputRef = useRef(null);). When User clicks on the CodeInputsContainer we want to focus on the input field which is targeted by using the useRef property once pressed the the keyboard should pop up. ( UseRef will point to the HiddenTextInput. )

Now were use the onPress={handleOnPress} function to highlight the current input selected. CodeInputFocused will stlye the CodeInput view: Change border-color from secondary to accent when focused on. We will use inputContainerIsFocused state to toggle the styles. On handleOnPress were set setInputContainerIsFocused(true); 
and on handleOnSubmitEditing were set setInputContainerIsFocused(false);

handleOnSubmitEditing function:
( onSubmitEditing: Callback that is called when the text input's submit button is pressed. ) 

Now we know if our input field has been clicked on or not, we should determine what codeDigitInput to highlight. 

Figure out what index in the array is referring to the selected input. This will be done in toCodeDigitInput function with formatting note.

Disable btn if pin isn't ready:
Declare useState ( pinReady, setPinReady ) within EmailVerification.js to disable btn, then use a useEffect within StyledCodeInput.js to listen to code array this will determine if 4 digts within textfields is true then toggle the pinReady disable btn function. then back on emailVerification.js create a useState verifying, setVerifying which will conditional render a btn or disable btn depending on verifying === true and pinReady === true.
then use useEffect to compair code.length === maxLength if true will condions render componts onto ui

(( The reason we declare [pinReady, setPinReady] within emailVerificaition.js is so we can use the state to dynamically (conditional render) the button's to the ui. ))  

Now Create reset code function & timer. ( ResendTimer.js )

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
  border-width: 5px;
  border-radius: 10px;
  border-color: ${secondary};
`;

const CodeInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${tertiary};
`;

const CodeInputFocused = styled(CodeInput)`
  border-color: ${accent};
`;

const StyledCodeInput = ({ code, setCode, maxLength, setPinReady }) => {
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
  const codeDigitsArray = new Array(maxLength).fill(0);
  const textInputRef = useRef(null);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    // on focus we will get ref={textInputRef} from hiddenTextInput value.
    textInputRef?.current?.focus();
  };

  const handleOnSubmitEditing = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    // Toggle pinReady
    setPinReady(code.length === maxLength);

    // Once the ui component isn't mounted (we no longer on emailVerification page) setPinReady back to false.
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (value, index) => {
    // If code[index] doesn't exist then display emptyInputChar.
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;

    // Formatting
    // The length property sets or returns the number of elements in an array.
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;
    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
    // When this condition's are true highlight a input field. If inputContainerIsFocused true & isDigitFocused true toggle CodeInputFocused styles on.
    const StyledCodeInput =
      inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;

    return (
      <StyledCodeInput key={index}>
        <CodeInputText>{digit}</CodeInputText>
      </StyledCodeInput>
    );
  };

  // returnKeyType: refers to the key that is displayed at the bottom right corner of our keyboard.
  // onSubmitEditing: Callback that is called when the text input's submit button is pressed.
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
