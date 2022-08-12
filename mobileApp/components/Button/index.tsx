import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { lightBlue, pinkPickle } from "../../constants/ThemeColors";
import styles from "./styles";

interface ButtonInterface {
	title: string;
	color?: "blue" | "red" | "green" | "pink";
	onPress?: () => void;
	propsStyle?: Object;
	disabled?: boolean;
}

export function CustomButton({ title, color, onPress, propsStyle, disabled }: ButtonInterface) {
	let buttonColor = "blue";
	switch (color) {
		case "blue":
			buttonColor = lightBlue;
			break;
		case "red":
			buttonColor = "#eee";
			break;
		case "green":
			buttonColor = "#eee";
			break;
		case "pink":
			buttonColor = pinkPickle;
			break;
		default:
			buttonColor = "#eee";
	}

	return (
		<TouchableOpacity
			style={[styles.buttonContainer, { backgroundColor: buttonColor }, propsStyle]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.buttonText}>{title}</Text>
			{/* <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" /> */}
		</TouchableOpacity>
	);
}
