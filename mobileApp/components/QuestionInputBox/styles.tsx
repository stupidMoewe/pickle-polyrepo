import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#666",
		borderWidth: 3,
		borderRadius: 10,
	},
	icon: {
		borderColor: "white",
		borderWidth: 1,
		paddingVertical: 6,
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
	},
	imageDisplay: {
		height: "100%",
	},
	trashButtonContainer: {
		backgroundColor: "rgba(52, 52, 52, 0.55)",
		zIndex: 21,
		position: "absolute",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	trashIcon: {
		backgroundColor: "transparent",
	},
});

export default styles;
