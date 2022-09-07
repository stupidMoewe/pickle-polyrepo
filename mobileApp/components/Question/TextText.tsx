import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, TouchableHighlight } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAppDispatch } from "../../store/app/hooks";
import { toogleLikeAsync } from "../../store/features/question/likeSlice";
import { IQuestionFeed } from "../../types";
import { Answer } from "../Answer";
import { Text, View } from "../Themed";
import styles from "./styles";

export const TextText = ({ question }: { question: IQuestionFeed }) => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();

	const {
		id,
		title,
		possibleAnswers,
		isAnsweredByCurrentUser,
		isLikedByCurrentUser,
		answerChoozenId,
	} = question;

	const [isQuestionAnsweredHook, setIsQuestionAnsweredHook] = useState(isAnsweredByCurrentUser);

	const [isQuestionLiked, setIsQuestionLiked] = useState(isLikedByCurrentUser);
	const likeQuestionHandler = () => {
		// update sync redux state of the like state
		setIsQuestionLiked(!isQuestionLiked);
		// update async
		dispatch(toogleLikeAsync({ questionId: id, isLiked: isQuestionLiked }));
		// update redux state depending on request result
	};

	return (
		<View style={styles.container}>
			<View style={styles.questionContainer}>
				<Text style={styles.title}>{title}</Text>
				{possibleAnswers.map((answerId, index) => (
					<Answer
						answerId={answerId}
						questionId={question.id}
						key={index}
						isQuestionAnsweredHook={isQuestionAnsweredHook}
						setIsQuestionAnsweredHook={setIsQuestionAnsweredHook}
						isAnswerChoozen={answerChoozenId === answerId}
						questionCount={question.answeredCount}
					/>
				))}
			</View>
			<View style={styles.questionScreen}>
				<View style={styles.bottomIcons}>
					<Pressable onPress={likeQuestionHandler} style={styles.iconArea}>
						<AntDesign
							name="heart"
							size={45}
							color={isQuestionLiked ? pinkPickle : "gray"}
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
