/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootDrawerParamList {}
	}
}

export type RootDrawerParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Question: undefined;
	Feed: undefined;
	SingleQuestion: { question: QuestionType };
	CreateQuestion: undefined;
	Modal: undefined;
	NotFound: undefined;
};

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> = DrawerScreenProps<
	RootDrawerParamList,
	Screen
>;

export type RootTabParamList = {
	Feed: undefined;
	CreateQuestion: undefined;
	Profile: undefined;
	OnBoarding: undefined;
	Login: undefined;
	SingleQuestion: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, Screen>,
	DrawerScreenProps<RootDrawerParamList>
>;

export interface QuestionType {
	question: {
		id: string;
		title: string;
		answer1: string;
		answer2: string;
		answer3?: string;
		answer4?: string;
		imageUrl?: string;
		creatorId: string;
	};
}
