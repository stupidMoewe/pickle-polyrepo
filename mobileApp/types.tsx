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
	SingleQuestion: { question: IQuestion };
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
export type QuestionTypeOptions =
	| "TextText"
	| "TextImage"
	| "ImageText"
	| "ImageImage"
	| "VideoText"
	| "VideoImage";

export interface IQuestion {
	id: string;
	questionType: QuestionTypeOptions;
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
	id: string;
	questionType: QuestionTypeOptions;
	title: string;
	possibleAnswers: string[];
	creatorId: string;
	likedCount: number;
	commentedCount: number;
	commentedByUsers: string[];
	isLikedByCurrentUser: boolean;
	answeredByUser: string[];
	expirationDate: number;
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
