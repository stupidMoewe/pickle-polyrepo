import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		paddingBottom: 20,
		alignContent: "center",
		alignItems: "center",
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
		backgroundColor: "transparent",
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		marginLeft: 20,
	},
	containerQuestions: {
		width: width,
		height: "100%",
		paddingTop: 100,
		backgroundColor: "transparent",
	},
	inputContainer: {
		width: width * 0.9,
		marginVertical: 20,
		alignSelf: "center",
	},
	inputLabel: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default styles;
