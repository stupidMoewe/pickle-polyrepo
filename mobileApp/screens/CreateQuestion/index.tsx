import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import React, { useState } from "react";
import { Button, Pressable, ScrollView, TouchableOpacity } from "react-native";
import Input from "../../components/Input";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

const error = () => {
	<View>
		<Text>Erreur</Text>
	</View>;
};

export default function CreateQuestion({ navigation }: RootTabScreenProps<"CreateQuestion">) {
	const [title, setTitle] = useState<string>("");
	const [answer1, setAnswer1] = useState<string>("");
	const [answer2, setAnswer2] = useState<string>("");

	const questionAPIUrl = Constants?.manifest?.extra?.questionAPIUrl;
	const postQuestion = async () => {
		console.log(title, answer1, answer2);
		try {
			const url = `${questionAPIUrl}/create-question`;
			const response = await axios(url, {
				method: "POST",
				data: {
					title,
					answer1,
					answer2,
				},
			});
			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
		// return response.data;
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<ScrollView>
					<Text style={styles.title}>Create Question</Text>
					<Text style={styles.subTitle}>Ma Question</Text>
					<Input
						placeholder="Question"
						value={title}
						onChangeText={(text) => setTitle(text)}
					></Input>
					<Text style={styles.subTitle}>Mes Réponses</Text>
					<Input
						placeholder="Answer 1"
						value={answer1}
						onChangeText={(text) => setAnswer1(text)}
					></Input>
					<Input
						placeholder="Answer 2"
						value={answer2}
						onChangeText={(text) => setAnswer2(text)}
					></Input>
					<TouchableOpacity style={styles.buttonContainer} onPress={postQuestion}>
						<Text style={styles.buttonText}>Poster Question</Text>
						<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
					</TouchableOpacity>
				</ScrollView>
			</View>
		</View>
	);
}
