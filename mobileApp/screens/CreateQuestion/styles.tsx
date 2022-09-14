import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		height: height,
	},
	createQuestionContainer: {
		height: height,
		width: width,
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		position: "absolute",
		alignItems: "center",
		top: 40,
		left: 20,
		zIndex: 1,
		// borderColor: "white",
		// borderWidth: 1,
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		marginLeft: 20,
	},
	label: {
		marginTop: 60,
		fontSize: fontLarge,
		marginBottom: 10,
	},
	postQuestionBtn: {
		marginBottom: 50,
	},
	inputContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconCamera: {
		backgroundColor: "transparent",
		width: 40,
	},
	containerQuestions: {
		width: width,
		height: height,
		position: "absolute",
		bottom: 0,
		display: "flex",
		justifyContent: "space-between",
	},
});

export default styles;
