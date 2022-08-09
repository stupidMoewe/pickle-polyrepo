import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export function AnswerBntText(props: any) {
	console.log(props);
	return (
		<View style={[props.styles, styles.container]}>
			<Text style={styles.text}>{props.text}</Text>
		</View>
	);
}
