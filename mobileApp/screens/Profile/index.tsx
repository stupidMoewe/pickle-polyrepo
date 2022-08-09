import React from "react";
import { Text, View } from "react-native";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
	return (
		<View style={styles.view}>
			<Text>Hello</Text>;
		</View>
	);
}
