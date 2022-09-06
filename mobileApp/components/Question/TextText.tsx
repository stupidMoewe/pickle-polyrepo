import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, TouchableHighlight } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { toogleLikeAsync } from "../../store/features/question/likeSlice";
import { IQuestionFeed } from "../../types";
import { AnswerBntText } from "../AnswerBntText";
import { Text, View } from "../Themed";
import styles from "./styles";

export const TextText = ({ question }: { question: IQuestionFeed }) => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const { id, title, possibleAnswers, isLikedByCurrentUser } = question;
	const [isQuestionLiked, setIsQuestionLiked] = useState(isLikedByCurrentUser);

	const result = useAppSelector((state) => state.questionToogleLike);

	const likeStatus = useAppSelector((state) => state.questionToogleLike.questionLiked);

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
					<AnswerBntText
						answerId={answerId}
						key={index}
						onPress={() => {
							console.log("answer btn pressed");
						}}
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
