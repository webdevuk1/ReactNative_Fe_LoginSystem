import React, { useState } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Styled components
import styled from "styled-components/native";
import SmallText from "../Texts/SmallText";
import { colors } from "../Colors";
const { primary, secondary, tertiary, accent, lightGray } = colors;

const InputField = styled.TextInput`
  background-color: ${primary};
  padding: 15px;
  padding-left: 65px;
  padding-right: 55px;
  border-radius: 10px;
  font-size: 16px;
  height: 60px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
  border-color: ${secondary};
  border-width: 2px;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${secondary};
  padding-right: 10px;
`;

const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 15px;
  z-index: 1;
`;

const StyledTextInput = ({ icon, label, isPassword, ...props }) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);
  const [hidePassword, setHidePassword] = useState(true);
  // customOn function info:
  /*  
    Change the styling of the input field background color when focused on. Toggle useState whenever our input is selected, This overRides the inputFields stlye. 

    In addition to this we want to spread any other style properties that we may receive from the props. style={{ backgroundColor: inputBackgroundColor, ...props?.style }}

    Whenever we click on input field formik will toggle onFocus or onBlur functions based on what we received.

    In this function (customOnBlur) we'll call the onBlur property that we received from formik via the props property. Then were set the value of our inputbackgroundColor to primary. This is because onBlur triggers when our input field loses focus.

    Create a similar one function when our input is in focus.
  */
  const customOnBlur = () => {
    props?.onBlur;
    setInputBackgroundColor(primary);
  };

  const customOnFocus = () => {
    props?.onFocus;
    setInputBackgroundColor(secondary);
  };
  // isPassword & hidePassword info:
  /* 
        isPassword:
        We will toggle this property that we may receive from the props.
            
        If this value of isPassword is true we will hide the users entered value of the input field. This will be excuted by setting hidePassword state initial value to true and comparing isPassword && hidePassword if both true secureTextEntry will HIDE the password entered.
          
        secureTextEntry:
        we'll use the secureTextEntry property from react native textInput props secureTextEntry If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false. Does not work with multiline={true}. 
        TYPE bool.  
        
        Display an icon on the right side of the password field this will toggle the password vaules visibility on the input field.

        1. isPassword will always be true if passed down from props.
        2. Created a hidePassword useState which is a boolen.
        3. InputField will display secureTextEntry depending on isPassword && hidePassword === true.
        4. Password field value will be toggled via hidePassword state.
        5. If rightIcon onPress function is clicked setHidePassword(!hidePassword); will be excuted. 
        
      */
  return (
    <View>
      {/* Reusable component: We will pass a prop that will define what icon, label or ect.. is displayed. */}
      <LeftIcon>
        <MaterialCommunityIcons name={icon} size={30} color={accent} />
      </LeftIcon>
      <SmallText>{label}</SmallText>
      <InputField
        {...props}
        placeholderTextColor={lightGray}
        style={{ backgroundColor: inputBackgroundColor, ...props?.style }}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
        secureTextEntry={isPassword && hidePassword}
      />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <MaterialCommunityIcons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={tertiary}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default StyledTextInput;
