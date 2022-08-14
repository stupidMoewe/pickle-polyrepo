import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cameraContainer: {
		height: "100%",
		width: "100%",
	},
	cameraFrame: {
		height: "100%",
		width: "100%",
	},
	photoBtns: {
		position: "absolute",
		bottom: 20,
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
	},
	imageDisplay: {
		width: "100%",
		height: "100%",
	},
});

export default styles;
