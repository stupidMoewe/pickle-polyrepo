import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	topIconsLeft: {
		position: "absolute",
		top: 60,
		left: 20,
		backgroundColor: "transparent",
	},
});

export default styles;
