import React from "react";
import { IQuestion } from "../../types";
import { View, Text } from "../Themed";
import { TextText } from "./TextText";

export default function Question({ question }: { question: IQuestion }) {
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
