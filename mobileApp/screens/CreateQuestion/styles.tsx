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
	inputView: {
		// flexDirection: "column",
		// alignItems: "center",
		// justifyContent: "space-between",
		// borderColor: "#fff",
		// borderWidth: 1,
		// width: width,
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
	postQuestionBtn: {
		marginBottom: 50,
	},
});

export default styles;
