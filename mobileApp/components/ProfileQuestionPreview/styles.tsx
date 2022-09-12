import { Dimensions, StyleSheet } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexBasis: width / 3 - 1,
		margin: 0.5,
		height: 200,
		borderWidth: 2,
		padding: 10,
		backgroundColor: "lightslategray",
		borderColor: pinkPickle,
		maxWidth: width / 3 - 1,
	},
	containerAnswered: {
		borderColor: "lightgray",
		borderWidth: 0,
		backgroundColor: "#999",
	},
	title: {
		textAlign: "center",
		fontSize: 18,
	},
	answerBox: {
		borderColor: "white",
		borderWidth: 1,
		marginTop: "10%",
		padding: 4,
		borderRadius: 6,
		backgroundColor: "transparent",
	},
	answerBoxAnswered: {
		backgroundColor: "lightpink",
		borderColor: "lightpink",
	},
	answer: {
		fontSize: 14,
	},
});

export default styles;
