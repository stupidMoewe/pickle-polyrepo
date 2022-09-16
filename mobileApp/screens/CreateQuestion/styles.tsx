import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		borderColor: "red",
		paddingBottom: 20,
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
		display: "flex",
		justifyContent: "space-between",
		paddingTop: 100,
		paddingVertical: 10,
		backgroundColor: "transparent",
	},
});

export default styles;
