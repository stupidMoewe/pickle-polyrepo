import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { lightBlue, pinkPickle } from "../../constants/ThemeColors";
import styles from "./styles";

interface ButtonInterface {
	title: string;
	color?: "blue" | "red" | "green" | "pink" | "purple";
	onPress?: () => void;
	propsStyle?: object;
	disabled?: boolean;
	isActive?: boolean;
}

export function CustomButton({
	title,
	color,
	onPress,
	propsStyle,
	disabled,
	isActive = true,
}: ButtonInterface) {
	let buttonColor = "blue";
	if (isActive) {
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
			case "purple":
				buttonColor = "#AD40AF";
				break;
			default:
				buttonColor = "#eee";
		}
	} else {
		buttonColor = "#eee";
	}

	return (
		<Pressable
			style={[styles.buttonContainer, { backgroundColor: buttonColor }, propsStyle]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</Pressable>
	);
}
