import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Input from "../../components/Input";
import { Text, View } from "../../components/Themed";
import { useAppDispatch } from "../../store/app/hooks";
import { login } from "../../store/features/auth/authSlice";
import styles from "./styles";

export default function Login() {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const loginHandler = async () => {
		dispatch(login({ email, password }));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<ScrollView>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Email :</Text>
					<Input
						placeholder="Email"
						value={email}
						onChangeText={(text) => setEmail(text)}
					></Input>
				</View>
				<Text style={styles.label}>Password :</Text>
				<Input
					placeholder="Password"
					value={password}
					secureTextEntry={true}
					onChangeText={(text) => setPassword(text)}
				></Input>
			</ScrollView>
			<TouchableOpacity style={styles.buttonContainer} onPress={loginHandler}>
				<Text style={styles.buttonText}>Login</Text>
				<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}
