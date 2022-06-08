import React, { useState, useEffect } from "react";

// Styled components
import styled from "styled-components/native";
import SmallText from "../Texts/SmallText";
import PressableText from "../Texts/PressableText";
import { colors } from "../Colors";
const { primary } = colors;

/*
    Resend Timer info.

    Btn will be a pressable text with a dynamic value that is counting down (Timer)

    Within EmailVerification.js we will set a useState ( activeResend, setActiveResend ) while activeResend is false we want the resend btn to be disabled and counting down once the state is true & the timer has finished we will set activeResnd to true and allow the user to click on the btn. in ResendTimer.js import the activeResend, setActiveResend from the props. 
    (( The reason we declare activeResend, setActiveResend within emailVerificaition.js is so we can use the state to dynamically (conditional render) the Timer to the ui. ))  

    Create function called triggerTimer this will receive a time in seconds with default value of 30.

    Create useState which tracks the time left (timerLeft, setTimeLeft).

    For targetTimeInSeconds we will create useState for it (targetTime, setTargetTime). 

    Within triggerTimer function we will set time recived ( targetTimeInSeconds = 30 ) into (targetTime, setTargetTime) state & setting ( activeResend, setActiveResend ) to false, so that the resend btn will disable and start counting down. Now create variable called fianlTime were convert the date into a time this will enable us to be able to implement the timer, We will use  new Date() in milliseconds, As targetTimeInSeconds is in seconds you need to mutliply * by 1000 to convert it to milliseconds.
    (-------- Find out what the + in +new Date() does something to do with intgers -----------)
    
    Were use a setInterval() function to calculate the time left (every second). setInterval() will call a function (calculateTimeLeft) with a prop of (finalTime) this will be called every second (1000 milliseconds, 1 second = 1000 milliseconds, setInterval(), 1000).

    Within calculateTimeLeft function we will be calculating the final time by checking for the difference between the finalTime received from props and the current date() time, Then we will be executing an IF statement to determine greater than or equal to 0.
    Explain: we do this because finalTime variable we add 30 second to the current time and within calculateTimeLeft function we figure out difference between current time + finalTime which 30 seconds into the future, once the difference becomes 0 we execute an IF statement.

    2:12:00
*/

const StyledView = styled.View`
  align-items: center;
`;

const ResendTimer = ({
  activeResend,
  setActiveResend,
  targetTimeInSeconds,
  resendEmail,
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
    // >= Greater than or equal to:
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTargetTime(null);
    }
  };

  useEffect(() => {
    triggerTimer(targetTimeInSeconds);

    // When change page return
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  return (
    <StyledView {...props}>
      <SmallText>Didn't receive the email? Resend</SmallText>
      <PressableText onPress={() => resendEmail(triggerTimer)}></PressableText>
      {!activeResend && (
        <SmallText>
          in
          <SmallText style={{ fontWeight: "bold" }}>
            {timeLeft || targetTime}
          </SmallText>
          second(s)
        </SmallText>
      )}
    </StyledView>
  );
};

export default ResendTimer;
