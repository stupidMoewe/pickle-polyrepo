import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: "#AD40AF",
		padding: 20,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default styles;
