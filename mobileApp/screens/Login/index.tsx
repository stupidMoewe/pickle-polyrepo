import React, { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { CustomButton } from "../../components/Button";
import { Input } from "../../components/Input";
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
					<Input
						placeholder="Email"
						value={email}
						setValue={setEmail}
						width={width * 0.8}
						label="Email :"
					></Input>
				</View>
				<Input
					placeholder="Password"
					value={password}
					secureTextEntry={true}
					setValue={setPassword}
					label="Password :"
				></Input>
			</ScrollView>
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
