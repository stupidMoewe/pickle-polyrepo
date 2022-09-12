import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import { useGetAnswersQuestionQuery } from "../../store/features/feed/userFeedApi";
import { IQuestionFeed } from "../../types";
import styles from "./styles";

interface ProfileQuestionPreviewProps {
	question: IQuestionFeed;
}

export function ProfileQuestionPreview({ question }: ProfileQuestionPreviewProps) {
	const navigation = useNavigation();
	const { data: answers, isError, isLoading } = useGetAnswersQuestionQuery(question.id);

	if (isLoading) {
		return <Text>Loading...</Text>;
	} else if (isError || answers === undefined) {
		return <Text>Error</Text>;
	}
	return (
		<TouchableOpacity
			style={[styles.container, question.isAnsweredByCurrentUser && styles.containerAnswered]}
			onPress={() => {
				if (question) {
					navigation.navigate("SingleQuestion", { question });
				}
			}}
		>
			<Text style={styles.title}>{question?.title}</Text>
			{answers.map((answer, key) => (
				<View
					style={[
						styles.answerBox,
						question.answerChoozenId == answer.id && styles.answerBoxAnswered,
					]}
					key={key}
				>
					<Text style={styles.answer}>{answer.content}</Text>
				</View>
			))}
		</TouchableOpacity>
	);
}
