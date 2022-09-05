import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

const OnBoarding = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.title}>PICKLE</Text>
			</View>
			<View style={styles.containerView}>
				<Text style={styles.descriptionText}>
					Bienvenue sur la Version Alpha de Pickle !
				</Text>
				<Text style={styles.descriptionTextSmall}>
					Pour notifier un bug ou conseiller une nouvelle functionnalité, vous pouvez me
					contacter par mail: martintefra@gmail.com
				</Text>
			</View>
			<TouchableOpacity
				style={styles.buttonContainer}
				onPress={() => navigation.navigate("Login")}
			>
				<Text style={styles.buttonText}>C'est parti !</Text>
				<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export default OnBoarding;
