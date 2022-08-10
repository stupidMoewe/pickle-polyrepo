/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.makeUrl("/")],
	config: {
		screens: {
			Root: {
				screens: {
					OnBoardingScreen: {
						screens: {
							OnBoardingScreen: "one",
						},
					},
					Feed: {
						screens: {
							FeedScreen: "one",
						},
					},
					Profile: {
						screens: {
							Profile: "one",
						},
					},
					CreateQuestion: {
						screens: {
							CreateQuestion: "two",
						},
					},
					Menu: {
						screens: {
							Menu: "two",
						},
					},
				},
			},
			Modal: "modal",
			NotFound: "*",
		},
	},
};

export default linking;
