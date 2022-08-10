import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
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
}
const useInput = () => {
	const [value, setValue] = useState("");
	const input = <input value={value} onChange={(e) => setValue(e.target.value)} />;
	return [value, input];
};

export default function InputField({
	placeholder = "Enter your text",
	keyboardType = "default",
	secureTextEntry = false,
	onChangeText,
	value = "",
}: IInput) {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholder={placeholder}
				keyboardType={keyboardType}
				style={styles.input}
				secureTextEntry={secureTextEntry}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	);
}
