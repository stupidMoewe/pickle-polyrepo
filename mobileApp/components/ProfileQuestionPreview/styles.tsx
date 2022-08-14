import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexBasis: "40%",
		margin: 10,
		height: 200,
		borderColor: "grey",
		borderWidth: 1,
	},
});

export default styles;
