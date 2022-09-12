import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal, fontSmall } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "15%",
	},
	containerAnswer: {
		width: width * 0.8,
		maxHeight: 140,
		borderColor: "white",
		fontWeight: "bold",
		alignSelf: "center",
		zIndex: 100,
	},
	backgroundBox: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "10%",
		height: "100%",
		backgroundColor: "red",
		zIndex: -1,
		borderRadius: 12,
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
	},
	isAnswered: {},
	answerNotChoozen: {},
});

export default styles;
