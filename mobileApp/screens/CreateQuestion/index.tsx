import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, ScrollView, Image, Dimensions } from "react-native";
import { CustomButton } from "../../components/Button";
import GoBack from "../../components/GoBackIcon";
import Input from "../../components/Input";
import { TakePictureFrame } from "../../components/TakePictureFrame";
import { Text, View } from "../../components/Themed";
import { useCreateQuestionMutation } from "../../store/features/feed/userFeedApi";
import { QuestionTypeOptions } from "../../types";
import styles from "./styles";

const width = Dimensions.get("window").width;

export default function CreateQuestion() {
	const navigation = useNavigation();
	const [title, setTitle] = useState<string>("");
	const [answer1, setAnswer1] = useState<string>("");
	const [answer2, setAnswer2] = useState<string>("");
	const [answer3, setAnswer3] = useState<string | null>(null);
	const [answer4, setAnswer4] = useState<string | null>(null);
	const [questionType, setQuestionType] = useState<QuestionTypeOptions>();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [imageTitle, setImageTitle] = useState<string | null>(null);
	const [imageAnswer1, setImageAnswer1] = useState<string | null>(null);
	const [imageAnswer2, setImageAnswer2] = useState<string | null>(null);

	const [createQuestion, { isLoading }] = useCreateQuestionMutation();

	const postQuestion = async () => {
		await createQuestion({
			title,
			answers: [answer1, answer2],
			answersTypes: ["Text", "Text", answer3 ? "Text" : null, answer4 ? "Text" : null],
			questionType: questionType || "TextText",
		})
			.unwrap()
			.then(() => {
				setTitle("");
				setAnswer1("");
				setAnswer2("");
			})
			.then(() => navigation.navigate("RootStackNavigator", { screen: "Profile" }));
	};

	const openModal = () => {
		setImageTitle(null);
		setIsModalOpen(true);
	};

	const closeModelWithoutSaving = () => {
		setIsModalOpen(false);
		setImageTitle(null);
	};

	return (
		<View style={styles.container}>
			{isModalOpen ? (
				<>
					<TakePictureFrame image={imageTitle} setImage={setImageTitle} />
					<View style={styles.topBtns}>
						<Pressable onPress={closeModelWithoutSaving}>
							<View style={styles.iconCamera}>
								<MaterialIcons name="close" size={35} color="#fff" />
							</View>
						</Pressable>
						{imageTitle && (
							<Pressable onPress={() => setIsModalOpen(false)}>
								<View style={styles.iconCamera}>
									<MaterialIcons name="arrow-forward" size={35} color="#fff" />
								</View>
							</Pressable>
						)}
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
						<Text style={styles.label}>Titre :</Text>
						<View style={styles.inputContainer}>
							<Input
								placeholder="Titre de la question"
								value={title}
								onChangeText={(text) => setTitle(text)}
								width={width * 0.75}
							/>
							<Pressable onPress={openModal}>
								<View style={styles.iconCamera}>
									<MaterialIcons name="photo-camera" size={35} color="#fff" />
								</View>
							</Pressable>
						</View>
						{imageTitle && (
							<Image source={{ uri: imageTitle }} style={styles.imageDisplay} />
						)}
						<Text style={styles.label}>Answers :</Text>
						<View style={styles.inputContainer}>
							<Input
								placeholder="Answer 1"
								value={answer1}
								onChangeText={(text) => setAnswer1(text)}
							></Input>
							<Pressable onPress={openModal}>
								<View style={styles.iconCamera}>
									<MaterialIcons name="photo-camera" size={35} color="#fff" />
								</View>
							</Pressable>
						</View>
						{imageAnswer1 && (
							<Image source={{ uri: imageAnswer1 }} style={styles.imageDisplay} />
						)}
						<View style={styles.inputContainer}>
							<Input
								placeholder="Answer 2"
								value={answer2}
								onChangeText={(text) => setAnswer2(text)}
							></Input>
							<Pressable onPress={openModal}>
								<View style={styles.iconCamera}>
									<MaterialIcons name="photo-camera" size={35} color="#fff" />
								</View>
							</Pressable>
						</View>
						{imageAnswer2 && (
							<Image source={{ uri: imageAnswer2 }} style={styles.imageDisplay} />
						)}
					</ScrollView>
					<View style={styles.postQuestionBtn}>
						<CustomButton
							title={"Post"}
							onPress={postQuestion}
							color="pink"
							isActive={!isLoading}
						></CustomButton>
					</View>
				</View>
			)}
		</View>
	);
}
