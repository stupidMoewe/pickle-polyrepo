import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { CustomButton } from "../../components/Button";
import { Text, View } from "../../components/Themed";
import styles from "./styles";

const icon = require("../../assets/images/School_Outline.jpg");

const AuthChoice = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.titleView}>
				<Text style={styles.title}>PICKLE</Text>
			</View>
			<Image style={styles.icon} source={icon}></Image>
			<View style={styles.boxBtns}>
				<Text style={styles.text}>Enregistrez vous pour commencer !</Text>
				<CustomButton
					title={"Login"}
					color="purple"
					propsStyle={{
						width: "80%",
						marginBottom: 25,
					}}
					onPress={() => navigation.navigate("Login")}
				/>
				<CustomButton
					title={"Register"}
					color="purple"
					propsStyle={{
						width: "80%",
						marginBottom: 30,
					}}
					onPress={() => navigation.navigate("Login")}
				/>
			</View>
		</View>
	);
};

export default AuthChoice;
