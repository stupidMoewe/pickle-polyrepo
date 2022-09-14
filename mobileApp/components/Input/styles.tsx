import { Dimensions, StyleSheet } from "react-native";
import { fontNormal } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	input: {
		width: "100%",
		height: 50,
		borderWidth: 0.5,
		borderColor: "white",
		borderRadius: 8,
		color: "white",
		fontSize: fontNormal,
		fontWeight: "bold",
		alignSelf: "center",
		paddingHorizontal: 15,
	},
	inputContainer: {
		marginVertical: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconCamera: {
		backgroundColor: "transparent",
		width: 40,
	},
	imageContainer: {
		borderColor: "white",
		borderWidth: 2,
		padding: 10,
		marginVertical: 10,
		borderRadius: 8,
		width: width * 0.9,
	},
	imageDisplay: {
		// width: "100%",
		height: 300,
	},
	modalContainer: {
		borderColor: "white",
		borderWidth: 1,
		width: width,
		height: height,
		position: "absolute",
		elevation: 10,
		top: 0,
		left: 0,
		zIndex: 100,
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
	lightInputContainer: {
		// borderColor: "white",
		// borderWidth: 1,
	},
	lightInput: {
		fontSize: 30,
		color: "white",
	},
});

export default styles;
