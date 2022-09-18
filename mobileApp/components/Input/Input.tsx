import React from "react";
import { TextInput } from "react-native";
import { Text } from "../Themed";
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
	onEndEditing?: (text: string) => void;
	onSubmitEditing?: (text: string) => void;
	onBlur?: () => void;
	value: string;
	setValue: (text: string) => void;
	width?: number | string;
	style?: object;
	label?: string;
}

export const Input = ({
	placeholder = "Enter your text",
	keyboardType = "default",
	secureTextEntry = false,
	setValue,
	value,
	width = "100%",
	style,
	label,
}: IInput) => {
	return (
		<>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				placeholder={placeholder}
				keyboardType={keyboardType}
				style={[
					style,
					styles.input,
					{
						width,
					},
				]}
				secureTextEntry={secureTextEntry}
				value={value}
				onChangeText={(text) => setValue(text)}
			/>
		</>
	);
};
