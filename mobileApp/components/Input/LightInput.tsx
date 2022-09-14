import React from "react";
import { TextInput } from "react-native";
import { View } from "../Themed";
import styles from "./styles";

interface Props {
	placeholder: string;
	setValue: (value: string) => void;
}

export const LightInput = ({ placeholder, setValue }: Props) => {
	return (
		<View style={styles.lightInputContainer}>
			<TextInput
				placeholder={placeholder}
				style={styles.lightInput}
				selectionColor={"green"}
				onChangeText={(text) => setValue(text)}
			></TextInput>
		</View>
	);
};
