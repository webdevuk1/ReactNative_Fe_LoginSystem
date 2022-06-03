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

const Signup = () => {
  /* 
    Toggling succes & error mgs using MsgBox.js then displaying ui messages.

    isSuccessMessage set the initial value to false, because most of the time the messages that will be displayed are error messages rather than success messages.
  */
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleSignup = async (credentials, setSubmitting) => {
    try {
      setMessage(null);

      // Call backend

      // Move to next page

      setSubmitting(false);
    } catch (error) {
      setMessage("Signup failed: " + error.message);
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
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.fullName == "" ||
              values.email == "" ||
              values.password == "" ||
              values.confirmPassword == ""
            ) {
              setMessage("Please fill in all fields");
              setSubmitting(false);
            } else if (values.password == "" || values.confirmPassword == "") {
              setMessage("Please fill in all fields");
              setSubmitting(false);
            } else {
              handleSignup(values, setSubmitting);
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
                label="Full Name"
                icon="account"
                placeholder="Example: Tom Walt"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
                style={{ marginBottom: 15 }}
              />

              <StyledTextInput
                label="Email Address"
                icon="email-variant"
                placeholder="Example: Tom@gmail.com"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={{ marginBottom: 15 }}
              />

              <StyledTextInput
                label="Password"
                icon="lock-open"
                placeholder="* * * * * * * * * *"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                isPassword={true}
                style={{ marginBottom: 15 }}
              />

              <StyledTextInput
                label="Confirm Password"
                icon="lock-open"
                placeholder="* * * * * * * * * *"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                isPassword={true}
                style={{ marginBottom: 15 }}
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
                <RegularButton onPress={handleSubmit}>Sign Up</RegularButton>
              )}
              {isSubmitting && (
                <RegularButton>
                  <ActivityIndicator size="small" color="primary" />
                </RegularButton>
              )}

              <PressableText style={{ paddingVertical: 15 }} onPress={() => {}}>
                Sign in to an existing account
              </PressableText>
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default Signup;
