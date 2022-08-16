import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, TouchableHighlight } from "react-native";
import { fontLarge } from "../constants/FontSizes";
import { pinkPickle } from "../constants/ThemeColors";
import { QuestionType } from "../types";
import { AnswerBntText } from "./AnswerBntText";
import { Text, View } from "./Themed";
const height = Dimensions.get("window").height;

// type questionComponentProp = DrawerNavigationProp<RootDrawerParamList, "Question">;

export default function Question({ question }: { question: QuestionType }) {
	const { title, answer1, answer2 } = question;
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			{/* <ImageBackground source={question.imageUrl} style={styles.ImageBackground}> */}
			<View style={styles.questionContainer}>
				<Text style={styles.title}>{title}</Text>
				<AnswerBntText styles={styles.answer} text={answer1} />
				<AnswerBntText styles={styles.answer} text={answer2} />
			</View>
			<View style={styles.questionScreen}>
				<View style={styles.bottomIcons}>
					<Text>
						<AntDesign name="heart" size={45} color={pinkPickle} />
					</Text>
					<TouchableHighlight
						onPress={() => {
							navigation.navigate("CreateQuestion");
						}}
					>
						{/* <Text> */}
						<AntDesign name="pluscircleo" size={70} color={pinkPickle} />
						{/* </Text> */}
					</TouchableHighlight>
					<Text>
						<AntDesign name="clockcircleo" size={45} color={pinkPickle} />
					</Text>
				</View>
			</View>
			{/* </ImageBackground> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: height,
	},
	ImageBackground: {
		flex: 1,
		resizeMode: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	questionContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		paddingTop: "20%",
	},
	title: {
		fontSize: fontLarge,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		padding: 10,
		marginTop: "10%",
	},
	answer: {
		marginTop: "15%",
	},
	questionScreen: {
		position: "absolute",
		display: "flex",
		width: "100%",
		height: "100%",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	bottomIcons: {
		width: "82%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 25,
		shadowColor: "#555",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 10,
		shadowRadius: 10,
	},
});
