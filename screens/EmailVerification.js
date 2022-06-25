import React, { useState } from "react";
import { ActivityIndicator } from "react-native";

import { colors } from "../components/Colors";
const { secondary, lightGray } = colors;

// Custom components.
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import RegularButton from "../components/Buttons/RegularButton";
import IconHeader from "../components/Icons/IconHeader";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";
import MessageModal from "../components/Modals/MessageModal";

// Infomation/Notes on StyledCodeInput.js, ResendTimer.js & MessageModal.js
const EmailVerification = ({ navigation }) => {
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

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

  // Code input
  // useState to monitor the value of the code inputted by user.
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");

  const resendEmail = async (triggerTimer) => {
    try {
      // In the process of sending the email (active indicator). i think this wh does 2:28:00
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

  // If Success move user to dash else close the modal
  const buttonHandler = () => {
    if (modalMessageType === "success") {
      moveTo("Dashboard");
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

  const handleEmailVerification = async () => {
    try {
      // If verifying is true modal wont be shown
      setVerifying(true);
      // Call backend

      // Finished Verifying
      setVerifying(false);
      return showModal(
        "success",
        "All Good!",
        "Your email has been verified.",
        "Proceed"
      );
    } catch (error) {
      setVerifying(false);
      return showModal("failed", "Failed!", error.message, "Close");
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <IconHeader name="lock-open" style={{ marginBottom: 30 }} />

        <RegularText style={{ textAlign: "center" }}>
          Enter the 4-digit code sent to your email address.
        </RegularText>

        <StyledCodeInput
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
        />

        {!verifying && pinReady && (
          <RegularButton onPress={handleEmailVerification}>
            Verify
          </RegularButton>
        )}

        {!verifying && !pinReady && (
          <RegularButton
            disabled={true}
            style={{ backgroundColor: secondary }}
            textStyle={{ color: lightGray }}
          >
            Verify
          </RegularButton>
        )}

        {verifying && (
          <RegularButton>
            <ActivityIndicator size="small" color="primary" />
          </RegularButton>
        )}

        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
        />

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

export default EmailVerification;
