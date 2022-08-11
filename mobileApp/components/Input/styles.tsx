import { Dimensions, StyleSheet } from "react-native";
import { fontNormal } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	inputContainer: {
		width: width * 0.9,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 12,
		color: "white",
		fontSize: fontNormal,
		fontWeight: "bold",
		alignSelf: "center",
		paddingHorizontal: 15,
	},
});

export default styles;
