import React, { useState } from "react";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";

import { colors } from "../components/Colors";
const { primary } = colors;

// Custom components.
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";
import RowContainer from "../components/Containers/RowContainer";

const Login = ({ navigation }) => {
  /* 
    Toggling succes & error mgs using MsgBox.js then displaying ui messages.

    isSuccessMessage set the initial value to false, because most of the time the messages that will be displayed are error messages rather than success messages.
  */
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  // Parameter payload will be used to pass some data along to the new screen
  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  const handleLogin = async (credentials, setSubmitting) => {
    try {
      setMessage(null);

      // Call backend

      // Move to next page
      moveTo("Dashboard");

      setSubmitting(false);
    } catch (error) {
      setMessage("Login failed: " + error.message);
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ marginBottom: 25 }}>
          Enter your account credentials
        </RegularText>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.email == "" || values.password == "") {
              setMessage("Please fill in all fields");
              setSubmitting(false);
            } else {
              handleLogin(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <>
              <StyledTextInput
                label="Email Address"
                icon="email-variant"
                placeholder="Example: Tom@gmail.com"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={{ marginBottom: 25 }}
              />

              <StyledTextInput
                label="Password"
                icon="lock-open"
                placeholder="* * * * * * * * * *"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                isPassword={true}
                style={{ marginBottom: 25 }}
              />

              {/*
                  White space is very important because it keeps the shape of the message box.
                  <MsgBox>{message || " "}</MsgBox>
                    
                  If you don't have White space for the MsgBox, the MsgBox component location will disappear within the UI. This will result in other components having to move out of the way for the message to be displayed.
              */}
              <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                {message || " "}
              </MsgBox>

              {/* 
                If isSubmitting === false show login button else show activityIdicator.
              
                isSubmitting will be triggered to true. if handleSubmit been triggered. 
              */}
              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>Login</RegularButton>
              )}
              {isSubmitting && (
                <RegularButton>
                  <ActivityIndicator size="small" color="primary" />
                </RegularButton>
              )}

              <RowContainer>
                <PressableText
                  onPress={() => {
                    moveTo("Signup");
                  }}
                >
                  New Account Sign Up
                </PressableText>
                <PressableText
                  onPress={() => {
                    moveTo("ForgotPassword");
                  }}
                >
                  Forgot Password
                </PressableText>
              </RowContainer>
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default Login;
