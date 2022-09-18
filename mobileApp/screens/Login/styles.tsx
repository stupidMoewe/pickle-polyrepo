import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		paddingTop: "20%",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		height: height,
	},
	inputContainer: {
		marginBottom: 40,
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		marginBottom: 60,
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
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default styles;
