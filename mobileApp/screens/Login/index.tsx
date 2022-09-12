import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CustomButton } from "../../components/Button";
import Input from "../../components/Input";
import { Text, View } from "../../components/Themed";
import { useLoginMutation } from "../../store/features/auth/authApi";
import styles from "./styles";

const width = Dimensions.get("window").width;

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [login] = useLoginMutation();

	const loginHandler = async () => {
		await login({ email, password });
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
						width={width * 0.8}
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
			{/* <TouchableOpacity style={styles.buttonContainer} onPress={loginHandler}>
				<Text style={styles.buttonText}>Login</Text>
				<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
			</TouchableOpacity> */}
			<CustomButton
				title={"Login"}
				color="purple"
				propsStyle={{
					width: "80%",
					marginBottom: 50,
				}}
				onPress={loginHandler}
			/>
		</View>
	);
}
