import React from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";

const KeyboardAvoidingContainer = (props) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "transparent" }}
      /* The behavior will control how the keyboard avoiding view will behave. To ensure that the input fields are not covered by the keyboard for this there are some predefined values that you can pass to it on ios it is preferred to use padding and on android, it is preferred to use height So to be able to tell which one to apply at any given time we need to check for the os and that is why we brought in the platform from react native using the platform we target the os first we check if the os is ios if that is true we want to return pattern otherwise you want to return height.*/
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      /* Keyboard vertical offset value will determine the minimum value of how far we want the keyboard to be from the input fields so for this i'll use 20 pixels just to be safe. */
      keyboardVerticalOffset={20}
    >
      <ScrollView
        /*  Scroll view will make use of the pressable this will enable us to press anywhere on our page and cause an action to be triggered. In this case when we press anywhere on the page we want to dismiss our keyboard so that will be done in the unpressed property. */

        /* vertical scroll indicator for this we want to set the value to false otherwise when we use this component there will be a vertical scroll bar whenever we need to scroll our page. */
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={Keyboard.dismiss}>{props.children}</Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingContainer;
