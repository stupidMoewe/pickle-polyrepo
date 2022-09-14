import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

interface IInput {
	placeholder?: string;
	keyboardType?:
		| "default"
		| "email-address"
		| "numeric"
		| "phone-pad"
		| "number-pad"
		| "decimal-pad"
		| "visible-password";
	secureTextEntry?: boolean;
	onChangeText?: (text: string) => void;
	onEndEditing?: (text: string) => void;
	onSubmitEditing?: (text: string) => void;
	onBlur?: () => void;
	value?: string;
	width?: number | string;
}

export const Input = ({
	placeholder = "Enter your text",
	keyboardType = "default",
	secureTextEntry = false,
	onChangeText,
	value = "",
	width = "100%",
}: IInput) => {
	return (
		<TextInput
			placeholder={placeholder}
			keyboardType={keyboardType}
			style={[
				styles.input,
				{
					width,
				},
			]}
			secureTextEntry={secureTextEntry}
			value={value}
			onChangeText={onChangeText}
		/>
	);
};
