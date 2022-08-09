import React, { useState } from "react";
import { TextInput } from "react-native";
import { Text, View } from "../Themed";
import styles from "./styles";

export function Input(props: TextInput["props"]) {
	const [text, onChangeText] = useState("");
	// const [number, onChangeNumber] = useState(null);
	return (
		<View style={styles.inputContainer}>
			<TextInput
				placeholder={props.placeholder}
				keyboardType="numeric"
				onChangeText={onChangeText}
				// value={number}
				style={[props.style, styles.input]}
			/>
		</View>
	);
}
