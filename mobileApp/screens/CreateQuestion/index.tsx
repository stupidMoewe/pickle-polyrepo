import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CustomButton } from "../../components/Button";
import GoBack from "../../components/GoBackIcon";
import { Input, InputWithPhoto } from "../../components/Input";
import { Text, View } from "../../components/Themed";
import {
	useCreateQuestionMutation,
	useUploadImageMutation,
} from "../../store/features/feed/userFeedApi";
import { ImageObject } from "../AdvancedCreateQuestion";
import styles from "./styles";

export default function CreateQuestion() {
	const navigation = useNavigation();
	const [createQuestion, { isLoading: isLoadingCreateQuesiton }] = useCreateQuestionMutation();
	const [uploadImage, { reset, isLoading: isLoadingUploadQuestion }] = useUploadImageMutation();

	const [title, setTitle] = useState<string>("");
	const [backgroundImage, setBackgroundImage] = useState<ImageObject | null>(null);
	const [answer1, setAnswer1] = useState<string>("");
	const [answer2, setAnswer2] = useState<string>("");

	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	const postQuestion = async () => {
		let backgroundImageName: string | null = null;

		if (backgroundImage) {
			const titleFormData = new FormData();
			titleFormData.append("image", backgroundImage);
			await uploadImage(titleFormData)
				.unwrap()
				.then((res: any) => {
					backgroundImageName = res.imageLocation;
				})
				.catch((err) => {
					console.log(err);
				});
			reset();
		}

		console.log(backgroundImageName);

		await createQuestion({
			contents: [title, answer1, answer2],
			contentsType: ["Text", "Text", "Text"],
			backgroundImageName,
		})
			.unwrap()
			.then(() => {
				setTitle("");
				setAnswer1("");
				setAnswer2("");
				setBackgroundImage(null);
			})
			.then(() => navigation.navigate("Profile"));
	};

	const pressedHandler = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			// setImage(result.uri);
		}
	};

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<GoBack />
				<Text style={styles.title}>Post a Question</Text>
			</View>
			<KeyboardAwareScrollView
				style={styles.containerQuestions}
				indicatorStyle={"black"}
				keyboardOpeningTime={0}
			>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Title</Text>
					<InputWithPhoto
						placeholder={"Title"}
						value={title}
						setValue={(text) => setTitle(text)}
						image={backgroundImage}
						setImageValue={setBackgroundImage}
					></InputWithPhoto>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Answers</Text>
					<Input
						placeholder={"Answer 1"}
						value={answer1}
						setValue={setAnswer1}
						style={{ marginVertical: 20 }}
					></Input>
					<Input placeholder={"Answer 2"} value={answer2} setValue={setAnswer2}></Input>
				</View>
				<CustomButton
					title={"Advanced"}
					propsStyle={{
						marginTop: 20,
						width: "50%",
						alignSelf: "center",
						marginBottom: 200,
					}}
					color={"blue"}
					onPress={() => {
						navigation.navigate("AdvancedCreateQuestion");
					}}
				></CustomButton>
			</KeyboardAwareScrollView>
			<CustomButton
				title={"post"}
				propsStyle={{ position: "absolute", bottom: 40, alignSelf: "center" }}
				color={"pink"}
				onPress={postQuestion}
				disabled={isLoadingUploadQuestion || isLoadingCreateQuesiton}
			></CustomButton>
		</View>
	);
}
