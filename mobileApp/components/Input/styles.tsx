import { Dimensions, StyleSheet } from "react-native";
import { fontNormal } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	inputContainer: {
		width: width * 0.9,
	},
	title: {
		fontSize: fontNormal,
		fontWeight: "bold",
		marginBottom: 10,
	},
	input: {
		width: "100%",
		height: 40,
		padding: 20,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 12,
		color: "gray",
		fontSize: fontNormal,
		fontWeight: "bold",
		alignSelf: "center",
	},
});

export default styles;
