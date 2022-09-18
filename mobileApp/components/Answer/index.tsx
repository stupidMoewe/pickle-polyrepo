import React, { useEffect } from "react";
import { Image, Pressable } from "react-native";
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
		if (!isQuestionAnswered) {
			return {
				backgroundColor: "transparent",
				width: 0,
				borderWidth: 0,
			};
		}
		return {
			width: `${Math.max(percentage, 14)}%`,
			backgroundColor:
				answer.answerType == "Image"
					? isAnswerChoozen
						? "rgba(255, 0, 129, 0.3)"
						: "rgba(50, 50, 50, 0.6)"
					: isAnswerChoozen
					? pinkPickle
					: "gray",
			borderColor: isAnswerChoozen ? pinkPickle : "gray",
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
				{isQuestionAnswered && (
					<View style={[styles.backgroundBox, width()]}>
						<View style={styles.containerResult}>
							<Text style={styles.textResult}>{percentage}%</Text>
						</View>
					</View>
				)}
				<Pressable
					onPress={() => answerQuestionHandler(answer.id)}
					style={{ width: "100%" }}
				>
					<Text style={styles.text}>{answer.content}</Text>
				</Pressable>
			</View>
		</View>
	);
}
