import { Dimensions, StyleSheet } from "react-native";
import { fontLarge } from "../../constants/FontSizes";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: height,
	},
	ImageBackground: {
		flex: 1,
		resizeMode: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	questionContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		// flexDirection: "column",
		// position: "absolute",
		alignItems: "center",
		// backgroundColor: "transparent",
		paddingTop: "20%",
	},
	title: {
		fontSize: fontLarge,
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		padding: 10,
		marginTop: "10%",
	},
	questionScreen: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		display: "flex",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	bottomIcons: {
		width: "82%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 25,
		shadowColor: "#555",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 10,
		shadowRadius: 10,
	},
	iconArea: {
		padding: 10,
	},
	pressable: {
		borderColor: "white",
		borderWidth: 1,
		padding: 10,
	},
});

export default styles;
