import { Dimensions, StyleSheet } from "react-native";
import { fontNormal, fontSmall } from "../../constants/FontSizes";
import { pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	animatedHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
		overflow: "hidden",
		display: "flex",
		backgroundColor: "dark",
	},
	container: {
		height: height,
		width: width,
	},
	headerContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "grey",
		height: "100%",
		justifyContent: "space-between",
	},
	usernameBox: {
		position: "absolute",
		top: 65,
		alignSelf: "center",
	},
	textUsername: {
		fontSize: 24,
	},
	topIconsLeft: {
		position: "absolute",
		top: 60,
		left: 20,
		backgroundColor: "transparent",
		elevation: 10,
		zIndex: 20,
	},
	userView: {
		marginTop: 110,
		flexDirection: "row",
	},
	userViewElement: {
		flex: 1,
		padding: 15,
	},
	userViewPicture: {
		flex: 1,
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
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	mainContainer: {
		marginBottom: 20,
		flexDirection: "row",
		flexWrap: "wrap",
	},
});

export default styles;
