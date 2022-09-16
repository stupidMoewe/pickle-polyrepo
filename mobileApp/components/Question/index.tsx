import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pinkPickle } from "../../constants/ThemeColors";
import {
	useAnswerQuestionMutation,
	useGetAnswersQuestionQuery,
	useLikeMutation,
} from "../../store/features/feed/userFeedApi";
import { IQuestionFeed } from "../../types";
import { Answer } from "../Answer";
import GoBack from "../GoBackIcon";
import { Text, View } from "../Themed";
import styles from "./styles";

const profileImage = require("../../assets/images/profile-picture.jpg");

export default function Question({ question }: { question: IQuestionFeed }) {
	const navigation = useNavigation();

	const [like] = useLikeMutation();
	const [answerQuestion] = useAnswerQuestionMutation();

	const { id, title, isAnsweredByCurrentUser, isLikedByCurrentUser, answerChoozenId, titleType } =
		question;

	console.log("question", question);

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
				<View style={styles.rowContainer}>
					{titleType == "Text" ? (
						<Text style={styles.title}>{title}</Text>
					) : (
						<Image
							source={{ uri: title }}
							style={{ height: "100%", width: "100%" }}
						></Image>
					)}
				</View>
				<View style={styles.rowContainer}>
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
				{/* {isAnsweredByCurrentUser && (
					<Text style={styles.textNbOfAnswers}>
						{question.answeredCount}{" "}
						{question.answeredCount > 1 ? "réponses" : "réponse"}
					</Text>
				)} */}
			</View>
			<View style={styles.questionScreen}>
				<View style={styles.bottomIcons}>
					<Pressable onPress={likeQuestionHandler} style={styles.iconArea}>
						<AntDesign
							name="heart"
							size={45}
							color={isLikedByCurrentUser ? pinkPickle : "lightgray"}
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
			<View style={styles.topIconsContainer}>
				<GoBack />
				<Pressable onPress={() => navigation.navigate("Profile")}>
					<Image
						source={
							question.creator.imageUrl
								? { uri: question.creator.imageUrl }
								: profileImage
						}
						resizeMode="cover"
						style={styles.profileImage}
					></Image>
				</Pressable>
			</View>
		</View>
	);
}
