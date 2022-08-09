import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { pinkPickle } from "../../constants/ThemeColors";
import styles from "./styles";

export function PickleIcon() {
	return (
		<View style={styles.topIconsLeft}>
			<Text>
				cdhjnjekw
				<FontAwesome name="chevron-left" size={45} color={pinkPickle} />
			</Text>
		</View>
	);
}
