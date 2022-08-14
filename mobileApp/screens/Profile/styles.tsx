import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal, fontSmall } from "../../constants/FontSizes";
import { pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: height,
		width: width,
	},
	headerContainer: {},
	topIconsLeft: {
		position: "absolute",
		top: 60,
		left: 20,
		backgroundColor: "transparent",
		shadowColor: "#555",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 10,
		shadowRadius: 10,
	},
	userView: {
		marginTop: 110,
		flexDirection: "row",
		// borderColor: pinkPickle,
		// borderWidth: 1,
	},
	userViewElement: {
		flex: 1,
		padding: 15,
	},
	userViewPicture: {
		flex: 1,
		// minWidth: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	profileImage: {
		borderColor: pinkPickle,
		borderWidth: 2,
		borderRadius: 20,
		width: 100,
		height: 100,
	},
	text: {
		fontSize: fontSmall,
	},
	textNumber: {
		fontSize: fontNormal,
	},
	buttonsContainer1: {
		width: "100%",
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonsContainer2: {
		width: "100%",
		marginTop: 30,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	mainContainer: {
		marginTop: 20,
		marginBottom: 20,
		flexDirection: "row",
		flexWrap: "wrap",
	},
});

export default styles;
