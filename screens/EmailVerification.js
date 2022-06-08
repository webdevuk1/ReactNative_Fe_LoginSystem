import React, { useState } from "react";
import { ActivityIndicator } from "react-native";

import { colors } from "../components/Colors";
const { secondary, lightGray } = colors;

// Custom components.
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";
import RowContainer from "../components/Containers/RowContainer";
import IconHeader from "../components/Icons/IconHeader";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";

// Infomation/Notes on StyledCodeInput.js & ResendTimer.js
const EmailVerification = () => {
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // Resending email
  const [activeResend, setActiveResend] = useState(false);

  // Code input
  // useState to monitor the value of the code inputted by user.
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");

  const handleEmailVerification = () => {};
  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <IconHeader name="lock-open" style={{ marginBottom: 30 }} />

        <RegularText style={{ marginBottom: 25, textAlign: "center" }}>
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
        />
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default EmailVerification;
