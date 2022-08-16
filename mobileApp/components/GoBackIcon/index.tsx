import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableHighlight } from "react-native";
import { View, Text } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import styles from "./styles";

const GoBack = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableHighlight
				onPress={() => {
					navigation.goBack();
				}}
			>
				<Text>
					<FontAwesome name="chevron-left" size={25} color="#fff" />
				</Text>
			</TouchableHighlight>
		</View>
	);
};

export default GoBack;
