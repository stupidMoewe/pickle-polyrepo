import { Dimensions, StyleSheet } from "react-native";
import { fontLarge, fontNormal } from "../../constants/FontSizes";
import { pinkPickle } from "../../constants/ThemeColors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		height: height,
		backgroundColor: "#000",
	},
	containerScroll: {
		height: "100%",
		justifyContent: "center",
		// borderColor: pinkPickle,
		// borderWidth: 1,
	},
	text: {
		color: "#fff",
		fontSize: 24,
		margin: 5,
	},
	list: {
		marginTop: 20,
	},
});

export default styles;
