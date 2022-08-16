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

// first word is the title's type of content, second of the answers
// ex: title of type Text, answers of type image => textImage
export enum QuestionType {
	TextText,
	TextImage,
	ImageText,
	ImageImage,
	VideoText,
	VideoImage,
}

export interface IQuestion {
	id: string;
	questionType: QuestionType;
	title: string; // whether the text of the title or the url of the image or the video
	answer1: string;
	answer2: string;
	answer3?: string;
	answer4?: string;
	creatorId: string;
}
