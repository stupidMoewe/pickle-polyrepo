import { Dimensions, StyleSheet } from "react-native";
import { fontNormal } from "../../constants/FontSizes";
import { pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// marginTop: "15%",
		flex: 1,
		// padding: 4,
		backgroundColor: "transparent",
	},
	containerAnswer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
		fontWeight: "bold",
		zIndex: 100,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 10,
		borderTopEndRadius: 0,
		borderTopStartRadius: 0,
	},
	backgroundBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		// height: "100%",
		zIndex: -1,
		borderRadius: 10,
		borderColor: pinkPickle,
	},
	containerResult: {
		width: width * 0.15,
		textAlign: "center",
	},
	textResult: {
		fontSize: 18,
		textAlign: "right",
	},
	text: {
		fontSize: fontNormal,
		color: "white",
		margin: 14,
		textAlign: "center",
	},
	isAnswered: {},
	answerNotChoozen: {},
	imageStyle: { height: "100%", width: "100%" },
});

export default styles;
