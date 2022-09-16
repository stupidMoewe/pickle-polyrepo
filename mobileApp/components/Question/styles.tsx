import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";
import { darkBlue, pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: height,
		paddingTop: 35,
		paddingBottom: 20,
	},
	questionContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		borderColor: "blue",
		borderWidth: 3,
		borderRadius: 12,
	},
	rowContainer: {
		width: "100%",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: darkBlue,
		// padding: 4,
	},
	title: {
		fontSize: fontLarge,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		alignSelf: "center",
	},
	questionScreen: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		display: "flex",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	bottomIcons: {
		width: "82%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 25,
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
