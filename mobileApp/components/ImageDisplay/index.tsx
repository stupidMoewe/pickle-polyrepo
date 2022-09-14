import React from "react";
import { View } from "../Themed";
import { Image } from "react-native";
import styles from "./styles";

export const ImageDisplay = ({ image }) => {
	return (
		<View style={styles.container}>
			<Image source={image}></Image>
		</View>
	);
};
