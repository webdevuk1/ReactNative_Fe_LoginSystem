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
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";
import RowContainer from "../components/Containers/RowContainer";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";
import MessageModal from "../components/Modals/MessageModal";

import styled from "styled-components/native";
const FormWrapper = styled.View`
  ${(props) => {
    return props.pinReady ? `opacity: 1` : `opacity: 0.3`;
  }}
`;

const ResetPassword = ({ navigation }) => {
  // Code input
  // useState to monitor the value of the code inputted by user.
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);

  // Resending email - Info on ResendTimer.js
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [resendingEmail, setResendingEmail] = useState(false);

  // Modal - info on MessageModal.js
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [buttonText, setButtonText] = useState("");

  // Parameter payload will be used to pass some data along to the new screen
  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  // If Success move user to dash else close the modal
  const buttonHandler = () => {
    if (modalMessageType === "success") {
      moveTo("Login");
    }

    setModalVisible(false);
  };

  const showModal = (type, headerText, modalMessage, buttonText) => {
    setModalMessageType(type);
    setHeaderText(headerText);
    setModalMessage(modalMessage);
    setButtonText(buttonText);
    setModalVisible(true);
  };

  const handleOnSubmit = async (credentials, setSubmitting) => {
    try {
      // Call backend

      // Move to next page

      setSubmitting(false);
      return showModal(
        "success",
        "All Good!",
        "Your password has been reset.",
        "Procced"
      );
    } catch (error) {
      setSubmitting(false);
      return showModal("failed", "Failed!", error.message, "Close");
    }
  };

  const resendEmail = async (triggerTimer) => {
    try {
      // In the process of sending the email (active indicator).
      setResendingEmail(true);

      // Make request to backend
      // Update setResendStatus() to Failed! or Send!

      setResendingEmail(false);
      // Hold on briefly
      setTimeout(() => {
        setResendStatus("Resend");
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus("Failed!");
      alert("Email Resend Failed: " + error.message);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ textAlign: "center" }}>
          Enter the 4-digit code sent to your email address.
        </RegularText>

        <StyledCodeInput
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
        />

        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
          style={{ marginBottom: 25 }}
        />

        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.newPassword == "" || values.confirmNewPassword == "") {
              setMessage("Please fill in all fields");
              setSubmitting(false);
            } else if (
              values.newPassword == "" ||
              values.confirmNewPassword == ""
            ) {
              setMessage("Please fill in all fields");
              setSubmitting(false);
            } else {
              handleOnSubmit(values, setSubmitting);
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
            <FormWrapper pinReady={pinReady}>
              <StyledTextInput
                label="New Password"
                icon="lock-open-variant"
                placeholder="* * * * * * * * * *"
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                isPassword={true}
                style={{ marginBottom: 25 }}
                editable={pinReady}
              />

              <StyledTextInput
                label="Confirm New Password"
                icon="lock-open-variant"
                placeholder="* * * * * * * * * *"
                onChangeText={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                value={values.confirmNewPassword}
                isPassword={true}
                style={{ marginBottom: 25 }}
                editable={pinReady}
              />

              {/* 
                If isSubmitting === false show login button else show activityIdicator.
              
                isSubmitting will be triggered to true. if handleSubmit been triggered. 
              */}
              {!isSubmitting && (
                <RegularButton disabled={!pinReady} onPress={handleSubmit}>
                  Submit
                </RegularButton>
              )}
              {isSubmitting && (
                <RegularButton>
                  <ActivityIndicator size="small" color="primary" />
                </RegularButton>
              )}
            </FormWrapper>
          )}
        </Formik>

        <RowContainer>
          <PressableText
            onPress={() => {
              moveTo("Login");
            }}
          >
            Back To Login Page
          </PressableText>
        </RowContainer>

        <MessageModal
          modalVisible={modalVisible}
          buttonHandler={buttonHandler}
          type={modalMessageType}
          headerText={headerText}
          modalMessage={modalMessage}
          buttonText={buttonText}
        />
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default ResetPassword;
