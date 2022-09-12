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
		width: width * 0.9,
	},
	titleContainer: {
		marginTop: "20%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
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
	topBtns: {
		backgroundColor: "transparent",
		width: width * 0.9,
		position: "absolute",
		top: 50,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
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
	imageDisplay: {
		width: "100%",
		height: 400,
	},
});

export default styles;
