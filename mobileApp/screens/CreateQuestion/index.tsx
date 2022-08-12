import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { CustomButton } from "../../components/Button";
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
		const url = `${questionAPIUrl}/create-question`;
		await axios
			.post(url, {
				title,
				answer1,
				answer2,
			})
			.then((res) => {
				console.log(res);
				navigation.navigate("Feed");
			})
			.catch((error) => {
				console.log(error.response.data.errors);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Post a Question</Text>
			<ScrollView>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Title :</Text>
					<View style={styles.inputView}>
						<Input
							placeholder="Email"
							value={title}
							onChangeText={(text) => setTitle(text)}
						/>
						<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
					</View>
				</View>
				<Text style={styles.label}>Answers :</Text>
				<Input
					placeholder="Answer 1"
					value={answer1}
					secureTextEntry={true}
					onChangeText={(text) => setAnswer1(text)}
				></Input>
				<Input
					placeholder="Answer 2"
					value={answer2}
					secureTextEntry={true}
					onChangeText={(text) => setAnswer2(text)}
				></Input>
			</ScrollView>
			<View style={styles.postQuestionBtn}>
				<CustomButton title={"Post"} onPress={postQuestion} color="pink"></CustomButton>
			</View>
		</View>
	);
}
