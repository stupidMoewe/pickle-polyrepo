import React from "react";
import Question from "../../components/Question";
import { View } from "../../components/Themed";
import { QuestionType } from "../../types";
import styles from "./styles";

export default function SingleQuestion({ route }: any) {
	console.log("question single : ", route.params.question);
	const question = route.params.question;
	return (
		<View style={styles.container}>
			<Question question={question} />
		</View>
	);
}
