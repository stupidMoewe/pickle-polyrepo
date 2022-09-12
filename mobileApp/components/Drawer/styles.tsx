import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: height,
		// backgroundColor: "#000",
		width: "100%",
	},
	containerScroll: {
		height: "100%",
		justifyContent: "center",
	},
	text: {
		color: "#fff",
		fontSize: 24,
		margin: 5,
	},
	list: {
		marginTop: 20,
	},
});

export default styles;
