import { Dimensions, StyleSheet } from "react-native";
import { darkBlue, darkPurple } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#aaa",
		borderWidth: 1,
		borderRadius: 10,
		margin: 4,
		backgroundColor: darkBlue,
	},
	icon: {
		borderColor: "white",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 12,
		marginHorizontal: 4,
	},
	iconsContainer: {
		display: "flex",
		flexDirection: "row",
		position: "absolute",
		bottom: 10,
		backgroundColor: "transparent",
	},
	cameraContainer: {
		height: "100%",
		width: "100%",
	},
	cameraFrame: {
		height: "100%",
		width: "100%",
	},
	imageContainer: {
		height: "100%",
		width: "100%",
		backgroundColor: "transparent",
	},
	imageDisplay: {
		height: "100%",
		borderRadius: 8,
	},
	trashButtonContainer: {
		backgroundColor: "rgba(52, 52, 52, 0.55)",
		zIndex: 21,
		position: "absolute",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	trashIcon: {
		backgroundColor: "transparent",
	},
});

export default styles;
