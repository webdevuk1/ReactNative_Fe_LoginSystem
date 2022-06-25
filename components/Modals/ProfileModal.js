import React from "react";
import { Modal, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import BigText from "../Texts/BigText";
import RegularButton from "../Buttons/RegularButton";
import { colors } from "../Colors";
const { tertiary, accent, secondary, primary } = colors;

import { ModalView, ModalPressableContainer } from "./MessageModal";

const StyledView = styled.View`
  background-color: ${primary};
  flex-direction: column;
  height: 65px;
  width: 65px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${secondary};
`;

const MessageModal = ({
  modalVisible,
  buttonHandler,
  headerText,
  loggingOut,
  hideModal,
}) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <ModalPressableContainer onPress={hideModal}>
        <ModalView>
          <StyledView>
            <MaterialCommunityIcons name="account" size={55} color={accent} />
          </StyledView>

          <BigText
            style={{ fontSize: 25, color: tertiary, marginVertical: 20 }}
          >
            {headerText}
          </BigText>

          {!loggingOut && (
            <RegularButton onPress={buttonHandler}>Logout</RegularButton>
          )}

          {loggingOut && (
            <RegularButton disabled={true}>
              <ActivityIndicator size="small" color={primary} />
            </RegularButton>
          )}
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
};

export default MessageModal;
