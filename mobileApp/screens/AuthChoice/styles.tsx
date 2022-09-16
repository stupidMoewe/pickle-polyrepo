import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		paddingVertical: "10%",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		height: height,
		color: "#fff",
	},
	titleView: {
		marginTop: "10%",
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
	},
	text: {
		textAlign: "center",
		marginBottom: 20,
		fontSize: 18,
		fontWeight: "bold",
	},
	boxBtns: {
		width: "100%",
		alignItems: "center",
	},
	buttonContainer: {
		backgroundColor: "#AD40AF",
		padding: 20,
		width: "90%",
		borderRadius: 10,
		marginBottom: 25,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
	},
	icon: {
		width: 200,
		height: 200,
	},
});

export default styles;
