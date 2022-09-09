import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, TouchableHighlight } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import {
	useAnswerQuestionMutation,
	useGetAnswersQuestionQuery,
	useLikeMutation,
} from "../../store/features/feed/userFeedApi";
import { IQuestionFeed } from "../../types";
import { Answer } from "../Answer";
import { Text, View } from "../Themed";
import styles from "./styles";

export const TextText = ({ question }: { question: IQuestionFeed }) => {
	const navigation = useNavigation();

	const [like] = useLikeMutation();
	const [answerQuestion] = useAnswerQuestionMutation();

	const { id, title, isAnsweredByCurrentUser, isLikedByCurrentUser, answerChoozenId } = question;

	const likeQuestionHandler = () => {
		like(id);
	};

	const { data: answers, error, isLoading } = useGetAnswersQuestionQuery(question.id);
	const answerQuestionHandler = (answerId: string) => {
		answerQuestion({
			questionId: id,
			answerId,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.questionContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text>Likes: {question.likedCount}</Text>
				<Text>Answers: {question.answeredCount}</Text>
				{answers?.map((answer, index) => (
					<Answer
						answer={answer}
						key={index}
						questionCount={question.answeredCount}
						answerQuestionHandler={answerQuestionHandler}
						isAnswerChoozen={answerChoozenId === answer.id}
						isQuestionAnswered={isAnsweredByCurrentUser}
					/>
				))}
			</View>
			<View style={styles.questionScreen}>
				<View style={styles.bottomIcons}>
					<Pressable onPress={likeQuestionHandler} style={styles.iconArea}>
						<AntDesign
							name="heart"
							size={45}
							color={isLikedByCurrentUser ? pinkPickle : "gray"}
						/>
					</Pressable>
					<TouchableHighlight
						onPress={() => {
							navigation.navigate("CreateQuestion");
						}}
					>
						<AntDesign name="pluscircleo" size={70} color={pinkPickle} />
					</TouchableHighlight>
					<AntDesign
						name="clockcircleo"
						size={45}
						color={pinkPickle}
						style={styles.iconArea}
					/>
				</View>
			</View>
		</View>
	);
};
