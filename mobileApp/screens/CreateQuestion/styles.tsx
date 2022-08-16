import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		// paddingTop: "20%",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		height: height,
	},
	createQuestionContainer: {
		marginTop: "20%",
	},
	inputContainer: {
		marginBottom: 40,
	},
	inputView: {
		// flexDirection: "column",
		// alignItems: "center",
		// justifyContent: "space-between",
		// borderColor: "#fff",
		// borderWidth: 1,
		// width: width,
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
		marginBottom: 60,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		marginLeft: 20,
	},
	label: {
		fontSize: fontLarge,
		marginBottom: 10,
	},
	postQuestionBtn: {
		marginBottom: 50,
	},
	modalExitBtn: {
		position: "absolute",
		top: 30,
		left: 20,
		backgroundColor: "transparent",
	},
	iconCamera: {
		margin: 10,
		backgroundColor: "transparent",
	},
	imageDisplay: {
		width: "100%",
		height: 400,
	},
});

export default styles;
