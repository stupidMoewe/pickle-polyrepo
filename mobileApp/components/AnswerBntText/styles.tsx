import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		width: width * 0.9,
		maxHeight: 140,
		padding: 12,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 12,
		fontWeight: "bold",
		alignSelf: "center",
	},
	text: {
		fontSize: fontNormal,
		color: "white",
	},
});

export default styles;
