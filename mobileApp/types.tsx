/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootDrawerParamList {}
	}
}

export type RootDrawerParamList = {
	RootStackNavigator: NavigatorScreenParams<RootTabParamList> | undefined;
	Question: undefined;
	Feed: undefined;
	Profile: undefined;
	SingleQuestion: { question: IQuestionFeed };
	ProfileStackNavigator: undefined;
	CreateQuestion: undefined;
	AdvancedCreateQuestion: undefined;
	OnBoardingScreen: undefined;
	AuthChoice: undefined;
	Login: undefined;
	Register: undefined;
	Settings: undefined;
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
	AdvancedCreateQuestion: undefined;
	ProfileStackNavigator: undefined;
	// Profile: undefined;
	Settings: undefined;
	OnBoarding: undefined;
	AuthChoice: undefined;
	Login: undefined;
	Register: undefined;
	SingleQuestion: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<RootTabParamList, Screen>,
	DrawerScreenProps<RootDrawerParamList>
>;

export interface IQuestion {
	id: string;
	title: string;
	possibleAnswers: string[];
	creatorId: string;
	likedCount: number;
	commentedCount: number;
	commentedByUsers: string[];
	likedByUsers: string[];
	answeredByUser: string[];
	expirationDate: number;
}

export interface IQuestionFeed {
	answeredCount: number;
	id: string;
	title: string;
	backgroundImageName: string;
	possibleAnswers: string[];
	likedCount: number;
	commentedCount: number;
	commentedByUsers: string[];
	isLikedByCurrentUser: boolean;
	isAnsweredByCurrentUser: boolean;
	answeredByUser: string[];
	expirationDate: number;
	answerChoozenId: string;
	creator: {
		id: string;
		username: string;
		imageUrl: string;
	};
}

export type AnswerTypeOptions = "Text" | "Image" | "Video";

export interface AnswerType {
	id: string;
	answerType: AnswerTypeOptions;
	content: string;
	creatorId: string;
	answeredCount: number;
	choozenByUser: string[];
}

export interface IUser {
	imageUrl: string | undefined;
	imageName: string | undefined;
	id: string;
	username: string;
	email: string;
	questions: string[];
	likesCount: number;
}

export interface IAnswer {
	id: string;
	answerType: AnswerTypeOptions;
	content: string;
	creatorId: string;
	answeredCount: number;
	choozenByUser: string[];
}
