import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {},
	topIconsLeft: {
		top: 0,
		left: 10,
		backgroundColor: "transparent",
		elevation: 10,
	},
});

export default styles;
