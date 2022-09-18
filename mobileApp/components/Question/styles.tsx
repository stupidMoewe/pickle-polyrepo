import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";
import { darkBlue, pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: height,
	},
	imageBackground: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
	questionContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		borderRadius: 12,
		zIndex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	rowContainer: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		padding: 15,
	},
	title: {
		fontSize: fontLarge,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		alignSelf: "center",
	},
	bottomIcons: {
		width: "82%",
		alignSelf: "center",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 25,
		zIndex: 1,
	},
	iconArea: {
		padding: 10,
	},
	pressable: {
		borderColor: "white",
		borderWidth: 1,
		padding: 10,
	},
	textNbOfAnswers: {
		textAlign: "right",
		alignSelf: "flex-end",
		marginTop: 20,
		marginRight: 20,
		fontSize: 16,
		color: "gray",
	},
	topIconsContainer: {
		zIndex: 1,
		width: "90%",
		alignSelf: "center",
		justifyContent: "space-between",
		// borderColor: "white",
		// borderWidth: 1,
		alignItems: "center",
		position: "absolute",
		flexDirection: "row",
		marginTop: "12%",
		// top: "6%",
		// right: "2%",
		backgroundColor: "transparent",
	},
	profileImage: {
		borderColor: pinkPickle,
		borderWidth: 2,
		borderRadius: 20,
		width: 60,
		height: 60,
	},
});

export default styles;
