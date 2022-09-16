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
	const height = () => {
		if (!isQuestionAnswered) {
			return {
				backgroundColor: "transparent",
				borderColor: "white",
				height: 0,
				borderWidth: 0,
			};
		}
		return {
			height: `${percentage}%`,
			backgroundColor: isAnswerChoozen ? pinkPickle : "gray",
		};
	};

	if (answer.answerType == "Image") {
		console.log(answer.content);
	}

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
				<View style={[styles.backgroundBox, height()]}></View>
				<Pressable
					onPress={() => answerQuestionHandler(answer.id)}
					style={{ width: "100%" }}
				>
					{answer.answerType == "Text" ? (
						<>
							<Text style={styles.text}>{answer.content} </Text>
							{isQuestionAnswered ? (
								<View style={styles.containerResult}>
									<Text style={styles.textResult}>{percentage}%</Text>
								</View>
							) : null}
						</>
					) : (
						<Image source={{ uri: answer.content }} style={styles.imageStyle}></Image>
					)}
				</Pressable>
			</View>
		</View>
	);
}
