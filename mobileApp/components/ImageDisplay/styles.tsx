import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		borderColor: "#fff",
		borderWidth: 1,
	},
});

export default styles;
