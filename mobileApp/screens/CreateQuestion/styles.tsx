import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal } from "../../constants/FontSizes";

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
	subTitle: {
		fontSize: fontLarge,
	},
	buttonContainer: {
		backgroundColor: "#AD40AF",
		padding: 20,
		width: "90%",
		borderRadius: 10,
		marginBottom: 50,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonText: {
		color: "white",
		fontSize: fontNormal,
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default styles;
