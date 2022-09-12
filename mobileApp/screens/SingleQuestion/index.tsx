import React from "react";
import Question from "../../components/Question";
import { View } from "../../components/Themed";
import { IQuestionFeed } from "../../types";
import styles from "./styles";

export default function SingleQuestion({ route }: any) {
	const question = route.params.question as IQuestionFeed;
	return (
		<View style={styles.container}>
			<Question question={question} />
		</View>
	);
}
