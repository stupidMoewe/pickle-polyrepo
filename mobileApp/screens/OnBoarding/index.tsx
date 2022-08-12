import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";
// import Gaming from "../assets/images/misc/gaming.svg";

const OnBoarding = ({ navigation }: RootTabScreenProps<"OnBoarding">) => {
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
					Pourt notifier un bug ou conseiller une nouvelle functionnalité, vous pouvez me
					contacter par mél: martintefra@gmail.com
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
