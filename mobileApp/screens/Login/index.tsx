import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Input from "../../components/Input";
import { Text, View } from "../../components/Themed";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";
import { useLoginMutation } from "../../store/user-api-slice";

export default function Login({ navigation }: RootTabScreenProps<"Login">) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [loading, isLoading] = useState(false);
	const auth = useAuth();
	const login = async () => {
		// useLoginMutation({ email, password });
		isLoading(true);
		await auth.login({ email, password });
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
			<TouchableOpacity style={styles.buttonContainer} onPress={login}>
				<Text style={styles.buttonText}>Login</Text>
				<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}
