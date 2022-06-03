import Constants from "expo-constants";
import { Dimensions } from "react-native";

// Getting the Users phone dimensions.
export const StatusBarHeight = Constants.statusBarHeight;
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
