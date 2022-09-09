import React from "react";
import { Pressable } from "react-native";
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
	return (
		<View style={[styles.container, isAnswerChoozen ? styles.questionAnswered : null]}>
			<Pressable onPress={() => answerQuestionHandler(answer.id)}>
				{isQuestionAnswered ? <Text>{answer?.answeredCount} réponses</Text> : null}
				<Text style={[styles.text, isAnswerChoozen ? styles.isAnswered : null]}>
					{answer.content}
				</Text>
				{isQuestionAnswered ? (
					<Text>{(answer?.answeredCount * 100) / questionCount}%</Text>
				) : null}
			</Pressable>
		</View>
	);
}
