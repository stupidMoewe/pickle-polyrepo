import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ImageBackground, StyleSheet, TouchableHighlight } from "react-native";
import { fontLarge } from "../constants/FontSizes";
import { pinkPickle } from "../constants/ThemeColors";
import { AnswerBntText } from "./AnswerBntText";
import { Text, View } from "./Themed";

export default function Question({ question, navigation }: any): JSX.Element {
	return (
		<View style={styles.container}>
			<ImageBackground source={question.image} style={styles.ImageBackground}>
				<View style={styles.questionContainer}>
					<Text style={styles.title}>{question.title}</Text>
					<AnswerBntText styles={styles.answer} text={question.answer1} />
					<AnswerBntText styles={styles.answer} text={question.answer2} />
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
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: Dimensions.get("window").height,
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
		// padding: 20,
		paddingTop: "20%",
		// childern: {
		// 	marginBottom: "10%",
		// 	borderColor: "white",
		// 	borderWidth: 2,
		// 	backgroundColor: "white",
		// },
	},
	title: {
		// position: "relative",
		// top: "10%",
		fontSize: fontLarge,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		padding: 10,
		marginTop: "10%",
	},
	answer: {
		// fontSize: fontLarge,
		// textAlign: "center",
		// fontWeight: "bold",
		// color: "white",
		// padding: 10,
		marginTop: "15%",
		// borderRadius: 16,
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
		// shadowColor: "#171717",
		shadowColor: "#555",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 10,
		shadowRadius: 10,
	},
});
