/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootDrawerParamList } from "../types";

const linking: LinkingOptions<RootDrawerParamList> = {
	prefixes: [Linking.makeUrl("/")],
	config: {
		screens: {
			RootStackNavigator: {
				screens: {
					Feed: "Feed",
					Profile: "Profile",
					SingleQuestion: "SingleQuestion",
					CreateQuestion: "CreateQuestion",
				},
			},
			OnBoardingScreen: "OnBoardingScreen",
			AuthChoice: "AuthChoice",
			Login: "Login",
		},
	},
};

export default linking;
