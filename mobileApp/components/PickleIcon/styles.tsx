import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
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
});

export default styles;
