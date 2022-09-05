import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, TouchableHighlight } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { IQuestionFeed } from "../../types";
import { AnswerBntText } from "../AnswerBntText";
import { Text, View } from "../Themed";
import styles from "./styles";

export const TextText = ({ question }: { question: IQuestionFeed }) => {
	const questionLiked = useAppSelector((state) => state.like.isQuestionLiked);
	const dispatch = useAppDispatch();

	const { id, title, possibleAnswers, isLikedByCurrentUser } = question;
	const navigation = useNavigation();

	console.log(isLikedByCurrentUser, questionLiked);

	return (
		<View style={styles.container}>
			<View style={styles.questionContainer}>
				<Text style={styles.title}>{title}</Text>
				{possibleAnswers.map((answerId, index) => (
					<AnswerBntText
						answerId={answerId}
						key={index}
						onPress={() => {
							console.log("pressed heerer");
						}}
					/>
				))}
			</View>
			<View style={styles.questionScreen}>
				<View style={styles.bottomIcons}>
					<Pressable
						onPress={() => dispatch(likeQuestion({ questionId: id }))}
						style={styles.iconArea}
					>
						<AntDesign
							name="heart"
							size={45}
							color={questionLiked ? pinkPickle : "gray"}
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
