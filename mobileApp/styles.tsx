import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const gloablStyles = StyleSheet.create({
	container: {},
	topIconsLeft: {
		top: 0,
		left: 10,
		backgroundColor: "transparent",
		elevation: 10,
	},
	pageTitle: {
		fontSize: 30,
		fontWeight: "bold",
		padding: 10,
	},
	h1Title: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 10,
	},
});

export default gloablStyles;
