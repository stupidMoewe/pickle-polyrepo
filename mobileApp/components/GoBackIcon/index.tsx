import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableHighlight } from "react-native";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import styles from "./styles";

const GoBack = ({ style }: { style?: object }) => {
	const navigation = useNavigation();
	return (
		<View style={[styles.topIconsLeft, style]}>
			<TouchableHighlight
				onPress={() => {
					if (navigation.canGoBack()) {
						navigation.goBack();
					} else {
						navigation.dispatch(DrawerActions.openDrawer());
					}
				}}
			>
				<Text>
					<FontAwesome name="chevron-left" size={45} color={pinkPickle} />
				</Text>
			</TouchableHighlight>
		</View>
	);
};

export default GoBack;
