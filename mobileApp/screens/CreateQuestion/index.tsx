import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { CustomButton } from "../../components/Button";
import GoBack from "../../components/GoBackIcon";
import Input from "../../components/Input";
import { TakePictureFrame } from "../../components/TakePictureFrame";
import { Text, View } from "../../components/Themed";
import useAxios from "../../hooks/useAxios";
import { QuestionTypeOptions } from "../../types";
import styles from "./styles";

export default function CreateQuestion() {
	const navigation = useNavigation();
	const [title, setTitle] = useState<string>("");
	const [answer1, setAnswer1] = useState<string>("");
	const [answer2, setAnswer2] = useState<string>("");
	const [answer3, setAnswer3] = useState<string | null>(null);
	const [answer4, setAnswer4] = useState<string | null>(null);
	const [questionType, setQuestionType] = useState<QuestionTypeOptions>();

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const { doRequest, errors } = useAxios({
		port: "4002",
		url: "/create-question",
		method: "post",
		body: {
			title,
			answers: [answer1, answer2],
			answersTypes: ["Text", "Text", answer3 ? "Text" : null, answer4 ? "Text" : null],
			questionType: questionType || "TextText",
		},
		onSuccess: () => navigation.navigate("RootStackNavigator", { screen: "Profile" }),
	});

	const postQuestion = async () => {
		doRequest();
		if (errors) {
			console.log(errors);
		}
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
					<View style={styles.titleContainer}>
						<GoBack />
						<Text style={styles.title}>Post a Question</Text>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Titre :</Text>
							<View>
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
						{/* <Image source={{ uri: image }} style={styles.imageDisplay} /> */}
						<Text style={styles.label}>Answers :</Text>
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
