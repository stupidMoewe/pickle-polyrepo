import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
	},
	topIconsLeft: {
		// position: "absolute",
		top: 0,
		left: 10,
		backgroundColor: "transparent",
		shadowColor: "#555",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 10,
		shadowRadius: 10,
		elevation: 10,
	},
});

export default styles;
