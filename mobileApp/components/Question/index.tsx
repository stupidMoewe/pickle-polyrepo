import React from "react";
import { IQuestionFeed } from "../../types";
import { Text, View } from "../Themed";
import { TextText } from "./TextText";

export default function Question({ question }: { question: IQuestionFeed }) {
	const { questionType } = question;

	const QuestionToRender = () => {
		switch (questionType) {
			case "TextText":
				return <TextText question={question} />;
			default:
				return (
					<View>
						<Text>Problem</Text>
					</View>
				);
		}
	};

	return QuestionToRender();
}
