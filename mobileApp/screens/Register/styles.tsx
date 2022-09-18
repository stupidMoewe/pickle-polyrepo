import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";

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
	label: {
		fontSize: fontLarge,
		marginBottom: 10,
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
	errorText: {
		color: "red",
		marginTop: 4,
	},
});

export default styles;
