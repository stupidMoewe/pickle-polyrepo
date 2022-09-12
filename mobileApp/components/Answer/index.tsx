import React from "react";
import { Pressable } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import { AnswerType } from "../../types";
import { Text, View } from "../Themed";
import styles from "./styles";

interface IProps {
	isAnswerChoozen: boolean;
	questionCount: number;
	answerQuestionHandler: (answerId: string) => void;
	isQuestionAnswered: boolean;
	answer: AnswerType;
}

export function Answer({
	questionCount,
	answerQuestionHandler,
	isAnswerChoozen,
	isQuestionAnswered,
	answer,
}: IProps) {
	const percentage = (answer.answeredCount / questionCount) * 100;
	const width = () => {
		if(!isQuestionAnswered){
			return {
				width: "100%",
				backgroundColor: "transparent",
				borderColor: "white",
				borderWidth: 2,
			}
		}
		return {
			width: `${percentage}%`,
			backgroundColor: isAnswerChoozen ? pinkPickle : "gray",
		};
	};
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.containerAnswer,
					isAnswerChoozen
						? styles.isAnswered
						: isQuestionAnswered && !isAnswerChoozen
						? styles.answerNotChoozen
						: null,
				]}
			>
				<View style={[styles.backgroundBox, width()]}></View>
				<Pressable onPress={() => answerQuestionHandler(answer.id)}>
					<Text style={styles.text}>{answer.content}</Text>
				</Pressable>
			</View>
			{isQuestionAnswered ? (
				<View style={styles.containerResult}>
					<Text style={styles.textResult}>{percentage}%</Text>
				</View>
			) : null}
		</View>
	);
}
