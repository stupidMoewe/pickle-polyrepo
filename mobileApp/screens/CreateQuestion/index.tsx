import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import React, { useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import { CustomButton } from "../../components/Button";
import Input from "../../components/Input";
import { TakePictureFrame } from "../../components/TakePictureFrame";
import { Text, View } from "../../components/Themed";
import styles from "./styles";

export default function CreateQuestion() {
	const navigation = useNavigation();
	const [title, setTitle] = useState<string>("");
	const [answer1, setAnswer1] = useState<string>("");
	const [answer2, setAnswer2] = useState<string>("");
	const [image, setImage] = useState();

	const [modalOpen, setModalOpen] = useState<boolean>(false);

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
			{modalOpen ? (
				<>
					<TakePictureFrame />
					<View style={styles.modalExitBtn}>
						<Pressable onPress={() => setModalOpen(false)}>
							<View style={styles.iconCamera}>
								<MaterialIcons name="close" size={35} color="#fff" />
							</View>
						</Pressable>
					</View>
				</>
			) : (
				<View style={styles.createQuestionContainer}>
					<Text style={styles.title}>Post a Question</Text>
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Titre :</Text>
							<View style={styles.inputView}>
								<Input
									placeholder="Titre de la question"
									value={title}
									onChangeText={(text) => setTitle(text)}
								/>
								<Pressable onPress={() => setModalOpen(true)}>
									<View style={styles.iconCamera}>
										<MaterialIcons name="photo-camera" size={35} color="#fff" />
									</View>
								</Pressable>
							</View>
						</View>
						<Image source={{ uri: image }} style={styles.imageDisplay} />
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
						<CustomButton
							title={"Post"}
							onPress={postQuestion}
							color="pink"
						></CustomButton>
					</View>
				</View>
			)}
		</View>
	);
}
