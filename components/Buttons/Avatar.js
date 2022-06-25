import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import ProfileModal from "../Modals/ProfileModal";
import { colors } from "../Colors";
const { primary, accent, secondary } = colors;

const StyledView = styled.TouchableOpacity`
  background-color: ${primary};
  flex-direction: column;
  height: 45px;
  width: 45px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${secondary};
`;

const Avatar = (props) => {
  // Modal - info on MessageModal.js
  const [modalVisible, setModalVisible] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogout = async () => {
    setLoggingOut(true);

    // Clear user credentials

    setLoggingOut(false);
    setModalVisible(false);

    // Move to login
  };

  const showProfileModal = (user) => {
    setHeaderText(user);
    setModalVisible(true);
  };

  const onAvatarPress = () => {
    showProfileModal("Jim Boi");
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <StyledView onPress={onAvatarPress} style={props.imgContainerStyle}>
        <MaterialCommunityIcons name="account" size={35} color={accent} />
      </StyledView>
      <ProfileModal
        modalVisible={modalVisible}
        headerText={headerText}
        buttonHandler={onLogout}
        loggingOut={loggingOut}
        hideModal={hideModal}
      />
    </>
  );
};

export default Avatar;
