import React, { useState } from "react";

import { colors } from "../components/Colors";
const { darkGray } = colors;

// Custom components.
import MainContainer from "../components/Containers/MainContainer";
import BigText from "../components/Texts/BigText";
import InfoCard from "../components/Cards/InfoCards";

// Styled components
import styled from "styled-components/native";
import { ScreenHeight } from "../components/PhoneDimensions";

const TopBg = styled.View`
  background-color: ${darkGray};
  width: 100%;
  height: ${ScreenHeight * 0.3}px;
  border-radius: 30px;
  position: absolute;
  top: -30px;
`;

const Dashboard = () => {
  return (
    <MainContainer style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
      <TopBg />
      <MainContainer style={{ backgroundColor: "transparent" }}>
        <BigText style={{ marginBottom: 25, fontWeight: "bold" }}>
          Hello
        </BigText>
        <InfoCard
          icon="chart-timeline-variant"
          title="Balance"
          value="12,142.12"
          date="13/05/2022"
          style={{ marginBottom: 25 }}
        />
        <InfoCard
          icon="chart-arc"
          title="Savings"
          value="3,156.00"
          date="Last 6 Months"
        />
      </MainContainer>
    </MainContainer>
  );
};

export default Dashboard;
