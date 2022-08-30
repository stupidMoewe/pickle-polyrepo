import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, TouchableHighlight } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import { useLikeQuestionMutation } from "../../store/features/likeApiSlice";
import { like, unlike } from "../../store/features/likeSlice";
import { IQuestion } from "../../types";
import { AnswerBntText } from "../AnswerBntText";
import { Text, View } from "../Themed";
import styles from "./styles";

export const TextText = ({ question }: { question: IQuestion }) => {
	// const questionLiked = useAppSelector((state) => state.like.isQuestionLiked);
	// const dispatch = useAppDispatch();

	const [likeQuestion, isQuestionLiked] = useLikeQuestionMutation({
		questionId: question.id,
	});

	const { title, possibleAnswers, likedByUsers } = question;
	const navigation = useNavigation();
	// const [questionLiked, setQuestionLiked] = useState(false);
	// const auth = useAuth();

	// const { doRequest: doRequestLikeQuestion, errors } = useLikeQuestion({
	// 	questionId: question.id,
	// 	onSuccess: () => {
	// 		console.log("success");
	// 	},
	// });

	// useEffect(() => {
	// 	return likedByUsers.includes(auth!.authData!.userId)
	// 		? setQuestionLiked(true)
	// 		: setQuestionLiked(false);
	// }, [likedByUsers]);

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
					<Pressable onPress={() => likeQuestion()} style={styles.iconArea}>
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
