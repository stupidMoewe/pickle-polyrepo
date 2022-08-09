import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		width: width,
		height: height,
		paddingTop: "20%",
	},
	form: {
		width: 0.9 * width,
		alignSelf: "center",
	},
	title: {
		fontSize: fontLarge,
		fontWeight: "bold",
		marginTop: "10%",
		marginBottom: "10%",
	},
	subTitle:{
		fontSize: fontLarge,
	},
	input: {
		// marginTop: "10%",
	},
});

export default styles;
