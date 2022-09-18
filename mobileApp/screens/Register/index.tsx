import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { CustomButton } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text, View } from "../../components/Themed";
import { useRegisterMutation } from "../../store/features/auth/authApi";
import styles from "./styles";

const width = Dimensions.get("window").width;

export default function Register() {
	const [email, setEmail] = useState<string>();
	const [emailError, setEmailError] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [passwordError, setPasswordError] = useState<string>();
	const [username, setUsername] = useState<string>();
	const [usernameError, setUsernameError] = useState<string>();

	const [register, { isError, error, isLoading, isSuccess }] = useRegisterMutation();

	useEffect(() => {
		if (error) {
			error!.data.map((err: any) => {
				console.log(err);
				switch (err.param) {
					case "email":
						return setEmailError(err.msg);
					case "password":
						return setPasswordError(err.msg);
					case "username":
						return setUsernameError(err.msg);
				}
			});
		}
	}, [error]);

	const registerHandler = async () => {
		await register({ email, password, username });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>
			<ScrollView>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Username :</Text>
					<Input
						placeholder="Your Username"
						value={username}
						onChangeText={(text) => {
							setUsername(text);
							setUsernameError("");
						}}
						width={width * 0.8}
					></Input>
					{usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Email :</Text>
					<Input
						placeholder="Your Email"
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							setEmailError("");
						}}
						width={width * 0.8}
					></Input>
					{emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Password :</Text>
					<Input
						placeholder="Your Password"
						value={password}
						secureTextEntry={true}
						onChangeText={(text) => {
							setPassword(text);
							setPasswordError("");
						}}
						width={width * 0.8}
					></Input>
					{passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
				</View>
			</ScrollView>
			<CustomButton
				title={"Register"}
				color="purple"
				propsStyle={{
					width: "80%",
					marginBottom: 50,
				}}
				onPress={registerHandler}
			/>
		</View>
	);
}
