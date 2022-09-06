import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../../components/Themed";
import { IQuestion } from "../../types";
import styles from "./styles";

interface ProfileQuestionPreviewProps {
	questionId: string;
}

export function ProfileQuestionPreview({ questionId }: ProfileQuestionPreviewProps) {
	const [question, setQuestion] = useState<IQuestion>();
	const [loading, setLoading] = useState<Boolean>(true);
	const questionAPIUrl = Constants?.manifest?.extra?.questionAPIUrl;
	const navigation = useNavigation();

	useEffect(() => {
		const fetchQuestion = async () => {
			axios(`${questionAPIUrl}/questions/${questionId}`)
				.then((res) => {
					setQuestion(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchQuestion();
	}, []);

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => {
				if (!loading && question) {
					navigation.navigate("SingleQuestion", { question });
				}
			}}
		>
			<Text>{question?.title}</Text>
			{question?.possibleAnswers.map((answer, key) => (
				<Text key={key}>{answer}</Text>
			))}
		</TouchableOpacity>
	);
}
