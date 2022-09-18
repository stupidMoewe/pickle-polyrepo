import { Dimensions, StyleSheet } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		display: "flex",
		alignContent: "space-between",
	},
	scrollContrainer: {
		width: width * 0.9,
		alignSelf: "center",
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 30,
		margin: 25,
		alignSelf: "center",
		borderColor: pinkPickle,
		borderWidth: 3,
	},
	imageDisplay: {
		width: "100%",
		height: "100%",
	},
	topBtns: {
		backgroundColor: "transparent",
		width: width * 0.9,
		alignSelf: "center",
		position: "absolute",
		top: 50,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconCamera: {
		backgroundColor: "transparent",
		width: 40,
	},
});

export default styles;
