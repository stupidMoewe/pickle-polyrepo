import { Dimensions, StyleSheet } from "react-native";
import { fontNormal } from "../../constants/FontSizes";
import { lightBlue, pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 25,
		borderRadius: 12,
		backgroundColor: lightBlue,
	},
	containerAnswer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
		fontWeight: "bold",
		borderRadius: 10,
		borderTopEndRadius: 0,
		borderTopStartRadius: 0,
		display: "flex",
		flexDirection: "row",
	},
	backgroundBox: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		zIndex: 1,
		borderRadius: 10,
		borderWidth: 3,
		borderColor: pinkPickle,
	},
	containerResult: {
		marginTop: 4,
		textAlign: "center",
		backgroundColor: "transparent",
	},
	textResult: {
		fontSize: 18,
		textAlign: "center",
	},
	text: {
		fontSize: fontNormal,
		color: "white",
		margin: 14,
		textAlign: "center",
	},
	isAnswered: {},
	answerNotChoozen: {},
	imageStyle: { height: "100%", width: "100%", borderRadius: 10 },
});

export default styles;
