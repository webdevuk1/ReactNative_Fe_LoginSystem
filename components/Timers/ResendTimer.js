import React, { useState, useEffect } from "react";

// Styled components
import styled from "styled-components/native";
import SmallText from "../Texts/SmallText";
import PressableText from "../Texts/PressableText";
import RowContainer from "../Containers/RowContainer";
import { colors } from "../Colors";
const { accent, fail, success } = colors;

// Notes
/*
    Resend Timer info.

    Btn will be a pressable text with a dynamic value that is counting down (Timer)

    Within EmailVerification.js we will set a useState ( activeResend, setActiveResend ) while activeResend is false we want the resend btn to be disabled and counting down once the state is true & the timer has finished we will set activeResnd to true and allow the user to click on the btn. in ResendTimer.js import the activeResend, setActiveResend from the props. 
    (( The reason we declare activeResend, setActiveResend within emailVerificaition.js is so we can use the state to dynamically (conditional render) the Timer to the ui. ))  

    Create function called triggerTimer this will receive a time in seconds with default value of 30.

    Create useState which tracks the time left (timerLeft, setTimeLeft).

    For targetTimeInSeconds we will create useState for it (targetTime, setTargetTime). 

    Within triggerTimer function we will set time recived ( targetTimeInSeconds = 30 ) into (targetTime, setTargetTime) state & setting ( activeResend, setActiveResend ) to false, so that the resend btn will disable and start counting down.
    
    Now create variable called fianlTime were convert the date into a time this will enable us to be able to implement the timer, We will use  =new Date() in milliseconds, As targetTimeInSeconds is in seconds you need to mutliply * by 1000 to convert it to milliseconds. (+new Date()) + Is a shortcut for converting the date to an integer value.
    
    Were use a setInterval() function to calculate the time left (every second). setInterval() will call a function (calculateTimeLeft) with a prop of (finalTime) this will be called every second (1000 milliseconds, 1 second = 1000 milliseconds, setInterval(), 1000).

    Within calculateTimeLeft function we will be calculating the final time by checking for the difference between the finalTime received from props and the current date() time. 
    
    This will be executing an IF statement every second to determine if the difference is greater than 0 or not (if greater than 0  our final time has not been reached yet) So carry on running the setInterval() code. 

    If Block:
    If the difference is greater than 0 were convert differnce into second by divide it by thousand and rounding it to whole number with Math.round then store the difference into setTimeLeft. setTimeLeft state will be use on the ui to display the countdown timer.

    Else Block:
    Timer is over so we clear our setInterval(), setTimeLeft(true), ---------------What does setActiveResend(true) do something to do with emailverifcation.js page ----------
    
    Explain: We do this because finalTime variable we add 30 second to the current time and within calculateTimeLeft function we figure out difference between current time + finalTime which 30 seconds into the future, once the difference becomes 0 we execute code within the IF statement.

    useEffect:
    Now whenever our componnent mounts (When user visit EmailVerification.js) we automatically trigger the count down timer (triggerTimer function). Then we will display the {timeLeft || targetTime} onto the ui, we will wrap this with activeResend to be able condition render when timer is displayed on the ui (!activeResend: activeResend === false show timer).

    Create a resend btn which is a PressableText this will have onPress function that calls a function (resendEmail()) that we have deconstructed from the props (EmailVerification.js) and were pass it triggerTimer into its prams (resendEmail(triggerTimer)) triggerTimer will be called if resend btn is pressed. 
    
    Now create a an activity indicator while its loading aswell as  dynamically change the btn texts. If sent is successfully want change the btn text to "sent" with background color of green nd if its failed change to "failed" with background color of red.
    
    Create a useState for the text which will be receive from the (EmailVerification.js) this be called resendStatus this will determane what the btn txt displays and the color. 
 
    const [activeResend, setActiveResend] = useState(false);
    - When activeResend is true countdown timer will be false & wont be displayed onto the ui.
    - When activeResend is true the pressableText disabled feature will be false, Example CountDown is active (activeResend is false) so pressableText will be disabled.

    const [resendStatus, setResendStatus] = useState("Resend");
    - resendStatus will control the color & text.

    const [resendingEmail, setResendingEmail] = useState(false);
    Think resndingEmail connected to the active indicator
    2:16:00
*/

const StyledView = styled.View`
  align-items: center;
`;

const ResendText = styled(SmallText)`
  color: ${accent};
  ${(props) => {
    const { resendStatus } = props;
    if (resendStatus == "Failed!") {
      return `color: ${fail}`;
    } else if (resendStatus == "Sent!") {
      return `color: ${success}`;
    }
  }}
`;

const ResendTimer = ({
  activeResend,
  setActiveResend,
  targetTimeInSeconds,
  resendEmail,
  resendStatus,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);

  let resendTimerInterval;

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    // console.log("finalTime " + finalTime + " dif " + difference);
    // >= Greater than or equal to or > Greater than
    if (difference > 0) {
      // Because difference is in milliseconds we divide it by thousand to convert it to seconds.
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTargetTime(null);
    }
  };

  useEffect(() => {
    triggerTimer(targetTimeInSeconds);

    // When we change the page clearInterval(resendTimerInterval);
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  return (
    <StyledView {...props}>
      <RowContainer>
        <SmallText>Didn't receive the email? </SmallText>
        <PressableText
          onPress={() => resendEmail(triggerTimer)}
          disabled={!activeResend}
          style={{ opacity: !activeResend ? 0.2 : 1 }}
        >
          <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
        </PressableText>
      </RowContainer>

      {/* When activeResend is true countdown timer will be false & wont show on the ui */}
      {!activeResend && (
        <SmallText>
          in{" "}
          <SmallText style={{ fontWeight: "bold" }}>
            {timeLeft || targetTime}
          </SmallText>{" "}
          second(s)
        </SmallText>
      )}
    </StyledView>
  );
};

export default ResendTimer;
