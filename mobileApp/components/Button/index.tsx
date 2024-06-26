import React from "react";
import { Pressable, Text, Touchable, TouchableOpacity } from "react-native";
import { lightBlue, pinkPickle, purple } from "../../constants/ThemeColors";
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
			case "green":
				buttonColor = "#eee";
				break;
			case "pink":
				buttonColor = pinkPickle;
				break;
			case "purple":
				buttonColor = purple;
				break;
			case "red":
				buttonColor = "#E94560";
				break;
			default:
				buttonColor = "#eee";
		}
	} else {
		buttonColor = "#eee";
	}

	return (
		<TouchableOpacity
			style={[
				styles.buttonContainer,
				{ backgroundColor: buttonColor },
				propsStyle,
				disabled && styles.disabled,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			{disabled ? <Text>Loading...</Text> : <Text style={styles.buttonText}>{title}</Text>}
		</TouchableOpacity>
	);
}
