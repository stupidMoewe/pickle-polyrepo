import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	titleView: {
		marginTop: 100,
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		color: "#20315f",
	},
	containerView: { flex: 1, justifyContent: "center", alignItems: "center" },
	descriptionText: {
		fontSize: fontLarge,
		textAlign: "center",
		marginHorizontal: "10%",
	},
	descriptionTextSmall: {
		marginTop: "10%",
		fontSize: fontNormal,
		textAlign: "center",
		marginHorizontal: "10%",
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
		// fontFamily: "Roboto-MediumItalic",
	},
});

export default styles;
